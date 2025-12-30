import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
    const [form, setForm] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/auth/register", form);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Create Account🚀
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Join us and get started
                </p>

                {error && (
                    <p className="text-red-600 text-center mb-4">{error}</p>
                )}

                <form onSubmit={submit}>
                    <input
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />

                    <input
                        placeholder="Email address"
                        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                        Register
                    </button>
                </form>

                <p className="text-center text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
