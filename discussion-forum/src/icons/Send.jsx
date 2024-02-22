import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import newRequests from "../utils/newRequest";

const Send = ({ answer, questionId, setAnswer }) => {
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    mutation.mutate(questionId);
  };

  const mutation = useMutation({
    mutationKey: ["new-answer"],
    mutationFn: (id) => {
      return newRequests.post(
        `${process.env.REACT_APP_BACKEND_URL}/answer/${id}`,
        {
          answer,
          userId: JSON.parse(localStorage.getItem("user"))._id,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllQuestions"]);
      setAnswer("");
    },
  });

  return (
    <svg
      onClick={handleSubmit}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-purple-700 cursor-pointer hover:scale-110 hover:translate-x-1 hover:transform transition-all duration-300"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
};

export default Send;
