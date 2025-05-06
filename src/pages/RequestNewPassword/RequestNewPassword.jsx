import React, {useState} from "react";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Toast} from "primereact/toast";
import {InputOtp} from "primereact/inputotp";

import styles from "./RequestNewPassword.module.css";

const ValidationCode = () => {
    const [token, setTokens] = useState();
    return (
        <div className={styles.containerValidationCode}>
            <InputOtp value={token} onChange={(e) => setTokens(e.value)} integerOnly/>
        </div>
    )
}

const RequestNewPassword = () => {
    const [email, setEmail] = useState("");
    const [showValidationCode, setShowValidationCode] = useState(false); // <-- novo estado
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

        // Troca para o componente de código de validação
        setShowValidationCode(true);
    };

    return (
        <div className={styles.container}>
            <Toast ref={toast}/>

            <Card className={styles.card}>
                <p className={styles.title}>Solicitar nova senha</p>
                <p className={styles.description}>
                    {showValidationCode ? "Digite o código de validação enviado ao seu e-mail." : "Por favor, insira seu e-mail."}
                </p>

                {showValidationCode ? (
                    <ValidationCode/>
                ) : (
                    <form className={styles.form} onSubmit={handleAccess}>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-envelope"/>
                            <InputText
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </IconField>

                        <Button className={styles.requestButton} label="Solicitar" type="submit"/>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default RequestNewPassword;