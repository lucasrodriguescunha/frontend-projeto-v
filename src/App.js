import React from "react";
import {PrimeReactProvider} from "primereact/api";
import AppRoutes from "./Routes"; // Importa as rotas

function App() {
    return (
        <PrimeReactProvider>
            <AppRoutes/> {/* Renderiza as rotas corretamente */}
        </PrimeReactProvider>
    );
}

export default App;