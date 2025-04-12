import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

import styles from "./RequestNewPassword.module.css";

const RequestNewPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const toast = React.useRef(null);

    const handleAccess = (e) => {
        e.preventDefault();

        if (!email) {
            toast.current.show({
                severity: 'error',
                summary: 'Campos obrigatórios',
                detail: 'Por favor, preencha o e-mail.',
                life: 3000,
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.current.show({
                severity: 'error',
                summary: 'E-mail inválido',
                detail: 'Por favor, insira um e-mail válido.',
                life: 3000,
            });
            return;
        }

        toast.current.show({
            severity: 'success',
            summary: 'Email enviado',
            detail: 'Código de redefinição enviado',
            life: 3000,
        });

        setTimeout(() => {
            navigate("/");
        }, 3000);
    };

    return (
        <div className={styles.container}>
            <Toast ref={toast} />

            <Card className={styles.card}>
                <p className={styles.title}>Solicitar nova senha</p>
                <p className={styles.description}>Por favor, insira seu e-mail.</p>

                <form className={styles.form} onSubmit={handleAccess}>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-envelope" />
                        <InputText
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </IconField>

                    <Button className={styles.requestButton} label="Solicitar" type="submit" />
                </form>
            </Card>
        </div>
    );
}

export default RequestNewPassword;
