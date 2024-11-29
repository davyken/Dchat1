import React, { useContext } from "react";  
import Conversations from "./Conversations";  
import LogoutButton from "./LogoutButton";  
import SearchInput from "./SearchInput";  
import { useAuthContext } from "../../context/AuthContext"; 
// import MessageNotificationIcon from "../messageUI/messageUI";  


// <MessageNotificationIcon /> 

const Sidebar = () => {  
	const {authUser} = useAuthContext();  
  
  return (  
    <div className='border-r p-4 flex flex-col bg-gray-900  md:w-1/3 w-full'>  
      <SearchInput />  
      <div className='divider px-3'></div>  
      <Conversations />  
      {/* User Profile Section */}  
      <div className='flex items-center ju mt-4'>  
	  <div className="mr-4">
	  <LogoutButton />  
		</div>

        {authUser ? (  
          <>  
            <img  
              src={authUser.profilePic}  
              alt=""   
              className='w-10 h-10 rounded-full mr-2'  
            />  
            <span className='text-white'>{authUser.fullName}</span>  
          </>  
        ) : (  
          <span className='text-gray-400'>User not logged in</span>  
        )}  

      </div>  
    </div>  
  );  
};  

export default Sidebar;