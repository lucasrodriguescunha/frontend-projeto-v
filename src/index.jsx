import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";
import App from './App';
import reportWebVitals from './reportWebVitals';

// Alterando a importação do CSS para módulo
import './index.module.css';  // Agora é index.module.css, com CSS Modules

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);

// Medição de performance (se necessário)
reportWebVitals();
