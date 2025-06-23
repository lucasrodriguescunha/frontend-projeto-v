import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("tokenJWT");
    
    // Verifica se o token existe e não está vazio
    const isAuthenticated = token && token.trim() !== "";
    
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 