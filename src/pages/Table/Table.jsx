import React, { useState, useEffect } from 'react';
import DataTableReport from '../../components/DataTableReport/DataTableReport';
import styles from './Table.module.css';

const Table = () => {
    const [loading, setLoading] = useState(true);
    const [grupoAtual, setGrupoAtual] = useState([]);
    const [totalGrupos, setTotalGrupos] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setGrupoAtual([]);
            setTotalGrupos(5);
            setLoading(false);
        }, 2000);
    }, []);

    const handlePageChange = (event) => {
        setCurrentPage(event.first);
    };

    return (
        <div className={styles.tableContainer}>
            <h1>Relatório de Análises</h1>
            <DataTableReport
                loading={loading}
                grupoAtual={grupoAtual}
                totalGrupos={totalGrupos}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Table;