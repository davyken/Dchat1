import { useAuthContext } from "../../context/AuthContext";  
import { extractTime } from "../../utils/extractTime";  
import useConversation from "../../zustand/useConversation";  

const Message = ({ message }) => {  
    const { authUser } = useAuthContext();  
    const { selectedConversation } = useConversation();  
    const fromMe = message.senderId === authUser._id;  
    const formattedTime = extractTime(message.createdAt);  
    const chatClassName = fromMe ? "chat-end" : "chat-start";  
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;  
    const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";  
    const shakeClass = message.shouldShake ? "shake" : "";  
    const isUnread = !message.isRead; // Check if the message is unread

    return (  
        <div className={`chat ${chatClassName} ${isUnread ? 'unread' : ''}`}>  
            <div className='chat-image avatar'>  
                <div className='w-10 rounded-full'>  
                    <img alt='User avatar' src={profilePic} />  
                </div>  
            </div>  
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 ${isUnread ? 'font-bold' : ''}`}>  
                {message.message}  
                <div className='chat-footer opacity-50 text-xs mt-1'>{formattedTime}</div>  
            </div>  
        </div>  
    );  
};  

export default Message;