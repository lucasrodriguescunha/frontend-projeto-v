import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import DataTableHistoric from "../../components/DataTableHistoric/DataTableHistoric";
import aiService from "../../services/AIService";

const TablePage = () => {
    const [grupos, setGrupos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoading(true);
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
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, []);

    const onPageChange = (e) => {
        setCurrentPage(e.page);
    };

    const totalGrupos = grupos.length;
    const grupoAtual = grupos[currentPage];

    return (
        <div style={{ padding: "2rem" }}>
            <Toast ref={toast} />
            <Card>
                <h2>Histórico de Análises</h2>
                <DataTableHistoric
                    loading={loading}
                    grupoAtual={grupoAtual}
                    totalGrupos={totalGrupos}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </Card>
        </div>
    );
};

export default TablePage;
