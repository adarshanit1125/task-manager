import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userEmail", email);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-2">
                    TASK MANAGER
                </h1>

                <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
                    Login to your account
                </h2>


                {error && (
                    <p className="text-red-600 text-center mb-4">{error}</p>
                )}

                <form onSubmit={submit}>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>

                <p className="text-center text-sm mt-6">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
