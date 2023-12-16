import React, { useEffect } from "react";
import { io } from "socket.io-client";
import Write from "../icons/Write";
import Send from "../icons/Send";
import { useNavigate } from "react-router-dom";
import _, { set } from "lodash";
import moment from "moment";

const socket = io("http://localhost:8080", {
  withCredentials: true,
  secure: true,
});

const discussionTopics = [
  "technology",
  "Climate",
  "Space",
  "Artificial intelligence",
  "Social media",
  "health",
  "education",
  "globalization",
  "culture",
  "Political",
  "Sports",
  "Public opinion",
];

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState({
    technology: [],
    Climate: [],
    Space: [],
    health: [],
    education: [],
    globalization: [],
    culture: [],
    Political: [],
    Sports: [],
  });
  const [user, setUser] = React.useState("");
  const [room, setRoom] = React.useState("technology");
  const [onlineUsers, setOnlineUsers] = React.useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(localStorage.getItem("user")));
    socket.connect();
    socket.auth = JSON.parse(localStorage?.getItem("user"));

    socket.on("user-connected", (users) => {
      const userWithoutDuplicates = _.uniqBy(users, "_id");
      console.log("userWithoutDuplicates", userWithoutDuplicates);
      setOnlineUsers(userWithoutDuplicates);
    });

    socket.emit("join-room", {
      room: room,
      user: JSON.parse(localStorage.getItem("user")),
    });

    socket.on("receive-message", ({ message, room, user }) => {
      console.log("message", message, room, user);
      setMessages((prev) => {
        console.log("prev", prev[room]);
        return {
          ...prev,
          [room]: [...prev[room], { message, user }],
        };
      });
    });

    socket.on("user-disconnected", (users) => {
      console.log("disconnected users", users);
      setOnlineUsers(users);
    });

    return () => {
      socket.off();
    };
  }, [socket, message]);

  const handleClick = () => {
    console.log("cxlk,message");
    socket.emit("send-message", {
      message: message,
      room: room,
      user: user,
    });
    setMessage("");
  };

  return (
    <div className="overflow-y-hidden h-screen w-full md:w-[60%] flex flex-col items-center gap-4 my-8">
      <div
        className="w-full md:w-[80%]
      text-sm md:text-base
      flex justify-between items-center"
      >
        <h1 className="flex gap-4 text-sm md:text-base">
          Online Users
          <span className="text-purple-600 text-sm flex gap-2">
            {" "}
            {onlineUsers.map((user) => {
              return (
                <img
                  alt="profile"
                  className="rounded-full h-6 md:h-8 w-6 md:w-8 bg-purple-100 flex items-center justify-center gap-2"
                  src={user.profileImage}
                />
              );
            })}
          </span>
        </h1>
        <h1 className=" text-sm md:text-base">
          {" "}
          {onlineUsers.length ? onlineUsers.length : 0}
        </h1>
      </div>

      <div
        className="w-full relative border-2 overflow-y-scroll 
      py-3 px-2 md:p-4 rounded-md md:w-[80%] h-2/3 flex flex-col"
      >
        {messages &&
          Object.entries(messages).map(([key, value]) => {
            return (
              <div>
                {key === room &&
                  value.map((msg) => {
                    return (
                      <div
                        className={`w-max mb-2 ${
                          user?._id === msg.user._id ? "ml-auto " : ""
                        }`}
                      >
                        <div
                          className={
                            " text-sm md:text-base text-white bg-purple-400 py-2 px-3 rounded-md " +
                            (user?._id === msg.user._id ? " bg-purple-600" : "")
                          }
                        >
                          {msg.message}
                        </div>
                        <span className="text-xs text-gray-500">
                          {msg.user._id === user?._id
                            ? "(You) "
                            : msg.user.name}
                          {moment(msg.createdAt).fromNow()}
                        </span>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <div
        className="w-full md:w-[80%] bg-purple-600 flex 
        items-center gap-2
        px-2 md:px-5 py-1 md:py-2 rounded-lg shadow-md  "
      >
        <Write />
        <div className="flex-grow w-full">
          <input
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-8 border-none outline-none 
          rounded-md py-1 px-2 "
            type="text"
            value={message}
            placeholder="Write a comment"
          />
        </div>

        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-white cursor-pointer hover:scale-110 hover:translate-x-1 hover:transform transition-all duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Chat;
