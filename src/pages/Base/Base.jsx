import React, { useEffect, useState, useRef } from 'react';
import Card from '../../components/Card/Card';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import userService from '../../services/UserService';
import { useNavigate } from 'react-router';
import styles from './Base.module.css';

const cardData = [
    {title: "Análise", subTitle: "Envie sua imagens para análise.", route: "/app/upload"},
    {title: "Seu perfil", subTitle: "Clique para acessar seu perfil ", route: "/app/profile"},
    {title: "Relatórios", subTitle: "Clique para acessar a página de relatórios.", route: "/app/report"},
    {title: "Controle de usuários", subTitle: "Clique para ver solicitações de acesso.", route: "/app/admin"},
    {title: "Sair", subTitle: "Clique para sair do sistema.", route: "logout"},
];

const Base = () => {
    const [userPermission, setUserPermission] = useState("");
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPermission = async () => {
            const email = localStorage.getItem("userEmail");
            if (email) {
                try {
                    const user = await userService.getUsuarioByEmail(email);
                    setUserPermission(user?.permissao || "");
                } catch (err) {
                    setUserPermission("");
                }
            }
        };
        fetchPermission();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("tokenJWT");
        localStorage.removeItem("userEmail");
        window.location.href = "/login";
    };

    const confirmLogout = () => {
        confirmDialog({
            message: 'Tem certeza que deseja sair?',
            header: 'Confirmação de saída',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sair',
            rejectLabel: 'Cancelar',
            acceptClassName: styles.button,
            rejectClassName: styles.button,
            accept: handleLogout,
        });
    };

    const handleCardClick = (route) => {
        if (route === "/app/admin" && userPermission !== "ADMINISTRADOR") {
            toast.current?.show({
                severity: 'warn',
                summary: 'Acesso restrito',
                detail: 'Você precisa ser Administrador para acessar o Controle de Usuários.',
                life: 4000
            });
            return;
        }
        if (route === "/app/profile" && userPermission !== "ADMINISTRADOR") {
            toast.current?.show({
                severity: 'warn',
                summary: 'Acesso restrito',
                detail: 'Você precisa ser Administrador para acessar o Perfil.',
                life: 4000
            });
            return;
        }
        if (route === "logout") {
            confirmLogout();
            return;
        }
        navigate(route);
    };

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className={styles.baseContainer}>
                {cardData.map(({title, subTitle, route}) => (
                    <Card key={route} title={title} subTitle={subTitle} onClick={() => handleCardClick(route)} />
                ))}
            </div>
        </div>
    );
};

export default Base;
