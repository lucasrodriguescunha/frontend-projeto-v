import React, {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import {useNavigate} from "react-router";

import aiService from "../../services/AIService";

import styles from "./Report.module.css";

const filterByQuality = [
    "Defeituosa",
    "Não defeituosa",
    "Todas",
];

const filterByDate = [
    "Últimas 24 horas",
    "Últimos 7 dias",
    "Últimos 30 dias",
    "Todas"
];

const filterByProduct = [
    "Maçãs",
    "Laranjas",
    "Pêras",
    "Todas"
];

const Report = () => {
    const [grupos, setGrupos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFilteredAnalysis();
    }, [selectedProduct, selectedQuality, selectedDate]);

    const fetchFilteredAnalysis = async () => {
        setLoading(true);
        try {
            const params = {
                resultado: mapQualityToParam(selectedQuality),
                data: mapDateToParam(selectedDate),
                tipo_fruta: mapProductToParam(selectedProduct)
            };

            const data = await aiService.getFilteredAnalysis(params);
            const analysisArray = Object.values(data).flat();

            const agrupado = new Map();
            analysisArray.forEach(item => {
                const grupo = item.grupo_id || 'Sem ID';
                if (!agrupado.has(grupo)) {
                    agrupado.set(grupo, []);
                }
                agrupado.get(grupo).push(item);
            });

            setGrupos(Array.from(agrupado.entries()).reverse());
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

    const mapQualityToParam = (value) => {
        if (value === "Defeituosa") return "defeituosa";
        if (value === "Não defeituosa") return "nao_defeituosa";
        return "todas";
    };

    const mapDateToParam = (value) => {
        if (value === "Últimos 30 dias") return "30dias";
        if (value === "Últimos 7 dias") return "7dias";
        return "todas";
    };

    const mapProductToParam = (value) => {
        return value === "Todas" || !value ? "todas" : value;
    };

    return (
        <div className={styles.container}>
            <Toast ref={toast}/>
            <Card className={styles.card}>
                <p className={styles.title}>Relatórios</p>

                <div className={styles.dropdownContainer}>
                    <DropdownMenu
                        options={filterByProduct}
                        placeholder="Selecione o produto"
                        selectedOption={selectedProduct}
                        onOptionChange={setSelectedProduct}
                    />

                    <DropdownMenu
                        options={filterByQuality}
                        placeholder="Selecione a qualidade"
                        selectedOption={selectedQuality}
                        onOptionChange={setSelectedQuality}
                    />

                    <DropdownMenu
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
                    style={{marginTop: '1rem'}}
                    onClick={() => navigate("/app/table")}
                />

                <Button
                    label="Gerar CSV"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => toast.current?.show({severity: 'info', summary: 'Em desenvolvimento', life: 3000})}
                />

                <Button
                    label="Gerar PDF"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => toast.current?.show({severity: 'info', summary: 'Em desenvolvimento', life: 3000})}
                />

                <Button
                    label="Gerar JSON"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => toast.current?.show({severity: 'info', summary: 'Em desenvolvimento', life: 3000})}
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