import React, {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import {useNavigate} from "react-router";

import aiService from "../../services/AIService";

import styles from "./Historic.module.css";

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
    "Maças",
    "Laranjas",
    "Pêras",
];

const Historic = () => {
    const [grupos, setGrupos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedQuality, setSelectedQuality] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const data = await aiService.listAnalysis();
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
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.message,
                    life: 3000
                });
            }
        };

        fetchAnalysis();
    }, []);

    const onPageChange = (e) => {
        setCurrentPage(e.page);
    };

    const totalGrupos = grupos.length;
    const grupoAtual = grupos[currentPage];

    const handleQualityChange = async (quality) => {
        setSelectedQuality(quality);
        setLoading(true);

        try {
            let data = {};

            if (quality === "Defeituosa" || quality === "Não defeituosa") {
                data = await aiService.filterAnalysis(quality);
            } else {
                data = await aiService.listAnalysis();
            }

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
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.current?.show({
                severity: 'error',
                summary: 'Erro',
                detail: error.message,
                life: 3000
            });
        }
    };

    return (
        <div className={styles.container}>
            <Toast ref={toast}/>
            <Card className={styles.card}>
                <p className={styles.title}>Histórico de Análises</p>

                <div className={styles.dropdownContainer}>
                    <DropdownMenu
                        options={filterByProduct}
                        placeholder="Selecione o produto"
                        selectedOption={selectedQuality}
                        onOptionChange={handleQualityChange}
                    />

                    <DropdownMenu
                        options={filterByQuality}
                        placeholder="Selecione a qualidade"
                        selectedOption={selectedQuality}
                        onOptionChange={handleQualityChange}
                    />

                    <DropdownMenu
                        options={filterByDate}
                        placeholder="Selecione o período"
                        selectedOption={selectedQuality}
                        onOptionChange={handleQualityChange}
                    />
                </div>

                <p className={styles.description}>
                    Escolha os filtros e clique em uma opção para gerar (tabela, CSV, PDF, JSON...)
                    {grupoAtual ? `Grupo: ${grupoAtual[0]}` : "Nenhum grupo encontrado."}
                </p>

                <Button
                    label="Visualizar tabela"
                    className={styles.button}
                    style={{marginTop: '1rem'}}
                    onClick={() => toast.current?.show({severity: 'info', summary: 'Em desenvolvimento', life: 3000})}
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

export default Historic;
