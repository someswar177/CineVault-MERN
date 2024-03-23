// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Layout from "./components/Layout";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
