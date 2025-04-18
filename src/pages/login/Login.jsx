import React, {useRef, useState} from "react";
import {useNavigate} from "react-router";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Toast} from "primereact/toast";
import {Password} from "primereact/password";

import styles from "./Login.module.css";

const Login = () => {
    const [checked, setChecked] = useState(true);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const toast = useRef(null);

    const handleAccess = (e) => {
        e.preventDefault();

        if (!email || !senha) {
            toast.current.show({
                severity: 'error',
                summary: 'Campos obrigatórios',
                detail: 'Por favor, preencha o e-mail e a senha.',
                life: 3000,
            });
            return;
        }

        // Validação básica de formato
        if (!email.includes("@") || !email.includes(".")) {
            toast.current.show({
                severity: 'error',
                summary: 'E-mail inválido',
                detail: 'O e-mail deve conter "@" e "."',
                life: 3000,
            });
            return;
        }

        if (senha.length < 8) {
            toast.current.show({
                severity: 'error',
                summary: 'Senha muito curta',
                detail: 'A senha deve ter no mínimo 8 caracteres.',
                life: 3000,
            });
            return;
        }

        toast.current.show({
            severity: 'success',
            summary: 'Login bem-sucedido',
            detail: 'Você foi logado com sucesso!',
            life: 3000,
        });

        setTimeout(() => {
            navigate("/home");
        }, 3000);
    };

    const requestPassword = () => {
        navigate("/redefinir-senha");
    }

    return (
        <div className={styles.containerLogin}>
            <Toast ref={toast}/>

            <Card className={styles.customCard}>
                <p className={styles.loginText}>Bem-vindo(a)</p>
                <p className={styles.loginDescription}>Por favor, insira seus dados.</p>

                <form onSubmit={handleAccess} className={styles.form}>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-envelope"/>
                        <InputText
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </IconField>

                    <Password
                        placeholder="Senha"
                        name="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        toggleMask
                        promptLabel="Insira a senha"
                        weakLabel="Fraca"
                        mediumLabel="Média"
                        strongLabel="Forte"
                    />

                    <div className={styles.checkboxContainer}>
                        <Checkbox
                            inputId="checkbox"
                            onChange={(e) => setChecked(e.checked)}
                            checked={checked}
                        />
                        <label htmlFor="checkbox">Lembrar-me</label>
                    </div>

                    <Button className={styles.loginButton} label="Acessar" type="submit"/>

                    <p className={styles.requestPassword} onClick={requestPassword}>
                        Solicitar nova senha
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Login;
