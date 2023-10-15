import express from "express";
import connectDB from "./connect.js";
import User from "./model/User.js";
import Question from "./model/Question.js";
import Reply from "./model/reply.js";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// create a new user
app.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;
  console.log("req.body", req.body);
  try {
    const findUser = await User.findOne({ name });
    if (findUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = await User.create({ name, password, email });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (findUser.password === password) {
      return res.status(200).json(findUser);
    }
    return res.status(400).json({ message: "Incorrect password" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// add question
app.post("/ask-question", async (req, res) => {
  const { question, description, userId, tags } = req.body;
  try {
    const newQuestion = await Question.create({
      question,
      description,
      author: userId,
      tags,
    });
    return res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/answer/:id", async (req, res) => {
  const { answer, userId } = req.body;

  const { id: questionId } = req.params;
  try {
    const reply = await Reply.create({ reply: answer, author: userId });
    const findQuestion = await Question.findById(questionId);
    console.log("find", findQuestion);
    const addReply = await findQuestion.updateOne({
      $push: { replies: reply._id },
    });
    return res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// general routes
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find({})
      .populate("replies")
      .populate({
        path: "replies",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .populate("author")
      .sort({ createdAt: -1 });
    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/upvote/:id", async (req, res) => {
  const { id: questionId } = req.params;
  const { userId } = req.body;
  try {
    const findQuestion = await Question.findById(questionId);
    if (findQuestion.upvote.includes(userId)) {
      return res.status(400).json({ message: "You have already upvoted" });
    }

    if (findQuestion.downvote.includes(userId)) {
      const downvote = await findQuestion.updateOne({
        $pull: { downvote: userId },
      });
      res.status(200).json({ message: "Response updated successfully" });
    }

    const upvote = await findQuestion.updateOne({
      $push: { upvote: userId },
    });
    return res.status(200).json(upvote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/downvote/:id", async (req, res) => {
  const { id: questionId } = req.params;
  const { userId } = req.body;
  try {
    const findQuestion = await Question.findById(questionId);
    if (findQuestion.downvote.includes(userId)) {
      return res.status(400).json({ message: "You have already downvoted" });
    }

    if (findQuestion.upvote.includes(userId)) {
      const upvote = await findQuestion.updateOne({
        $pull: { upvote: userId },
      });
      res.status(200).json({ message: "Response updated successfully" });
    }

    const downvote = await findQuestion.updateOne({
      $push: { downvote: userId },
    });
    return res.status(200).json(downvote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

const deleteUser = async () => {
  try {
    const deleteQuestion = await Reply.deleteMany({});
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const server = app.listen(8080, () => {
  connectDB();
  //deleteUser();
  console.log("Server running on port 8080");
});

const io = new Server(server, {
  secure: true,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("join-room", ({ room }) => {
    console.log("room", room);
    socket.join(room);
  });
  socket.on("send-message", ({ message, room, user }) => {
    console.log("message", message);
    io.to(room).emit("receive-message", { message, user, room });
  });
});
