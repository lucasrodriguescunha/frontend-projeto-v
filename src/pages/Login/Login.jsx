import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import userService from "../../services/UserService";
import { useEffect } from "react";

import styles from "./Login.module.css";

// Função simples para criptografar/descriptografar (em produção, use uma biblioteca mais robusta)
const encryptData = (data) => {
    return btoa(encodeURIComponent(data));
};

const decryptData = (encryptedData) => {
    try {
        return decodeURIComponent(atob(encryptedData));
    } catch (error) {
        return null;
    }
};

const Login = () => {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showClearDialog, setShowClearDialog] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null);

    useEffect(() => {
        const shouldForceLogin = localStorage.getItem("forceLogin");

        if (shouldForceLogin === "true") {
            toast.current.show({
                severity: 'info',
                summary: 'Reautenticação necessária',
                detail: 'Por favor, faça login novamente.',
                life: 4000,
            });

            localStorage.removeItem("forceLogin");
        }

        // Carregar credenciais salvas se existirem
        loadSavedCredentials();
    }, []);

    const loadSavedCredentials = () => {
        try {
            const savedEmail = localStorage.getItem("rememberedEmail");
            const savedPassword = localStorage.getItem("rememberedPassword");

            if (savedEmail && savedPassword) {
                const decryptedEmail = decryptData(savedEmail);
                const decryptedPassword = decryptData(savedPassword);

                if (decryptedEmail && decryptedPassword) {
                    setEmail(decryptedEmail);
                    setPassword(decryptedPassword);
                    setChecked(true);
                }
            }
        } catch (error) {
            console.error("Erro ao carregar credenciais salvas:", error);
        }
    };

    const saveCredentials = () => {
        if (checked && email && password) {
            try {
                const encryptedEmail = encryptData(email);
                const encryptedPassword = encryptData(password);

                localStorage.setItem("rememberedEmail", encryptedEmail);
                localStorage.setItem("rememberedPassword", encryptedPassword);
            } catch (error) {
                console.error("Erro ao salvar credenciais:", error);
            }
        } else if (!checked) {
            // Limpar credenciais salvas se "Lembrar-me" não estiver marcado
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
        }
    };

    const clearSavedCredentials = () => {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        setEmail("");
        setPassword("");
        setChecked(false);
        setShowClearDialog(false);

        toast.current.show({
            severity: 'success',
            summary: 'Credenciais removidas',
            detail: 'Suas credenciais salvas foram removidas com sucesso.',
            life: 3000,
        });
    };

    const confirmClearCredentials = () => {
        setShowClearDialog(true);
    };

    const handleAccess = async (e) => {
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

        if (!email.includes("@") || !email.includes(".")) {
            toast.current.show({
                severity: 'error',
                summary: 'E-mail inválido',
                detail: 'O e-mail deve conter "@" e "."',
                life: 3000,
            });
            return;
        }

        if (password.length < 8) {
            toast.current.show({
                severity: 'error',
                summary: 'Senha muito curta',
                detail: 'A senha deve ter no mínimo 8 caracteres.',
                life: 3000,
            });
            return;
        }

        try {
            const response = await userService.login({
                email_usuario: email,
                senha_usuario: password
            });

            localStorage.setItem("tokenJWT", response.tokenJWT);
            localStorage.setItem("userEmail", email);

            // Salvar credenciais se "Lembrar-me" estiver marcado
            saveCredentials();

            toast.current.show({
                severity: 'success',
                summary: 'Login bem-sucedido',
                detail: 'Você foi logado com sucesso!',
                life: 3000,
            });

            // Se há credenciais salvas, dar mais tempo para o usuário decidir se quer limpar
            const redirectDelay = localStorage.getItem("rememberedEmail") ? 8000 : 3000;

            setTimeout(() => {
                navigate("/app/home");
            }, redirectDelay);

        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Não autorizado',
                        detail: 'Usuário ou senha incorretos.',
                        life: 3000,
                    });
                } else if (error.response.status === 401) {
                    toast.current.show({
                        severity: 'warn',
                        summary: 'Conta bloqueada',
                        detail: 'Sua conta está bloqueada. Entre em contato com o suporte.',
                        life: 4000,
                    });
                } else {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Erro',
                        detail: error.response.data.message || 'Erro desconhecido.',
                        life: 3000,
                    });
                }
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.message || "Erro ao conectar com o servidor.",
                    life: 3000,
                });
            }
        }
    };

    const requestPassword = () => {
        navigate("/redefinir-senha");
    };

    return (
        <div className={styles.containerLogin}>
            <Toast ref={toast} />

            <Card className={styles.customCard}>
                <p className={styles.loginText}>Bem-vindo(a)</p>
                <p className={styles.loginDescription}>Por favor, insira seus dados para realizar o login.</p>

                <form onSubmit={handleAccess} className={styles.form}>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-envelope" />
                        <InputText
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </IconField>

                    <Password
                        placeholder="Senha"
                        name="password"
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

                    <Button className={styles.loginButton} label="Acessar" type="submit" />

                    <div className={styles.linkContainer}>
                        {/*
                        <p className={styles.requestPassword} onClick={requestPassword}>
                            Solicitar nova senha
                        </p>
                        */}
                        {localStorage.getItem("rememberedEmail") && (
                            <Button
                                icon="pi pi-trash"
                                label="Limpar credenciais salvas"
                                className={`${styles.clearButton} p-button-text p-button-danger`}
                                onClick={confirmClearCredentials}
                                size="small"
                            />
                        )}
                    </div>

                    <div className={styles.registerSection}>
                        <div className={styles.registerDivider}>
                            <span className={styles.dividerLine}></span>
                            <span className={styles.dividerText}>ou</span>
                            <span className={styles.dividerLine}></span>
                        </div>

                        <div className={styles.registerContainer}>
                            <div className={styles.registerInfo}>
                                <i className="pi pi-user-plus" style={{ fontSize: '1.2rem', color: '#007bff' }}></i>
                                <span className={styles.registerSpan}>É sua primeira vez aqui?</span>
                            </div>
                            <Button
                                label="Criar conta"
                                icon="pi pi-arrow-right"
                                className={`${styles.registerButton} p-button-outlined p-button-primary`}
                                onClick={() => navigate('/')}
                                size="small"
                            />
                        </div>
                    </div>
                </form>
            </Card>

            <Dialog
                visible={showClearDialog}
                onHide={() => setShowClearDialog(false)}
                header="Confirmar limpeza"
                modal
                className={styles.clearDialog}
                footer={
                    <div className={styles.dialogFooter}>
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            onClick={() => setShowClearDialog(false)}
                            className="p-button-text"
                        />
                        <Button
                            label="Limpar"
                            icon="pi pi-trash"
                            onClick={clearSavedCredentials}
                            className="p-button-danger"
                        />
                    </div>
                }
            >
                <div className={styles.dialogContent}>
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '2rem', color: '#dc3545', marginBottom: '1rem' }}></i>
                    <p>Tem certeza que deseja remover suas credenciais salvas?</p>
                    <p style={{ fontSize: '0.9rem', color: '#6c757d', marginTop: '0.5rem' }}>
                        Esta ação não pode ser desfeita. Você precisará inserir suas credenciais novamente na próxima vez.
                    </p>
                </div>
            </Dialog>
        </div>
    );
};

export default Login;
