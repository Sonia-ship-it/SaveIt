import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";

dotenv.config();
const app=express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(cors({
  origin: "*", 
  methods: ["GET","POST","PUT","DELETE"],
  credentials: false
}));
app.use(rateLimit({windowMs: 15*60*1000, max: 100}))

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("Mongo DB connected"))
.catch((err) => console.error("Mongo DB connection error: ", err))
app.get("/", (req,res) => {
    res.json({message: "SaveIt is running"})
})
app.use("/api/auth",authRoutes);
const PORT=process.env.PORT;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`))