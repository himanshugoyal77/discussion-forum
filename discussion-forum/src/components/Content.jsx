import React, { useEffect } from "react";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import Comment from "../icons/Comment";
import UserInfo from "./UserInfo";
import Write from "../icons/Write";
import Send from "../icons/Send";
import { useQuery } from "react-query";
import newRequests from "../utils/newRequest";

const Content = () => {
  const [openId, setOpenId] = React.useState([]);
  const [answer, setAnswer] = React.useState("");
  const [questiionId, setQuestionId] = React.useState("");

  const { isLoading, data } = useQuery("getAllQuestions", () =>
    newRequests.get("http://localhost:8080/questions").then((res) => res.data)
  );

  if (isLoading)
    return (
      <div className="h-full w-[100%] text-center">
        <h1>Loading</h1>
      </div>
    );

  return (
    <div className="h-full w-[60%] flex flex-col items-center gap-8 mb-12">
      {data.map((question, index) => (
        <div
          key={index}
          className="w-[80%] mx-12 flex flex-col items-end border p-4 rounded-md bg-purple-100"
        >
          <div className="w-full bg-white p-5 rounded-lg shadow-md flex items-start gap-5">
            <div className="left-section space-y-1 text-center">
              <Arrowup />
              <h3>{question?.upvote?.length || 0}</h3>
              <Arrowdown />
            </div>
            <div className="right-section w-full">
              <h1>{question?.question}</h1>
              <p>{question?.description}</p>
              <hr />
              <UserInfo
                openId={openId}
                index={index + 1}
                setOpenId={setOpenId}
                question={question}
              />
            </div>
          </div>
          {/* nested comment       */}
          {openId.find((ele) => ele === index + 1) && (
            <>
              {question?.replies?.map((answer, index) => {
                console.log("answer", answer);
                return (
                  <div key={answer._id} className="flex items-center gap-4">
                    <img
                      className="h-6 w-6"
                      src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
                      alt=""
                    />
                    <div
                      className="   
          max-w-xl bg-white p-5 rounded-lg shadow-md flex flex-col items-start gap-5 mt-2"
                    >
                      <p>{answer?.reply}</p>
                      <UserInfo answer={answer} />
                    </div>
                  </div>
                );
              })}
              {/* nested comment       */}
              <div
                className="w-full flex items-center gap-4
      bg-white px-5 py-2 rounded-lg shadow-md  mt-2"
              >
                <Write />
                <input
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full h-10 border-none outline-none 
          rounded-md py-1 px-2 "
                  type="text"
                  value={answer}
                  placeholder="Write a comment"
                />
                <Send
                  questionId={question._id}
                  answer={answer}
                  setAnswer={setAnswer}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Content;
