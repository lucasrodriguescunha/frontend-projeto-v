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
        <div id="container-request">
            <Toast ref={toast}/>

            <Card id="custom-card">
                <p id="request-text">Solicitar nova senha</p>
                <p id="request-description">Por favor, insira seu e-mail.</p>

                <form onSubmit={handleAccess}>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-envelope"/>
                        <InputText
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </IconField>

                    <Button id="request-button" label="Solicitar" type="submit"/>
                </form>
            </Card>
        </div>
    );
}

export default RequestNewPassword;
