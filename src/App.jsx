import React, { useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import { useNavigate, useLocation } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppRoutes from "./AppRoutes";

import './App.module.css';
import './styles/Variables.module.css';

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Verifica se o usuário está logado
        const token = localStorage.getItem('tokenJWT');
        const isAuthenticated = token && token.trim() !== "";
        
        // Se estiver na página inicial (/) ou /login e já estiver autenticado, redireciona para /app/home
        if (isAuthenticated && (location.pathname === '/' || location.pathname === '/login')) {
            navigate('/app/home');
        }
    }, [navigate, location.pathname]);

    return (
        <PrimeReactProvider>
            <AppRoutes />
        </PrimeReactProvider>
    );
}

export default App;
