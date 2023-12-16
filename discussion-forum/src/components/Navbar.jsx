import React from "react";
import Search from "../icons/Search";
import { useNavigate } from "react-router-dom";
import Hamburger from "../icons/Hamburger";
import Cancel from "../icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../context/sidebarSlice";

const Navbar = () => {
  const open = useSelector((state) => state.sidebar.open);
  console.log("open", open);
  const dispatch = useDispatch();
  const handleChange = (e) => {};
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  return (
    <div
      className="fixed bg-white
     top-0 left-0 right-0 z-10 h-14 border-b-2 shadow-md  flex items-center justify-between
     px-4
     md:px-20"
    >
      <div className="text-sm md:text-base font-bold text-purple-500 cursor-pointer flex items-center gap-4">
        <div
          onClick={() => dispatch(toggle())}
          className="
          transition-transform   ease-linear
        duration-700 cursor-pointer
        "
        >
          {!open ? <Hamburger /> : <Cancel />}
        </div>
        H-Forum
      </div>
      <div
        className="searchbar hidden border-none outline-none rounded-md py-1 h-8 px-4 w-96 
      bg-gray-100 md:flex items-center"
      >
        <Search />
        <input
          onChange={handleChange}
          type="text"
          className="border-none outline-none rounded-md py-1 px-2 w-96 bg-gray-100"
          placeholder="Search for Topics"
        />
      </div>
      <div className="flex items-center gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          className="w-5 h-5 cursor-pointer "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>

        <div
          className="cursor-pointer text-sm md:text-base"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </div>
        {/* <Notification /> */}
        <img
          //onClick={() => navigate("/login")}
          src={
            user?.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY677t7F_8Epm50xo5OfqI882l5OBOPKRDxDWeGo7OQ&s"
          }
          alt="profile"
          className="
          w-6 h-6
          md:w-7 md:h-7 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
