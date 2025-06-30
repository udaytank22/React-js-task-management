// src/pages/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = getToken();
    return token ? children : <Navigate to="/login" />;
}
