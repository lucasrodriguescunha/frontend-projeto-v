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
import {Dropdown} from "primereact/dropdown";
import userService from "../../services/UserService";

import styles from "./Register.module.css";

const Register = () => {
    const [checked, setChecked] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [permission, setPermission] = useState(null);
    const navigate = useNavigate();
    const toast = React.useRef(null);

    const handleAccess = async (e) => {
        e.preventDefault();

        if (!email || !password || !name || !permission) {
            toast.current.show({
                severity: 'error',
                summary: 'Campos obrigatórios',
                detail: 'Preencha todos os campos.',
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

        try {
            await userService.postUsuario({
                nome: name,
                email: email,
                senha: password,
                permissao: permission
            });

            toast.current.show({
                severity: 'success',
                summary: 'Cadastro bem-sucedido',
                detail: 'Você foi cadastrado com sucesso!',
                life: 3000,
            });

            setTimeout(() => {
                navigate("/login");
            }, 3000);


        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Erro no cadastro',
                detail: error.message || 'Erro ao enviar os dados.',
                life: 3000,
            });
        }
    };

    const permissionOptions = [
        {permissao: 'Administrador', value: 'ADMINISTRADOR'},
        {permissao: 'Usuário', value: 'USUARIO'}
    ];

    return (
        <div className={styles.container}>
            <Toast ref={toast}/>
            <Card className={styles.card}>
                <p className={styles.title}>Bem-vindo(a)</p>
                <p className={styles.description}>Por favor, insira seus dados para realizar o cadastro.</p>
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

                    <Dropdown
                        value={permission}
                        onChange={(e) => setPermission(e.value)}
                        options={permissionOptions}
                        optionLabel="permissao"
                        placeholder="Selecione a permissão"
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

                    <p className={styles.loginRedirect} onClick={() => navigate("/login")}>
                        Ir para Login
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Register;
