import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    // Redirect if not logged in
    if (!token) {
        window.location.href = "/login";
    }

    // Logout
    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get("/tasks", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTasks();
    }, [token]);

    // Add task
    const addTask = async () => {
        if (!title.trim()) return;

        try {
            const res = await api.post(
                "/tasks",
                { title },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks([...tasks, res.data]);
            setTitle("");
        } catch (err) {
            console.log(err);
        }
    };

    // Delete task
    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* 🔹 TOP NAVBAR */}
            <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{email}</span>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* 🔹 HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-10">
                <h2 className="text-3xl font-bold">Welcome 👋</h2>
                <p className="opacity-90 mt-1">
                    Organize your work and stay productive
                </p>
            </div>

            {/* 🔹 MAIN CONTENT */}
            <div className="max-w-5xl mx-auto p-8">
                {/* ADD TASK CARD */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
                    <div className="flex gap-3">
                        <input
                            className="flex-1 border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your task..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                            onClick={addTask}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* TASK LIST */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>

                    {tasks.length === 0 ? (
                        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
                            No tasks yet. Start by adding one 🚀
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
                                >
                                    <p className="text-gray-800 font-medium mb-4">
                                        {task.title}
                                    </p>
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
