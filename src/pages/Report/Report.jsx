import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useNavigate } from "react-router";
import aiService from "../../services/AIService";
import styles from "./Report.module.css";

const filterByQuality = ["defeituosa", "nao_defeituosa", "todas"];
const filterByDate = ["Últimas 24 horas", "7dias", "30dias", "todas"];
const filterByProduct = ["macas", "mangas"];

const Report = () => {
    const [groups, setGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

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
                console.log("Resultado filtrado:", data);
            } else {
                data = await aiService.listAnalysis();
                console.log("Todos os dados (sem filtro):", data);
            }

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
            setCurrentPage(0);
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

    return (
        <div className={styles.container}>
            <Toast ref={toast} />

            <Card className={styles.card}>
                <p className={styles.title}>Relatórios</p>

                <div className={styles.dropdownContainer}>
                    <Dropdown
                        options={filterByProduct}
                        placeholder="Selecione o produto"
                        selectedOption={selectedProduct}
                        onOptionChange={setSelectedProduct}
                    />

                    <Dropdown
                        options={filterByQuality}
                        placeholder="Selecione a qualidade"
                        selectedOption={selectedQuality}
                        onOptionChange={setSelectedQuality}
                    />

                    <Dropdown
                        options={filterByDate}
                        placeholder="Selecione o período"
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
                    onClick={() => {
                        applyFilters();
                        navigate("/app/table");
                    }}
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
            </Card>
        </div>
    );
};

export default Report;
