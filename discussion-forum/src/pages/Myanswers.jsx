import React from "react";
import { useQuery } from "react-query";
import newRequests from "../utils/newRequest";
import Arrowup from "../icons/Arrowup";
import Arrowdown from "../icons/Arrowdown";
import UserInfo from "../components/UserInfo";
import Write from "../icons/Write";
import SyncLoader from "react-spinners/SyncLoader";

const Myanswers = () => {
  const [openId, setOpenId] = React.useState([]);
  const id = JSON.parse(localStorage.getItem("user"))._id;

  const { isLoading, data } = useQuery("getMyQuestions", () =>
    newRequests
      .get(`http://localhost:8080/my-questions/${id}`)
      .then((res) => res.data)
  );

  if (isLoading)
    return (
      <div className="h-screen mt-[10%] w-[100%] text-center">
        <SyncLoader size={10} color="#7E22CE" />
      </div>
    );

  return (
    <div className="h-full w-[60%] flex flex-col items-center gap-8 my-8">
      {data.map((question, index) => (
        <div
          key={index}
          className="w-[80%] mx-12 flex flex-col items-end border p-4 rounded-md bg-purple-100"
        >
          <div className="w-full bg-white p-5 rounded-lg shadow-md flex items-start gap-5">
            <div className="left-section space-y-1 text-center">
              <Arrowup id={question._id} />
              <h3>{question?.upvote?.length || 0}</h3>
              <Arrowdown id={question._id} />
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
        max-w-xl  p-5 rounded-lg bg-white shadow-md flex flex-col items-start gap-5 mt-2"
                    >
                      <p>{answer?.reply}</p>
                      <UserInfo answer={answer} />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Myanswers;
