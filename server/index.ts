import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const server = createServer(app);
const PORT = process.env.PORT || 9000;
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("join-room", (roomId, userId) => {
    console.log(`a new user ${userId} joined room ${roomId}`);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
  });

  socket.on("user-toggle-audio", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
  });

  socket.on("user-toggle-video", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-toggle-video", userId);
  });

  socket.on("user-leave", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-leave", userId);
  });

  socket.on("user-share-screen", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-share-screen", userId);
  });

  socket.on("user-chat-message", (userId, roomId, msg) => {
    console.log('message: ' + msg);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-share-screen", userId);
  });
});

server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
