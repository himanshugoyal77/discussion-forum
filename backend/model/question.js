import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "DiscussionUser",
    },
    replies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reply",
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    upvote: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "DiscussionUser",
      default: [],
    },
    downvote: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "DiscussionUser",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
