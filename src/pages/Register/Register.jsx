import React, {useState} from "react";
import {useNavigate} from "react-router";
import {Toast} from "primereact/toast";
import {Card} from "primereact/card";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";

import styles from "./Register.module.css";

const Register = () => {
    const [checked, setChecked] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const toast = React.useRef(null);

    const handleAccess = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.current.show({
                severity: 'error',
                summary: 'Campos obrigatórios',
                detail: 'Por favor, preencha o e-mail e a senha.',
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

        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        if (!senhaRegex.test(password)) {
            toast.current.show({
                severity: 'error',
                summary: 'Senha inválida',
                detail: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
                life: 3000,
            });
            return;
        }

        toast.current.show({
            severity: 'success',
            summary: 'Cadastro bem-sucedido',
            detail: 'Você foi cadastrado com sucesso!',
            life: 3000,
        });

        setTimeout(() => {
            navigate("/home");
        }, 3000);
    };

    const login = () => {
        navigate("/login");
    }

    return (
        <div className={styles.container}>
            <Toast ref={toast}/>

            <Card className={styles.card}>
                <p className={styles.title}>Bem-vindo(a)</p>
                <p className={styles.description}>Por favor, insira seus dados.</p>

                <form className={styles.form} onSubmit={handleAccess}>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-user"/>
                        <InputText
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </IconField>

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                    <Button className={styles.registerButton} label="Cadastrar" type="submit"/>

                    <p className={styles.loginRedirect} onClick={login}>
                        Ir para Login
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Register;
