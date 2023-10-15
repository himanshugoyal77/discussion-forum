import React, { useEffect } from "react";
import { io } from "socket.io-client";
import Write from "../icons/Write";
import Send from "../icons/Send";

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
  console.log("messages", messages);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    // socket.on("connection", () => {});
    socket.emit("join-room", { room: room });
    socket.on("receive-message", ({ message, room, user }) => {
      setMessages((prev) => {
        console.log("prev", prev[room]);
        return {
          ...prev,
          [room]: [...prev[room], { message, user }],
        };
      });
    });
    return () => {
      socket.off();
    };
  }, []);

  console.log(room);

  const handleClick = () => {
    console.log("cxlk,message");
    socket.emit("send-message", {
      message: message,
      room: room,
      user: user,
    });
  };

  return (
    <div className="h-full w-[60%] flex flex-col items-center ml-20 gap-4 mb-12">
      <h1 className=""> Select a Topic to Chat</h1>
      <div className="grid grid-cols-4 gap-4 mb-5">
        {discussionTopics.map((topic) => (
          <div
            key={topic}
            className={
              "border-2 p-2 rounded-md cursor-pointer text-center " +
              (room === topic ? "bg-purple-400" : "")
            }
            onClick={() => setRoom(topic)}
          >
            {topic}
          </div>
        ))}
      </div>
      <div
        className="relative border-2 overflow-y-scroll 
      p-4 rounded-md w-[80%] h-[350px] flex flex-col"
      >
        {messages &&
          Object.entries(messages).map(([key, value]) => {
            return (
              <div>
                {key === room &&
                  value.map((msg) => {
                    return (
                      <div
                        className={
                          "w-max text-white bg-purple-400 py-2 px-3 mb-2 rounded-md " +
                          (user?._id === msg.user._id
                            ? "ml-auto bg-purple-600"
                            : "")
                        }
                      >
                        {msg.user.name} : {msg.message}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        <div
          className="mt-auto bg-purple-600 flex items-center gap-4
       px-5 py-2 rounded-lg shadow-md  "
        >
          <Write />
          <input
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-10 border-none outline-none 
          rounded-md py-1 px-2 "
            type="text"
            value={message}
            placeholder="Write a comment"
          />
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
    </div>
  );
};

export default Chat;
