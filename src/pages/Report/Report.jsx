import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useNavigate } from "react-router";
import aiService from "../../services/AIService";
import styles from "./Report.module.css";
import DataTable from "../../components/DataTable/DataTable";

// Filtros
const filterByQuality = ["defeituosa", "nao_defeituosa", "todas"];
const filterByDate = ["Últimas 24 horas", "7dias", "30dias", "todas"];
const filterByProduct = ["macas", "mangas"];

// TableView agora é uma função interna do Report
const TableView = ({ onBack }) => {
    const [loading, setLoading] = useState(true);
    const [currentGroup, setCurrentGroup] = useState([]);
    const [totalGroups, setTotalGroups] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setCurrentGroup([]); // Simula carregamento de dados
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
                    label="Voltar"
                    className={styles.button}
                    style={{ marginTop: '1rem' }}
                    onClick={onBack}
                />
            </Card>
        </div>
    );
};

// Componente principal
const Report = () => {
    const [groups, setGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [showTableViewLayout, setShowTableViewLayout] = useState(false); // <- novo estado

    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);
            try {
                const data = await aiService.listAnalysis();
                const analysisArray = Object.values(data).flat();

                const groupedAnalyses = new Map();
                analysisArray.forEach(item => {
                    const group = item.grupo_id || 'Sem ID';
                    if (!groupedAnalyses.has(group)) {
                        groupedAnalyses.set(group, []);
                    }
                    groupedAnalyses.get(group).push(item);
                });

                setGroups(Array.from(groupedAnalyses.entries()).reverse());
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

    const onPageChange = (e) => {
        setCurrentPage(e.page);
    };

    const applyFilters = async () => {
        setLoading(true);
        try {
            let data = {};

            if (
                selectedQuality !== "todas" ||
                selectedProduct !== "todas" ||
                selectedDate !== "todas"
            ) {
                data = await aiService.filterAnalysis(
                    selectedQuality,
                    selectedProduct,
                    selectedDate
                );
            } else {
                data = await aiService.listAnalysis();
            }

            setGroups(data);
            setCurrentPage(0);
            setShowTable(true);
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

    // Renderização condicional entre Report e TableView
    if (showTableViewLayout) {
        return <TableView onBack={() => setShowTableViewLayout(false)} />;
    }

    return (
        <div className={styles.container}>
            <Toast ref={toast} />

            <Card className={styles.card}>

                <p className={styles.title}>Relatórios</p>

                <div className={styles.dropdownContainer}>
                    <Dropdown
                        options={filterByProduct}
                        placeholder="Produto"
                        selectedOption={selectedProduct}
                        onOptionChange={setSelectedProduct}
                    />
                    <Dropdown
                        options={filterByQuality}
                        placeholder="Qualidade"
                        selectedOption={selectedQuality}
                        onOptionChange={setSelectedQuality}
                    />
                    <Dropdown
                        options={filterByDate}
                        placeholder="Período"
                        selectedOption={selectedDate}
                        onOptionChange={setSelectedDate}
                    />
                </div>

                <p className={styles.description}>
                    Escolha os filtros e clique em uma opção para gerar um relatório na forma de tabela, CSV, PDF ou JSON
                </p>

                <Button
                    label="Visualizar tabela"
                    className={styles.button}
                    style={{ marginTop: '1rem' }}
                    onClick={() => setShowTableViewLayout(true)}
                />

                <Button
                    label="Gerar CSV"
                    className={styles.button}
                    style={{ marginTop: '1rem' }}
                    onClick={() => toast.current?.show({ severity: 'info', summary: 'Em desenvolvimento', life: 3000 })}
                />
                <Button
                    label="Gerar PDF"
                    className={styles.button}
                    style={{ marginTop: '1rem' }}
                    onClick={() => toast.current?.show({ severity: 'info', summary: 'Em desenvolvimento', life: 3000 })}
                />
                <Button
                    label="Gerar JSON"
                    className={styles.button}
                    style={{ marginTop: '1rem' }}
                    onClick={() => toast.current?.show({ severity: 'info', summary: 'Em desenvolvimento', life: 3000 })}
                />
                <Button
                    label="Voltar para página inicial"
                    className={styles.button}
                    style={{ marginTop: '1rem' }}
                    onClick={() => navigate("/app/home")}
                />

                {showTable && (
                    <div className={styles.tableContainer} style={{ marginTop: '2rem' }}>
                        <h3>Dados Filtrados</h3>
                        <DataTable
                            data={groups}
                            loading={loading}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Report;
