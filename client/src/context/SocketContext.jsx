import { createContext, useState, useEffect, useContext } from "react";  
import { useAuthContext } from "./AuthContext";  
import io from "socket.io-client";  

const SocketContext = createContext();  

export const useSocketContext = () => {  
	return useContext(SocketContext);  
};  

export const SocketContextProvider = ({ children }) => {  
	const [socket, setSocket] = useState(null);  
	const [onlineUsers, setOnlineUsers] = useState([]);  
	const [newMessageReceived, setNewMessageReceived] = useState(false);  
	const { authUser } = useAuthContext();  

	useEffect(() => {  
		if (authUser) {  
			const socket = io("http://localhost:5000", {  
				query: {  
					userId: authUser._id,  
				},  
			});  

			setSocket(socket);  

			socket.on("getOnlineUsers", (users) => {  
				setOnlineUsers(users);  
			});  

			// Listen for new messages  
			socket.on("newMessage", () => {  
				setNewMessageReceived(true);  
			});  

			return () => socket.close();  
		} else {  
			if (socket) {  
				socket.close();  
				setSocket(null);  
			}  
		}  
	}, [authUser]);  

	// Reset new message state after a short duration  
	useEffect(() => {  
		if (newMessageReceived) {  
			const timer = setTimeout(() => {  
				setNewMessageReceived(false);  
			}, 3000); // Reset after 3 seconds  

			return () => clearTimeout(timer);  
		}  
	}, [newMessageReceived]);  

	return (  
		<SocketContext.Provider value={{ socket, onlineUsers, newMessageReceived }}>  
			{children}  
		</SocketContext.Provider>  
	);  
};