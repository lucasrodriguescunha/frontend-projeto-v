import React, {useState} from "react";
import {Card} from 'primereact/card';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router';

import styles from "./Admin.module.css";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState();
    const navigate = useNavigate();

    const columns = [
        {field: 'name', header: 'Nome'},
        {field: 'email', header: 'E-mail'},
        {field: 'user_role', header: 'Permissão'},
        // ... botões
    ];

    // useEffect(() => {
    //    userService.getUsers()
    // });

    return (
        <div className={styles.container}>
            <Card className={styles.card}>

                <p className={styles.title}>Controle de usuários</p>

                <DataTable
                    value={users}
                    tableStyle={{minWidth: '50rem'}}
                    emptyMessage="Nenhum dado encontrado."
                >
                    {columns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header}/>

                    ))}
                </DataTable>

                <Button icon="pi pi-pencil" severity="warning" aria-label="Edit"/>

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
