import React, { useState, useEffect, useRef } from "react";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router';
import userService from "../../services/UserService";

import styles from "./Profile.module.css";

const Profile = () => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPermission, setUserPermission] = useState("");

    // Valores originais para comparação
    const [originalName, setOriginalName] = useState("");
    const [originalEmail, setOriginalEmail] = useState("");

    const navigate = useNavigate();
    const toast = useRef(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const loggedUserEmail = localStorage.getItem("userEmail");
                if (loggedUserEmail) {
                    const userData = await userService.getUsuarioByEmail(loggedUserEmail);
                    if (userData) {
                        setUserId(userData.idUsuario);
                        setUserName(userData.nome || "");
                        setUserEmail(userData.email || "");
                        setUserPermission(userData.permissao || "");

                        // Armazena os valores iniciais
                        setOriginalName(userData.nome || "");
                        setOriginalEmail(userData.email || "");
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
            }
        };
        loadUserData();
    }, []);

    const handleSave = async () => {
        try {
            const updatedUser = {
                idUsuario: userId,
                nome: userName,
                email: userEmail,
                permissao: userPermission,
                ativo: true,
                contaBloqueada: false,
                contaExpiraEm: null,
                senhaExpirada: false,
                tentativasFalhas: 0
            };

            await userService.updateUsuario(userId, updatedUser);

            localStorage.setItem("userEmail", updatedUser.email);
            localStorage.setItem("forceLogin", "true");

            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Alterações salvas com sucesso!',
                life: 2500
            });

            setTimeout(() => {
                window.location.href = "http://localhost:4200/login";
            }, 2500);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao salvar alterações: ' + error.message,
                life: 3000
            });
        }
    };

    const hasChanges = userName !== originalName || userEmail !== originalEmail;

    const handleLogout = () => {
        // Remove os dados do localStorage
        localStorage.removeItem("tokenJWT");
        localStorage.removeItem("userEmail");
        
        // Redireciona para a página de login
        navigate("/");
    };

    return (
        <div className={styles.container}>
            <Toast ref={toast} />

            <Card className={styles.card}>
                <p className={styles.title}>Perfil</p>

                <div className={styles.avatarWrapper}>
                    <div className={styles.avatarContainer}>
                        <Avatar label={userName.charAt(0).toUpperCase()} size="xlarge" shape="circle" />
                        <span className={styles.cameraIcon}>
                            <i className="pi pi-camera"></i>
                        </span>
                    </div>
                </div>

                <div className={styles.inputField}>
                    <span className={styles.inputIcon}>
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputField}>
                    <span className={styles.inputIcon}>
                        <i className="pi pi-envelope"></i>
                    </span>
                    <InputText
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <p className={styles.description}>Sua permissão é: <strong>{userPermission}</strong></p>

                <div className={styles.buttonGroup}>
                    <Button
                        label="Salvar alterações"
                        icon="pi pi-save"
                        className={`${styles.button} p-button-success`}
                        onClick={handleSave}
                        disabled={!userId || !hasChanges}
                    />
                    <Button
                        label="Voltar para página inicial"
                        className={styles.button}
                        onClick={() => navigate("/app/home")}
                    />
                    <Button
                        label="Sair"
                        className={styles.button}
                        onClick={handleLogout}
                    >
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
