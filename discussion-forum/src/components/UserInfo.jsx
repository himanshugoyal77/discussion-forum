import React from "react";
import Comment from "../icons/Comment";
import moment from "moment";

const UserInfo = ({ openId, index, setOpenId, question, answer }) => {
  console.log(answer?.author);
  console.log(question?.author?.name);
  return (
    <div className="flex items-center">
      <div className="posted-by flex items-center gap-3">
        <img
          src="https://avatars.githubusercontent.com/u/56132780?v=4"
          alt="profile"
          className="w-6 h-6 rounded-full"
        />
        <h2 className="text-gray-300 text-xs">
          posted by{" "}
          <span className="text-purple-800 font-bold text-sm">
            {question?.author?.name || answer?.author?.name}
          </span>
        </h2>
      </div>
      <div className="posted-on ml-5">
        <h2 className="text-gray-300 text-xs">
          {question
            ? moment(question?.createdAt).fromNow()
            : moment(answer?.createdAt).fromNow()}
        </h2>
      </div>
      {openId && (
        <div
          className="comment flex gap-2 ml-auto cursor-pointer"
          onClick={() => {
            if (!openId.find((ele) => ele === index)) {
              console.log("hello");
              setOpenId([...openId, index]);
            }
            if (openId.find((ele) => ele === index)) {
              setOpenId(openId.filter((ele) => ele !== index));
            }
          }}
        >
          <Comment />
          <span className="text-gray-300 text-xs">12+</span>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
