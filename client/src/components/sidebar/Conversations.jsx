import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;


// import useGetConversations from "../../hooks/useGetConversations";  
// import { getRandomEmoji } from "../../utils/emojis";  
// import Conversation from "./Conversation";  

// const Conversations = () => {  
//     const { loading, conversations } = useGetConversations();  

//     const sortedConversations = [...conversations].sort((a, b) => {  
//         return new Date(a.createdAt) - new Date(b.createdAt);  
//     });  

//     return (  
//         <div className='py-2 flex flex-col overflow-auto'>  
//             {sortedConversations.map((conversation, idx) => (  
//                 <Conversation  
//                     key={conversation._id}  
//                     conversation={conversation}  
//                     emoji={getRandomEmoji()}  
//                     lastIdx={idx === sortedConversations.length - 1}  
//                 />  
//             ))}  

//             {loading ? <span className='loading loading-spinner mx-auto'></span> : null}  
//         </div>  
//     );  
// };  

// export default Conversations;