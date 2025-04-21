import React, {useEffect, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import userService from "../../services/UserService";

import styles from './Admin.module.css';

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const response = await userService.getUsuarios();
                setUsers(response); // Atualiza o estado com os dados retornados
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        getUsuarios(); // Chama a função para buscar os usuários
    }, []); // O array vazio [] garante que a função seja chamada apenas uma vez

    return (
        <div className={styles.container}>
            <div className="card">
                <DataTable value={users} tableStyle={{minWidth: '50rem'}}>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="email" header="E-mail"></Column>
                    <Column field="senha" header="Senha"></Column>
                    <Column field="permissao" header="Permissão"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default Admin;
