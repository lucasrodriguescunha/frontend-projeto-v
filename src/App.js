import React from "react";
import {PrimeReactProvider} from "primereact/api";
import AppRoutes from "./Routes"; // Importa as rotas
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primeicons/primeicons.css';

function App() {
    return (
        <PrimeReactProvider>
            <AppRoutes/> {/* Renderiza as rotas corretamente */}
        </PrimeReactProvider>
    );
}

export default App;