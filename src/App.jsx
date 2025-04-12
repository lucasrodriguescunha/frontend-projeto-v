import React from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AppRoutes from "./AppRoutes";

import './App.module.css';

const App = () => {
    return (
        <PrimeReactProvider>
            <AppRoutes />
        </PrimeReactProvider>
    );
}

export default App;
