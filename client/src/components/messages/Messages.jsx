import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { useAuthContext } from "../../context/AuthContext"; // Import AuthContext to access current user

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();
    const { authUser } = useAuthContext(); 

    useEffect(() => {
        // Scroll to the bottom of the messages when new messages are added
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    // Mark messages as read when they are displayed
    useEffect(() => {
        const markMessagesAsRead = async () => {
            const unreadMessages = messages.filter(message => !message.isRead && message.receiverId === authUser._id);
            if (unreadMessages.length > 0) {
                try {
                    await Promise.all(unreadMessages.map(message => 
                        fetch(`/api/messages/${message._id}/read`, {
                            method: 'POST',
                        })
                    ));
                } catch (error) {
                    console.error("Error marking messages as read:", error);
                }
            }
        };
        markMessagesAsRead();
    }, [messages, authUser]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages;