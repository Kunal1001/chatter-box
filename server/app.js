import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;

const app = express();
const server = createServer(app);

var chatData = []
var rooms = []

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/data", (req, res)=>{
  res.json({data:chatData, rooms:rooms});
})


io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("message", ({user, userId, room, message }) => {
    console.log({user:user, userId, room, message });
    chatData = [...chatData , {user,userId, room, message }];
    socket.broadcast.emit("receive-message", {user,userId,room, message});
  });

  socket.on("create-room", (room) => {
    console.log(room);
    rooms = [...rooms, room]
    socket.broadcast.emit('get-rooms', room)
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
