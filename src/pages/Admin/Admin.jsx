import React, {useEffect, useState} from "react";
import {Card} from 'primereact/card';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router';
import userService from "../../services/UserService";

import styles from "./Admin.module.css";

const UserEditModal = () => {

}

const Admin = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState();
    const [userPermission, setUserPermission] = useState();

    const navigate = useNavigate();
    const [users, setUsers] = useState([
        {
            nome: "Lucas Rodrigues Cunha",
            email: "lucas@example.com",
            permissao: "ADMINISTRADOR"
        },
        {
            nome: "Joana Silva",
            email: "joana@example.com",
            permissao: "USUÁRIO"
        }
    ]);

    useEffect(() => {
        userService.getUsuarios()
            .then((response) => {
                const usersFormatted = response.map((user) => ({
                    nome: user.nome,
                    email: user.email,
                    permissao: user.permissao
                }));
                setUsers(usersFormatted);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error.message);
            });
    }, []);


    const editUser = (rowData) => {
        console.log("Editar usuário:", rowData);
        // Redirecione para página de edição ou abra um modal aqui
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-pencil"
                className="p-button-warning p-button-sm"
                onClick={() => editUser(rowData)}
            />
        );
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <p className={styles.title}>Controle de usuários</p>

                <DataTable
                    value={users}
                    tableStyle={{minWidth: '50rem'}}
                    emptyMessage="Nenhum dado encontrado."
                >
                    <Column field="nome" header="Nome"/>
                    <Column field="email" header="E-mail"/>
                    <Column field="permissao" header="Permissão"/>
                    <Column header="Ações" body={actionBodyTemplate} style={{textAlign: 'center', width: '100px'}}/>
                </DataTable>

                <Button
                    label="Voltar para página inicial"
                    className={styles.button}
                    onClick={() => navigate("/app/home")}
                />
            </Card>
        </div>
    );
}

export default Admin;
