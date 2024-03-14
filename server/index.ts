import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('join-room', ({ roomId, userId }) => {
    console.log(`A new user: ${userId} joined the room: ${roomId}`);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    socket.to(roomId).emit('member-joined', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('member-left', userId);
    });

    socket.on('send-message', ({ text, userId }) => {
      socket.to(roomId).emit('message-from-peer', { text, userId });
    });
  });
});

server.listen(9000, () => {
  console.log('server running at http://localhost:9000');
});