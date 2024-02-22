import React from "react";
import Add from "../icons/Add";
import Share from "../icons/Share";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { duration } from "moment";

const Askquestion = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const naviate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, tags } = e.target;
    const question = {
      question: title.value,
      description: description.value,
      tags: tags.value.split(","),
      userId: user._id,
    };
    let spamScore;
    let notSpamScore;
    let label_0;
    let label_1;

    const response = await query({ inputs: title.value });
    console.log("response", response);
    label_0 = response[0][0].label;
    label_1 = response[0][0].label;

    if (label_0 === "LABEL_0") {
      toast.error("Your question seems to be a spam", (duration = 2000));
      return;
    }
    // spamScore = Number(response[0][0].score);
    // notSpamScore = Number(response[0][1].score);

    // console.log(spamScore * 100);
    // if (spamScore > notSpamScore) {
    //   toast.error("Your question seems to be a spam", (duration = 2000));
    //   return;
    // }

    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/ask-question`,
      question
    );
    if (res.status === 201) {
      toast.success("Question added successfully", (duration = 2000));
      setTimeout(() => {
        naviate("/");
      }, 2000);
    }
  };

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/shahrukhx01/bert-mini-finetune-question-detection",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  return (
    <div className="h-full md:w-[50%]">
      <Toaster />
      <div
        className="md:mx-12 flex flex-col items-center 
      gap-4 mb-12 border p-4 pb-6 rounded-md bg-purple-300 
      dark:bg-[#1E212A]  mt-12"
      >
        <h1
          className="text-2xl font-bold text-center
        text-purple-600 
        "
        >
          Ask a Question
        </h1>

        <form onSubmit={handleSubmit} className="form w-full ">
          <div className="title">
            <label className="text-gray-800 text-start dark:text-white">
              Question Title
            </label>
            <input
              name="title"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-none
                shadow-sm"
              type="text"
            />
          </div>
          <div className="desc mt-3">
            <label className="text-gray-800 text-start dark:text-white">
              Question Description
            </label>
            <textarea
              name="description"
              className="mt-2 w-full h-24 px-3 py-2 rounded outline-none border-none  shadow-sm"
              type="text"
            />
          </div>
          <div className="tages mt-3">
            <label className="text-gray-800 text-start dark:text-white">
              Related Tags
            </label>
            <input
              name="tags"
              placeholder="Enter tags seperated by comma"
              className="mt-2 w-full h-10 px-3 rounded outline-none border-none  shadow-sm"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-[230px] mx-auto flex items-center gap-2 bg-purple-700 rounded-md shadow-sm px-8 py-2 cursor-pointer"
          >
            <Share />
            <span className="text-white">Ask on Community</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Askquestion;
