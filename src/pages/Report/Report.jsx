import React, {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import Dropdown from "../../components/Dropdown/Dropdown";
import {useNavigate} from "react-router";
import aiService from "../../services/AIService";
import DataTable from "../../components/DataTable/DataTable";

import styles from "./Report.module.css";

// Filtros
const filterByQuality = ["defeituosa", "nao_defeituosa", "todas"];
const filterByDate = ["24horas", "7dias", "30dias", "todas"];
const filterByProduct = ["macas", "mangas", "todas"];

const TableView = ({onBack, filteredData}) => {
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
                <p className={styles.title}>Tabela de Resultados</p>

                <DataTable
                    data={filteredData}
                    loading={loading}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />

                <Button
                    label="Voltar"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={onBack}
                />
            </Card>
        </div>
    );
};

const Report = () => {
    const [filteredData, setFilteredData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState("todas");
    const [selectedQuality, setSelectedQuality] = useState("todas");
    const [selectedDate, setSelectedDate] = useState("todas");
    const [showTableViewLayout, setShowTableViewLayout] = useState(false);

    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);
            try {
                const data = await aiService.listAnalysis();
                setFilteredData(data);
            } catch (error) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.message,
                    life: 3000
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, []);

    const handleExportJson = async () => {
        setLoading(true);
        try {
            const data = await aiService.filterAnalysis(
                selectedQuality,
                selectedProduct,
                selectedDate
            );

            exportToJson(data);

            toast.current?.show({
                severity: 'success',
                summary: 'JSON gerado com sucesso!',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: error.message,
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const exportToCsv = (data) => {
        if (!data.grupos || Object.keys(data.grupos).length === 0) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Aviso',
                detail: 'Nenhum dado disponível para exportar.',
                life: 3000
            });
            return;
        }

        const rows = [];

        Object.entries(data.grupos).forEach(([grupoId, registros]) => {
            registros.forEach((registro) => {
                rows.push({
                    grupo_id: grupoId,
                    ...registro
                });
            });
        });

        const csvHeaders = Object.keys(rows[0]).join(',');
        const csvRows = rows.map(row =>
            Object.values(row).map(val => `"${val}"`).join(',')
        );

        const csvString = [csvHeaders, ...csvRows].join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio.csv';
        link.click();
    };


    const handleExportCsv = async () => {
        setLoading(true);
        try {
            const data = await aiService.filterAnalysis(
                selectedQuality,
                selectedProduct,
                selectedDate
            );

            exportToCsv(data);

            toast.current?.show({
                severity: 'success',
                summary: 'CSV gerado com sucesso!',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: error.message,
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const exportToJson = (data) => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio.json';
        link.click();
    };

    const onPageChange = (e) => {
        setCurrentPage(e.page);
    };

    const applyFilters = async () => {
        setLoading(true);
        try {
            let data = {};

            data = await aiService.filterAnalysis(
                selectedQuality,
                selectedProduct,
                selectedDate
            );

            setFilteredData(data);
            setCurrentPage(0);
            setShowTableViewLayout(true);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: error.message,
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    if (showTableViewLayout) {
        return <TableView
            onBack={() => setShowTableViewLayout(false)}
            filteredData={filteredData}
            loading={loading}
        />;
    }

    return (
        <div className={styles.container}>
            <Toast ref={toast}/>

            <Card className={styles.card}>
                <p className={styles.title}>Relatórios</p>

                <div className={styles.dropdownContainer}>
                    <div className={styles.dropdownItem}>
                        <p>Produto</p>
                        <Dropdown
                            options={filterByProduct}
                            selectedOption={selectedProduct}
                            onOptionChange={setSelectedProduct}
                        />
                    </div>
                    <div className={styles.dropdownItem}>
                        <p>Qualidade</p>
                        <Dropdown
                            options={filterByQuality}
                            selectedOption={selectedQuality}
                            onOptionChange={setSelectedQuality}
                        />
                    </div>
                    <div className={styles.dropdownItem}>
                        <p>Período</p>
                        <Dropdown
                            options={filterByDate}
                            selectedOption={selectedDate}
                            onOptionChange={setSelectedDate}
                        />
                    </div>
                </div>

                <p className={styles.description}>
                    Escolha os filtros e clique em uma opção para gerar um relatório na forma de tabela, CSV ou JSON
                </p>

                <Button
                    label="Visualizar tabela"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={applyFilters}
                />
                <Button
                    label="Gerar CSV"
                    className={styles.button}
                    style={{ marginTop: '1rem' }}
                    onClick={handleExportCsv}
                />
                <Button
                    label="Gerar JSON"
                    className={styles.button}
                    style={{ marginTop: '1rem' }}
                    onClick={handleExportJson}
                />
                <Button
                    label="Voltar para página inicial"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => navigate("/app/home")}
                />
            </Card>
        </div>
    );
};

export default Report;
