import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // Correct relative path if `api.js` is in `src`

const Dashboard = ({ userId }) => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    // Fetch wallet balance
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const { data } = await API.get(`api/wallet/balance/${userId}`);
                setBalance(data.balance);
            } catch (error) {
                alert("Failed to fetch wallet balance!");
                navigate("/"); // Redirect to login on error
            }
        };
        fetchBalance();
    }, [userId, navigate]);

    const handleAddFunds = async () => {
        try {
            const { data } = await API.post(`api/wallet/add-funds`, {
                userId,
                amount: parseInt(amount),
            });
            setBalance(data.balance); // Update balance from backend response
            setAmount(""); // Clear the input field
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add funds!");
        }
    };

    const handleDeductFunds = async () => {
        try {
            const { data } = await API.post(`api/wallet/deduct-funds`, {
                userId,
                amount: parseInt(amount),
            });
            setBalance(data.balance); // Update balance from backend response
            setAmount(""); // Clear the input field
        } catch (error) {
            alert(error.response?.data?.message || "Failed to deduct funds!");
        }
    };

    const handleLogout = () => {
        navigate("/"); // Redirect to login
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-96 bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
                <p className="text-lg mb-6">
                    <strong>Wallet Balance:</strong> ₹{balance}
                </p>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded"
                />
                <div className="space-x-4 mb-4">
                    <button
                        onClick={handleAddFunds}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add Funds
                    </button>
                    <button
                        onClick={handleDeductFunds}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Deduct Funds
                    </button>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;