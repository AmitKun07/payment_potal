import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Correct relative path if `api.js` is in `src`

const Login = ({ setUserId }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Used for signup
    const [isSignUp, setIsSignUp] = useState(false);

    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                // Call the signup endpoint
                const { data } = await API.post("api/auth/signup", { name, email, password });
                alert(data.message);
                setIsSignUp(false); // Switch to login mode
            } else {
                // Call the login endpoint
                const { data } = await API.post("api/auth/login", { email, password });
                alert(data.message);
                setUserId(data.user._id); // Save user ID
                navigate("/dashboard"); // Redirect to Dashboard
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">{isSignUp ? "Sign Up" : "Login"}</h2>
                <form onSubmit={handleAuth}>
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded"
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </form>
                <p
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-500 mt-4 text-center cursor-pointer"
                >
                    {isSignUp
                        ? "Already have an account? Login"
                        : "Don't have an account? Sign Up"}
                </p>
            </div>
        </div>
    );
};

export default Login;