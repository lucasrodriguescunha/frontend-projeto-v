import React from "react";
import {PrimeReactProvider} from "primereact/api";
import AppRoutes from "./AppRoutes"; // Importa as rotas
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
    return (
        <PrimeReactProvider>
            <AppRoutes/> {/* Renderiza as rotas corretamente */}
        </PrimeReactProvider>
    );
}

export default App;