import React, { useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import userService from "../../services/UserService";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

import styles from "./Admin.module.css";

const Admin = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // usuário selecionado
    const toast = useRef(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const allowAccessUser = () => {
        if (!selectedUser) return;

        const action = selectedUser.ativo ? userService.lockUser : userService.unlockUser;
        const actionText = selectedUser.ativo ? 'bloqueada' : 'desbloqueada';

        console.log('=== DEBUG ===');
        console.log('Usuário selecionado:', selectedUser);
        console.log('Campo ativo atual:', selectedUser.ativo);
        console.log('Ação a ser executada:', actionText);
        console.log('Método a ser chamado:', action === userService.lockUser ? 'lockUser' : 'unlockUser');

        action(selectedUser.email)
            .then((response) => {
                console.log('Resposta da API:', response);
                setVisible(false);

                if (toast.current && isMounted.current) {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Sucesso!',
                        detail: `Usuário ${actionText} com sucesso!`,
                        life: 3000,
                    });
                }

                userService.getUsuarios()
                    .then((response) => {
                        console.log('Nova lista de usuários:', response.registros);
                        if (isMounted.current) {
                            const usersFormatted = response.registros.map((user) => ({
                                nome: user.nome,
                                email: user.email,
                                permissao: user.permissao,
                                ativo: !user.contaBloqueada
                            }));
                            console.log('Usuários formatados após ação:', usersFormatted);
                            setUsers(usersFormatted);
                        }
                    });
            })
            .catch((error) => {
                console.error(`Erro ao ${actionText} usuário:`, error);
                console.error('Detalhes do erro:', error.response?.data);
            });
    };


    useEffect(() => {
        userService.getUsuarios()
            .then((response) => {
                const usersFormatted = response.registros.map((user) => ({
                    nome: user.nome,
                    email: user.email,
                    permissao: user.permissao,
                    ativo: !user.contaBloqueada
                }));
                setUsers(usersFormatted);
            })
            .catch((error) => {
                console.error("Erro ao buscar usuários:", error.message);
            });
    }, []);

    const editUser = (rowData) => {
        setSelectedUser(rowData);
        setVisible(true);
    };

    const actionBodyTemplate = (rowData) => {
        const isBlocked = !rowData.ativo; // conta_bloqueada = true quando ativo = false
        const buttonClass = isBlocked ? "p-button-danger p-button-sm" : "p-button-success p-button-sm";
        const icon = isBlocked ? "pi pi-lock" : "pi pi-lock-open";
        
        return (
            <Button
                icon={icon}
                className={buttonClass}
                onClick={() => editUser(rowData)}
            />
        );
    };

    const permissionTemplate = (rowData) => {
        if (rowData.permissao === 'ADMINISTRADOR') return 'Administrador';
        if (rowData.permissao === 'USUARIO') return 'Usuário';
        return rowData.permissao;
    };

    const acessoTemplate = (rowData) => {
        return rowData.ativo ? 'Conta desbloqueada' : 'Conta bloqueada';
    };

    const footerContent = (
        <div>
            <Button style={{ color: '#677FFA' }} label="Confirmar" icon="pi pi-check" onClick={allowAccessUser} className="p-button-text" />
            <Button style={{ backgroundColor: '#677FFA' }} label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <div className={styles.container}>
            <Toast ref={toast} />

            <Card className={styles.card}>
                <p className={styles.title}>Controle de usuários</p>

                <DataTable
                    value={users.slice(currentPage, currentPage + rowsPerPage)}
                    tableStyle={{ minWidth: '50rem' }}
                    emptyMessage="Nenhum dado encontrado."
                >
                    <Column field="nome" header="Nome" />
                    <Column field="email" header="E-mail" />
                    <Column field="permissao" header="Permissão" body={permissionTemplate} />
                    <Column field="ativo" header="Acesso" body={acessoTemplate} />
                    <Column header="Ações" body={actionBodyTemplate} style={{ textAlign: 'center', width: '100px' }} />
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
                header={selectedUser?.ativo ? "Bloquear conta" : "Desbloquear conta"}
                visible={visible}
                onHide={() => setVisible(false)}
                footer={footerContent}
            >
                <p className="m-0">
                    {selectedUser
                        ? `Deseja realmente ${selectedUser.ativo ? 'bloquear' : 'desbloquear'} a conta de ${selectedUser.nome}?`
                        : "Deseja realmente alterar o status desta conta?"}
                </p>
            </Dialog>
        </div>
    );
};

export default Admin;
