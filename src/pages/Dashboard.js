// src/pages/Dashboard.jsx

import { logout } from "../utils/auth";

export default function Dashboard() {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Dashboard</h1>
            <p>Welcome! You are logged in.</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
