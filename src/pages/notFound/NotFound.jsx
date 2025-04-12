import React from "react";
import { Card } from "primereact/card";
//import { useNavigate } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
    //const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Card className={styles.content} title={<span className={styles.title}>404</span>}>
                <p className={styles.message}>Página não encontrada</p>
            </Card>
        </div>
    );
};

export default NotFound;
