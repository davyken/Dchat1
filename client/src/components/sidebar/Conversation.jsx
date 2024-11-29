import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from 'react';

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	const [totalMessages, setTotalMessages] = useState(0);

	useEffect(() => {
		// Use the messageCount from backend if available
		if (conversation.messageCount !== undefined) {
			setTotalMessages(conversation.messageCount);
		} else if (conversation.messages?.length) {
			setTotalMessages(conversation.messages.length);
		}
	}, [conversation]);

	const formatMessageDate = (date) => {
		if (!date) return "";
		const messageDate = new Date(date);
		const now = new Date();
		
		if (messageDate.toDateString() === now.toDateString()) {
			return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		}
		
		const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));
		if (diffDays < 7) {
			return messageDate.toLocaleDateString([], { weekday: 'short' });
		}
		
		return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
	};

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-blue-500" : ""}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<div className='flex items-center gap-1'>
							<p className='font-bold text-gray-200'>{conversation.fullName}</p>
							{conversation.unreadCount > 0 && (
								<MessageCircle size={16} className="fill-green-500 text-green-500" />
							)}
						</div>
						<div className='flex items-center gap-2'>
							<span className='text-xs text-gray-400'>
								{formatMessageDate(conversation.lastMessage?.timestamp)}
							</span>
							<div className='flex items-center gap-1'>
								<span className='text-xl'>{emoji}</span>
								{totalMessages > 0 && (
									<span className='text-xs text-gray-400'>
										({totalMessages})
									</span>
								)}
							</div>
						</div>
					</div>
					
					<div className='flex justify-between items-center gap-2'>
						<p className={`text-sm truncate max-w-[200px] ${conversation.unreadCount > 0 ? 'text-gray-200 font-medium' : 'text-gray-400'}`}>
							{conversation.lastMessage?.message || "Start a conversation"}
						</p>
						{conversation.unreadCount > 0 && (
							<span className='bg-green-500 text-white rounded-full px-2 py-1 text-xs'>
								{conversation.unreadCount}
							</span>
						)}
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;