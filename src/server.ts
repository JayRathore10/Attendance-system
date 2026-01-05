import app from "./app";
import http from "http";
import {Server} from 'socket.io';
import { connectDB } from "./configs/db.config";
import dotenv, { config } from "dotenv";
import { authSocket } from "./middleware/socketAuth.middleware";
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
// Connect DB locally 
connectDB();

const io = new Server(server ,  {
  cors : {
    origin: "http://localhost:5173"
  }
});

authSocket(io);

io.on("connection" , (socket)=>{
  console.log("User Connected" , socket.data.user.id);

  socket.on("message",(msg)=>{
    socket.emit("reply" , "Received");
  });
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
