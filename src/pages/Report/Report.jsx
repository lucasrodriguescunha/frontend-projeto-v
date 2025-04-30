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
    "Mangas",
];

const Historic = () => {
    const [grupos, setGrupos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true); // Define o estado de loading
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedQuality, setSelectedQuality] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);  // Inicia o carregamento

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
            } catch (error) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.message,
                    life: 3000
                });
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchAnalysis();
    }, []);  // O useEffect é executado uma vez, quando o componente é montado

    const onPageChange = (e) => {
        setCurrentPage(e.page);
    };



    const handleQualityChange = async (quality, product, date) => {
        setSelectedQuality(quality); // Atualiza o estado do 'selectedQuality'
        setSelectedProduct(product); // Atualiza o estado do 'selectedProduct'
        setSelectedDate(date); // Atualiza o estado do 'selectedDate'

        try {
            let data = {};

            // Construa a consulta com base nos filtros
            if (quality !== "Todas" || product !== "Todas" || date !== "Todas") {
                // Chama a função de filtragem se qualquer filtro estiver selecionado
                data = await aiService.filterAnalysis(quality, product, date);
            } else {
                // Caso contrário, chama a função para obter todos os dados
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
                <p className={styles.title}>Relatórios</p>

                <div className={styles.dropdownContainer}>
                    <DropdownMenu
                        options={filterByProduct}
                        placeholder="Selecione o produto"
                        selectedOption={selectedProduct}
                        onOptionChange={(e) => handleQualityChange(selectedQuality, e.value, selectedDate)}
                    />

                    <DropdownMenu
                        options={filterByQuality}
                        placeholder="Selecione a qualidade"
                        selectedOption={selectedQuality}
                        onOptionChange={(e) => handleQualityChange(e.value, selectedProduct, selectedDate)}
                    />

                    <DropdownMenu
                        options={filterByDate}
                        placeholder="Selecione o período"
                        selectedOption={selectedDate}
                        onOptionChange={(e) => handleQualityChange(selectedQuality, selectedProduct, e.value)}
                    />
                </div>

                <p className={styles.description}>
                    Escolha os filtros e clique em uma opção para gerar um relatório na forma de tabela, CSV, PDF ou
                    JSON
                    {/* {grupoAtual ? `Grupo: ${grupoAtual[0]}` : "Nenhum grupo encontrado."} */}
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

export default Historic;
