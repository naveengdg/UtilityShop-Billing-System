import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import auth from "./middleware/auth.js";

const app = express();//initialize express

dotenv.config();

app.use(express.json()); // to understand the json data

//enble cors (enables communication between frontend , backend and browser)

app.use(cors());

//Test route

app.get("/",(req , res)=>{
    res.send("Backend is Running successfully..!");
});
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT , ()=> console.log(`server running on PORT ${PORT}`));

app.use("/api/auth",authRoutes);

app.get("/api/protected",auth , (req , res)=>{
    res.json({
        message:"Protected route accessed successfully",
        user:req.user
    });
});