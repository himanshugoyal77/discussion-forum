import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Loading = () => {
  return (
    <div className="h-screen flex md:block items-center justify-center md:mt-[10%] w-[100%] text-center">
      <SyncLoader size={10} color="#7E22CE" />
    </div>
  );
};

export default Loading;
