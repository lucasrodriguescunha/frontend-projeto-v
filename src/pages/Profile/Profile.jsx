import React, { useState, useEffect } from "react";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import userService from "../../services/UserService";

import styles from "./Profile.module.css";

const Profile = () => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    // const [userPassword, setUserPassword] = useState("");
    const [userPermission, setUserPermission] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const loggedUserEmail = sessionStorage.getItem("userEmail");
                if (loggedUserEmail) {
                    const userData = await userService.getUsuarioByEmail(loggedUserEmail);
                    if (userData) {
                        setUserId(userData.idUsuario);
                        setUserName(userData.nome || "");
                        setUserEmail(userData.email || "");
                        setUserPermission(userData.permissao || "");
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
                // senha: userPassword,
                permissao: userPermission,
                ativo: true,
                contaBloqueada: false,
                contaExpiraEm: null,
                senhaExpirada: false,
                tentativasFalhas: 0
            };
            console.log("Enviando para PUT:", updatedUser);
            await userService.updateUsuario(userId, updatedUser);
            alert("Alterações salvas com sucesso!");
        } catch (error) {
            alert("Erro ao salvar alterações: " + error.message);
        }
    };

    return (
        <div className={styles.container}>
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
                        disabled={!userId}
                    />
                    <Button
                        label="Voltar para página inicial"
                        className={styles.button}
                        onClick={() => navigate("/app/home")}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Profile;
