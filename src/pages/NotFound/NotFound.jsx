import React from "react";
import { Card } from "primereact/card";

import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <Card className={styles.content} title={<span className={styles.title}>404</span>}>
                <p className={styles.message}>Página não encontrada</p>
            </Card>
        </div>
    );
};

export default NotFound;
