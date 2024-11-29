import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
  ChatIcon,
  CogIcon,
} from "@heroicons/react/outline";

const MobileNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 border-t border-gray-200 p-4 flex justify-around md:hidden">
      <ChatIcon className="h-6 w-6 text-gray-600" />
      <Link to={"/sidebar"}>
        <HomeIcon className="h-6 w-6 text-gray-600" />
      </Link>
      <Link to={"/status_page"}>
        <PlusCircleIcon className="h-6 w-6 text-gray-600" />
      </Link>
      <Link to={"/settings"}>
        <CogIcon className="h-6 w-6 text-gray-600" />
      </Link>
      <Link to={"/profile"}>
        <UserIcon className="h-6 w-6 text-gray-600" />
      </Link>
    </div>
  );
};

export default MobileNavBar;
