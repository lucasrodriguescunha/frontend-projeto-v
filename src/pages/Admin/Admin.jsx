import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useNavigate} from "react-router";
import userService from "../../services/UserService";
import {Paginator} from "primereact/paginator";
import {Dialog} from "primereact/dialog";

import styles from "./Admin.module.css";

const Admin = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState();
    const [userPermission, setUserPermission] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;

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

    const [visible, setVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // usuário selecionado


    const allowAccessUser = () => {
        if (!selectedUser) return;

        const updatedData = {
            ativo: true,
            contaBloqueada: false,
            email: selectedUser.email, // use um identificador único
        };

        userService.updateUsuario(updatedData)
            .then(() => {
                console.log("Usuário atualizado com sucesso!");
                setVisible(false); // Fecha o diálogo
                // Atualiza a lista de usuários se necessário
                userService.getUsuarios()
                    .then((response) => {
                        const usersFormatted = response.registros.map((user) => ({
                            nome: user.nome,
                            email: user.email,
                            permissao: user.permissao
                        }));
                        setUsers(usersFormatted);
                    });
            })
            .catch((error) => {
                console.error("Erro ao atualizar usuário:", error.message);
            });
    };

    useEffect(() => {
        userService.getUsuarios()
            .then((response) => {
                console.log("Usuários retornados:", response);
                const usersFormatted = response.registros.map((user) => ({
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
        setSelectedUser(rowData);
        setVisible(true);
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

    const footerContent = (
        <div>
            <Button label="Sim" icon="pi pi-check" onClick={allowAccessUser} className="p-button-text"/>
            <Button label="Não" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus/>
        </div>
    );

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <p className={styles.title}>Controle de usuários</p>

                <DataTable
                    value={users.slice(currentPage, currentPage + rowsPerPage)}
                    tableStyle={{minWidth: '50rem'}}
                    emptyMessage="Nenhum dado encontrado."
                >
                    <Column field="nome" header="Nome"/>
                    <Column field="email" header="E-mail"/>
                    <Column field="permissao" header="Permissão"/>
                    <Column header="Ações" body={actionBodyTemplate} style={{textAlign: 'center', width: '100px'}}/>
                </DataTable>

                <Paginator
                    first={currentPage}
                    rows={rowsPerPage}
                    totalRecords={users.length}
                    onPageChange={(e) => setCurrentPage(e.first)}
                    template="PrevPageLink PageLinks NextPageLink"
                />

                <Button
                    label="Voltar para página inicial"
                    className={styles.button}
                    onClick={() => navigate("/app/home")}
                />
            </Card>

            <Dialog
                header="Desbloquear conta"
                visible={visible}
                style={{width: '50vw'}}
                onHide={() => setVisible(false)}
                footer={footerContent}
            >
                <p className="m-0">
                    {selectedUser
                        ? `Deseja realmente desbloquear a conta de ${selectedUser.nome}?`
                        : "Deseja realmente desbloquear esta conta?"}
                </p>
            </Dialog>
        </div>
    );
};

export default Admin;
