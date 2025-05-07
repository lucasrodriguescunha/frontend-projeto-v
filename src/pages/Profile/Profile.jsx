import React, { useState, useEffect } from "react";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import userService from "../../services/UserService"; // Ajuste o caminho conforme sua estrutura de pastas

import styles from "./Profile.module.css";

const Profile = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPermission, setUserPermission] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Função para carregar os dados do usuário
        const loadUserData = async () => {
            try {
                // Recupera o email do usuário logado da sessão
                const loggedUserEmail = sessionStorage.getItem("userEmail");
                
                if (loggedUserEmail) {
                    // Busca os dados do usuário pelo email
                    const userData = await userService.getUsuarioByEmail(loggedUserEmail);
                    
                    // Atualiza os estados com os dados recebidos
                    if (userData) {
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

    return (
        <div className={styles.container}>
            <Card className={styles.card}>

                <p className={styles.title}>Perfil</p>

                <div className={styles.avatarWrapper}>
                    <div className={styles.avatarContainer}>
                        <Avatar label="U" size="xlarge" shape="circle" />
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

                <Button
                    label="Voltar para página inicial"
                    className={styles.button}
                    onClick={() => navigate("/app/home")}
                />
            </Card>
        </div>
    );
}

export default Profile;