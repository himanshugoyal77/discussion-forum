import React from "react";

const discussionTopics = [
  "Technology",
  "Climate",
  "space exploration",
  "AI and ethics",
  "Social media",
  "Mental health",
  "Education",
  "Health",
  "Culture",
  "Politics",
  "Sports",
  "Public opinion",
  "History",
  "Economy",
  "Business",
  "Science",
  "Philosophy",
  "Art",
];

const hexColorCodes = [
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FF3357",
  "#33FFB2",
  "#33B2FF",
  "#B233FF",
  "#FF33B2",
  "#B2FF33",
  "#FFB233",
  "#B233FF",
  "#33FF6F",
  "#6FFF33",
  "#336FFF",
  "#FF336F",
  "#6F33FF",
  "#33FF8C",
  "#8CFF33",
  "#FF8C33",
  "#8C33FF",
  "#33FFFF",
  "#FFFF33",
  "#33FFC2",
  "#C2FF33",
  "#FFC233",
  "#C233FF",
];

const Explore = () => {
  const navigateToTopic = (topic) => {
    window.location.href = `/explore/${topic.toLowerCase()}`;
  };
  return (
    <div className="w-full md:w-[50%] text-center h-screen mt-8">
      <h1 className="text-xl text-gray-800 dark:text-white">
        {" "}
        Select A Topic To Explore
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-4 mt-3 items-center">
        {discussionTopics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer gap-2 m-3 text-start"
            onClick={() => navigateToTopic(topic)}
          >
            <div
              className="h-2 md:w-4 w-2 md:h-4 rounded-full"
              style={{ backgroundColor: hexColorCodes[index] }}
            ></div>
            <h3 className="text-xs">{topic}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
