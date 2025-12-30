import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/pdfTask")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});
