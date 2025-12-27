import express  , {Request , Response} from "express";
import { authRouter } from "./routes/auth.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth" , authRouter);

app.get("/"  , (req : Request, res : Response)=>{
  res.send("Hi, Jexts here!")
})


export default app;
