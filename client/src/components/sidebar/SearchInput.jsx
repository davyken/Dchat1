import { useState } from "react";  
// import { IoSearchSharp } from "react-icons/io5";  
import useConversation from "../../zustand/useConversation";  
import useGetConversations from "../../hooks/useGetConversations";  
import toast from "react-hot-toast";  

const SearchInput = () => {  
	const [search, setSearch] = useState("");  
	const { setSelectedConversation } = useConversation();  
	const { conversations } = useGetConversations();  

	const handleSubmit = (e) => {  
		e.preventDefault();  
		if (!search) return;  
		if (search.length < 3) {  
			return toast.error("Search term must be at least 3 characters long");  
		}  

		const conversation = conversations.find((c) =>  
			c.fullName.toLowerCase().includes(search.toLowerCase())  
		);  

		if (conversation) {  
			setSelectedConversation(conversation);  
			setSearch("");  
		} else {  
			toast.error("No such user found!");  
		}  
	};  

	// Filtered conversations based on the search input  
	const filteredConversations = search.length >= 3   
		? conversations.filter((c) =>   
			c.fullName.toLowerCase().includes(search.toLowerCase())  
		)   
		: [];   

	return (  
		<div>  
<h1 className="text-3xl text-blue-500 font-bold">DChats</h1>
<form onSubmit={handleSubmit} className='flex flex-col sm:flex-row items-center gap-2 p-4'>  
				<input  
					type='text'  
					placeholder='Search…'  
					className='input input-bordered rounded-full w-full sm:w-64 px-4 py-2'  
					value={search}  
					onChange={(e) => setSearch(e.target.value)}  
				/>  
				{/* <button type='submit' className='btn btn-circle bg-sky-500 text-white w-10 h-10 flex items-center justify-center'>  
					<IoSearchSharp className='w-6 h-6' />  
				</button>   */}  
			</form>  

			{filteredConversations.length > 0 && (  
				<div className="mt-2">  
					{filteredConversations.map((c) => (  
						<div   
							key={c.id}   
							className="p-2 border rounded-md cursor-pointer hover:bg-blue-500"  
							onClick={() => {  
								setSelectedConversation(c);  
								setSearch('');  
							}}  
						>  
							{c.fullName}  
						</div>  
					))}  
				</div>  
			)}  
		</div>  
	);  
};  

export default SearchInput;