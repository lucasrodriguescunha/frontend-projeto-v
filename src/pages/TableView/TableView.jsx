import React, {useEffect, useState} from 'react';
import DataTableReport from '../../components/DataTable/DataTable';

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
        <div className={styles.tableContainer}>
            <h1>Relatório de Análises</h1>
            <DataTableReport
                loading={loading}
                currentGroup={currentGroup}
                totalGroups={totalGroups}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default TableView;