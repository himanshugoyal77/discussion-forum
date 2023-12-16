import React from "react";
import Lottie from "lottie-react";
import notfoundAnimation from "../assets/Animation - 1697960575412.json";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie animationData={notfoundAnimation} loop={true} />
      <h2 className="text-2xl text-gray-800 mt-4">
        Sorry, we couldn't find any results
      </h2>
    </div>
  );
};

export default Notfound;
