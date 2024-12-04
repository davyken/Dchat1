import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
// import { RiPhoneFill, RiVideoFill } from "react-icons/ri";
import { useAuthContext } from "../../context/AuthContext";
import Robot from "../../assets/robot.gif"
const MessageContainer = () => {  
	const { selectedConversation, setSelectedConversation } = useConversation();  
	const [callType, setCallType] = useState(null);  

	useEffect(() => {  
		return () => setSelectedConversation(null);  
	}, [setSelectedConversation]);  

	const handleCall = (type) => {  
		setCallType(type);  
		setTimeout(() => setCallType(null), 3000);  
	};  

	return (  
		<div className={`md:min-w-[475px] flex flex-col h-full w-full  
			${selectedConversation ? 'flex' : 'hidden'}   
			md:flex fixed md:static inset-1 bg-gray-900 z-50   `}>  
			{!selectedConversation ? (  
				<NoChatSelected />  
			) : (  
				<>  
					{/* Header */}  
					<div className='bg-gray-700 px-4 py-3 mb-4 flex items-center justify-between relative rounded-t-2xl'>  
						<div className="flex items-center gap-3">  
							<button   
								className="md:hidden text-gray-900 hover:text-gray-700"  
								onClick={() => setSelectedConversation(null)}  
							>  
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />  
								</svg>  
							</button>  
							<img   
								src={selectedConversation.profilePic || "/default-avatar.png"}   
								alt="Profile"   
								className="w-10 h-10 rounded-full"  
							/>  
						</div>  
						<div className="absolute left-1/2 transform -translate-x-1/2 text-center">  
							<span className='label-text block'></span>  
							<span className='text-white-100 font-bold'>{selectedConversation.fullName}</span>  
						</div>  
						{/* <div className='flex gap-2'>  
							<RiPhoneFill   
								className='text-blue-500 cursor-pointer text-xl'   
								onClick={() => handleCall('audio')}  
							/>  
							<RiVideoFill   
								className='text-blue-500 cursor-pointer text-xl'   
								onClick={() => handleCall('video')}  
							/>  
						</div>   */}
					</div>  
					<Messages />  
					<MessageInput />  
					{callType && <CallModal type={callType} name={selectedConversation.fullName} />}  
				</>  
			)}  
		</div>  
	);  
};  

const CallModal = ({ type, name }) => (  
	<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">  
		<div className="bg-white p-6 rounded-2xl text-center">  
			<p className="text-xl font-bold mb-2">  
				{type === 'audio' ? 'Audio' : 'Video'} call with {name}  
			</p>  
			<p>call... (will close in 3 seconds)</p>  
			<p>have you understood?</p>
		</div>  
	</div>  
);  

const NoChatSelected = () => {  
	const { authUser } = useAuthContext();  
	return (  
		<div className='flex items-center justify-center w-full h-full'>  
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>  
				<img src={Robot} alt="hey" />  
				<p>Welcome 👋 {authUser.fullName} ❄</p>  
				<p>Select a chat to start messaging</p>  
				<TiMessages className='text-3xl md:text-6xl text-center' />  
			</div>  
		</div>  
	);  
};  

export default MessageContainer;