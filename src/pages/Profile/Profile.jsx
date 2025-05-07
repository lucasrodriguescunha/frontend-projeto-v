import React, {useState} from "react";
import {Card} from 'primereact/card';
import {IconField} from 'primereact/iconfield';
import {InputIcon} from 'primereact/inputicon';
import {InputText} from 'primereact/inputtext';
import {Avatar} from 'primereact/avatar';
import {Badge} from 'primereact/badge';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router';

import styles from "./Profile.module.css";

const Profile = () => {
    const [userRole, setUserRole] = useState();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Card className={styles.card}>

                <p>Os dados do Input virão da API de usuário</p>

                <p className={styles.title}>Perfil</p>

                <div className="flex-auto">
                    <Avatar label="U" size="xlarge" shape="circle" className="p-overlay-badge">
                        <Badge value="📷"/>
                    </Avatar>
                </div>

                <IconField iconPosition="left">
                    <InputIcon className="pi pi-user"> </InputIcon>
                    <InputText placeholder="Lucas Rodrigues Cunha"/>
                </IconField>

                <IconField iconPosition="left">
                    <InputIcon className="pi pi-envelope"> </InputIcon>
                    <InputText placeholder="lucas@example.com"/>
                </IconField>

                <p>Sua permissão é: {userRole}</p>

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
