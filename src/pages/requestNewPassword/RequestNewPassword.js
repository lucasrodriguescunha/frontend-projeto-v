import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Toast} from "primereact/toast";

import "./RequestNewPassword.css";

const RequestNewPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const toast = React.useRef(null); // Referência para o Toast

    const handleAccess = (e) => {
        e.preventDefault();

        // Validações antes de permitir o login
        if (!email) {
            toast.current.show({
                severity: 'error',
                summary: 'Campos obrigatórios',
                detail: 'Por favor, preencha o e-mail.',
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

        // Se a validação passar, exibe o Toast de sucesso e navega para o próximo passo
        toast.current.show({
            severity: 'success',
            summary: 'Email enviado',
            detail: 'Código de redefinição enviado',
            life: 3000,
        });

        // Atrasar a navegação para garantir que o Toast seja exibido
        setTimeout(() => {
            navigate("/"); // Redireciona para o Dashboard
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
                <p id="login-text">Solicitar nova senha</p>
                <p id="login-description">Por favor, insira seu e-mail.</p>

                <form id="custom-form" onSubmit={handleAccess}>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-envelope"/>
                        <InputText
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </IconField>

                    <Button id="login-button" label="Solicitar" type="submit"/>
                </form>
            </Card>
        </div>
    );
}

export default RequestNewPassword;
