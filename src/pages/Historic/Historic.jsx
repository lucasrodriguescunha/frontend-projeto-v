import React, { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

import aiService from "../../services/AIService";
import styles from "./Historic.module.css";

const Historic = () => {
    const [grupos, setGrupos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResultados = async () => {
            try {
                const data = await aiService.listarResultados();
                const resultadosArray = Object.values(data).flat();

                const agrupado = new Map();
                resultadosArray.forEach(item => {
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
            }
        };

        fetchResultados();
    }, []);

    const onPageChange = (e) => {
        setCurrentPage(e.page);
    };

    const totalGrupos = grupos.length;
    const grupoAtual = grupos[currentPage];

    return (
        <div className={styles.container}>
            <Toast ref={toast} />
            <Card className={styles.card}>
                <p className={styles.title}>Histórico de Análises</p>
                <p className={styles.description}>
                    {grupoAtual ? `Grupo: ${grupoAtual[0]}` : "Nenhum grupo encontrado."}
                </p>
                <div className={styles.tableWrapper}>
                    {grupoAtual && (
                        <DataTable
                            value={grupoAtual[1]}
                            scrollable
                            scrollHeight="200px"
                            className={styles.table}
                        >
                            <Column field="nome_arquivo" header="Arquivo" style={{ minWidth: '150px' }} />
                            <Column field="resultado" header="Resultado" style={{ minWidth: '150px' }} />
                            <Column field="confianca" header="Confiança (%)" style={{ minWidth: '120px' }} />
                            <Column field="data_analise" header="Data de Análise" style={{ minWidth: '160px' }} />
                        </DataTable>
                    )}
                    {totalGrupos > 1 && (
                        <Paginator
                            first={currentPage}
                            rows={1}
                            totalRecords={totalGrupos}
                            onPageChange={onPageChange}
                            template="PrevPageLink PageLinks NextPageLink"
                        />
                    )}
                </div>
                <Button
                    label="Voltar para página inicial"
                    className="p-button custom-upload-button"
                    style={{ marginTop: '1rem' }}
                    onClick={() => navigate("/")}
                />
            </Card>
        </div>
    );
};

export default Historic;
