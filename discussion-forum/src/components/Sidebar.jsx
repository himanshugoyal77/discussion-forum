import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggle } from "../context/sidebarSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const open = useSelector((state) => state.sidebar.open);
  const dispatch = useDispatch();
  const active =
    "  bg-purple-100 text-purple-500 px-4 py-2 rounded-sm border-l-4 border-purple-700";
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } md:block  w-[60%] md:w-[15%] h-full md:h-80 fixed left-0 md:left-28 z-10 top-14 md:top-24 list-none
    text-gray-300 text-sm space-y-4 py-8 md:py-0
     bg-white dark:bg-[#1E212A] md:dark:bg-inherit shadow-md 
     md:shadow-none md:bg-transparent
    `}
    >
      <li
        onClick={() => navigate("/")}
        className={
          "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 hover:cursor-pointer " +
          (location === "/" ? active : " ")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        HOME
      </li>
      <li
        onClick={() => navigate("/explore")}
        className={
          "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer " +
          (location === "/explore" ? active : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
        EXPLORE TOPICS
      </li>
      <li
        onClick={() => {
          navigate("/chat");
        }}
        className={
          "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer " +
          (location === "/chat" ? active : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
          />
        </svg>
        CHAT
      </li>
      <li
        onClick={() => navigate("/myqna")}
        className={
          "flex items-center gap-2 mx-2 md:mx-0 px-4 py-1 cursor-pointer " +
          (location === "/myqna" ? active : "")
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        MY QNA
      </li>

      <li
        onClick={() => {
          navigate("/ask");
          dispatch(toggle());
        }}
        className="md:hidden flex items-center justify-center gap-2 px-4 py-2 cursor-pointer 
          bg-purple-600 mx-4 rounded-md text-white
          "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
        Ask a Question
      </li>
    </div>
  );
};

export default Sidebar;
