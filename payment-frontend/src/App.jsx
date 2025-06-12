import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
    const [userId, setUserId] = useState("");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setUserId={setUserId} />} />
                <Route path="/dashboard" element={<Dashboard userId={userId} />} />
            </Routes>
        </Router>
    );
};

export default App;