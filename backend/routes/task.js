import express from "express";
import Task from "../models/Task.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Auth middleware
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

// CREATE task
router.post("/", auth, async (req, res) => {
    const task = new Task({
        title: req.body.title,
        userId: req.userId
    });
    await task.save();
    res.json(task);
});

// READ tasks
router.get("/", auth, async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

export default router;
