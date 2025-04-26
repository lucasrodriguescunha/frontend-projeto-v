import React, { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { useNavigate } from "react-router";

import aiService from "../../services/AIService";
import styles from "./Historic.module.css";

const Historic = () => {
    const [grupos, setGrupos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
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
                    <DataTable
                        value={loading ? Array.from({ length: 5 }) : grupoAtual ? grupoAtual[1] : []}
                        scrollable
                        scrollHeight="200px"
                        emptyMessage={"Nenhuma informação encontrada."}
                        className={styles.table}
                    >
                        <Column
                            field="nome_arquivo"
                            header="Arquivo"
                            body={(rowData) =>
                                loading
                                    ? <Skeleton width="80%" height="1.5rem" />
                                    : rowData.nome_arquivo
                            }
                            style={{ minWidth: '150px' }}
                        />
                        <Column
                            field="resultado"
                            header="Resultado"
                            body={(rowData) =>
                                loading
                                    ? <Skeleton width="70%" height="1.5rem" />
                                    : rowData.resultado
                            }
                            style={{ minWidth: '150px' }}
                        />
                        <Column
                            field="confianca"
                            header="Confiança (%)"
                            body={(rowData) =>
                                loading
                                    ? <Skeleton width="50%" height="1.5rem" />
                                    : rowData.confianca
                            }
                            style={{ minWidth: '120px' }}
                        />
                        <Column
                            field="data_analise"
                            header="Data de Análise"
                            body={(rowData) =>
                                loading
                                    ? <Skeleton width="60%" height="1.5rem" />
                                    : rowData.data_analise
                            }
                            style={{ minWidth: '160px' }}
                        />
                    </DataTable>

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
                    onClick={() => navigate("/app/home")}
                />
            </Card>
        </div>
    );
};

export default Historic;
