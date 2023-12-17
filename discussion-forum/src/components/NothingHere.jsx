import React from "react";
import NothingImage from "../assets/nothing.png";

const NothingHere = () => {
  return (
    <div
      className="flex flex-col items-center justify-center 
        text-purple-600 w-full h-full"
    >
      <img src={NothingImage} alt="" />
      <h1 className="text-inherit">Nothing here!</h1>
    </div>
  );
};

export default NothingHere;
