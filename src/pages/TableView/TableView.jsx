import React, {useEffect, useState} from 'react';
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import DataTable from '../../components/DataTable/DataTable';

import styles from './TableView.module.css';

const TableView = () => {
    const [loading, setLoading] = useState(true);
    const [currentGroup, setCurrentGroup] = useState([]);
    const [totalGroups, setTotalGroups] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setCurrentGroup([]);
            setTotalGroups(5);
            setLoading(false);
        }, 2000);
    }, []);

    const handlePageChange = (event) => {
        setCurrentPage(event.first);
    };

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <p className={styles.title}>Tabela</p>

                <DataTable
                    loading={loading}
                    currentGroup={currentGroup}
                    totalGroups={totalGroups}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />

                <Button
                    label="Visualizar tabela"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                />
            </Card>
        </div>
    );
};

export default TableView;