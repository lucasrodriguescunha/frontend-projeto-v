import React, {useState} from "react";
import {useNavigate} from "react-router";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Toast} from "primereact/toast";
import {Password} from "primereact/password";

import "./Login.css";

const Login = () => {
    const [checked, setChecked] = useState(true);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const toast = React.useRef(null); // Referência para o Toast

    const handleAccess = (e) => {
        e.preventDefault();

        // Validações antes de permitir o login
        if (!email || !senha) {
            toast.current.show({
                severity: 'error',
                summary: 'Campos obrigatórios',
                detail: 'Por favor, preencha o e-mail e a senha.',
                life: 3000,
            });
            return;
        }

        // Validação do formato do e-mail
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

        // Validação da senha (pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais)
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        if (!senhaRegex.test(senha)) {
            toast.current.show({
                severity: 'error',
                summary: 'Senha inválida',
                detail: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.',
                life: 3000,
            });
            return;
        }

        // Se a validação passar, exibe o Toast de sucesso e navega para o próximo passo
        toast.current.show({
            severity: 'success',
            summary: 'Login bem-sucedido',
            detail: 'Você foi logado com sucesso!',
            life: 3000,
        });

        // Atrasar a navegação para garantir que o Toast seja exibido
        setTimeout(() => {
            navigate("/home"); // Redireciona para o Dashboard
        }, 3000); // 3000ms é o tempo em que o Toast será mostrado (ajuste conforme necessário)
    };

    return (
        <div id="container-login">
            <Toast ref={toast}/> {/* Exibindo o Toast */}

            <div id="custom-title">
                {/*<Image src={docIcon} alt="Ícone de documento" width="auto" height="auto"/>*/}
                <h1>QualiAI</h1>
            </div>

            <Card id="custom-card">
                <p id="login-text">Bem-vindo(a)</p>
                <p id="login-description">Por favor, insira seus dados.</p>

                <form id="custom-form" onSubmit={handleAccess}>
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

                    <div id="checkbox-container">
                        <Checkbox
                            id="checkbox"
                            onChange={(e) => setChecked(e.checked)}
                            checked={checked}
                        />
                        <label htmlFor="checkbox">Lembrar-me</label>
                    </div>

                    <Button id="login-button" label="Acessar" type="submit"/>

                    <p id="request-password" onClick={() => navigate("/novasenha")}>
                        Solicitar nova senha
                    </p>
                </form>
            </Card>
        </div>
    );
}

export default Login;
