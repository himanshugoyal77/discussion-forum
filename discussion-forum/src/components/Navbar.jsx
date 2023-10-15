import React from "react";
import Search from "../icons/Search";
import Notification from "../icons/Notification";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 h-14 border-b-2 shadow-md bg-white flex items-center justify-between px-20">
      <div className="logo font-bold text-purple-500">H-Forum</div>
      <div
        className="searchbar border-none outline-none rounded-md py-1 h-8 px-4 w-96 
      bg-gray-100 flex items-center"
      >
        <Search />
        <input
          type="text"
          className="border-none outline-none rounded-md py-1 px-2 w-96 bg-gray-100"
          placeholder="Search for Topics"
        />
      </div>
      <div className="flex items-center gap-5">
        <Notification />
        <img
          src="https://avatars.githubusercontent.com/u/56132780?v=4"
          alt="profile"
          className="w-7 h-7 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
