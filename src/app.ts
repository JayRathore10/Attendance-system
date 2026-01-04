import express  , {Request , Response} from "express";
import { authRouter } from "./routes/auth.routes";
import dotenv from "dotenv";
import { classRouter } from "./routes/class.routes";
import { attendanceRouter } from "./routes/attendance.routes";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth" , authRouter);
app.use("/class" , classRouter);
app.use("/attendance" , attendanceRouter);

app.get("/"  , (req : Request, res : Response)=>{
  res.send("Hi, Jexts here!")
})


export default app;
