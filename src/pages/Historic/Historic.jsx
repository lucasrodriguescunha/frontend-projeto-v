import React, { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import aiService from "../../services/AIService";

import styles from "./Historic.module.css";

const Historic = () => {
    const [resultados, setResultados] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        const fetchResultados = async () => {
            console.log("Chamando API...");
            try {
                const data = await aiService.listarResultados();
                console.log("Resposta da API:", data);

                const resultadosArray = Object.values(data).flat(); // Transforma em array único
                setResultados(resultadosArray);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
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

    return (
        <div className={styles.container}>
            <Toast ref={toast} />
            <Card className={styles.card}>
                <p className={styles.title}>Histórico de Análises</p>
                <p className={styles.description}>Veja abaixo o resultado das análises realizadas.</p>
                <div className={styles.tableWrapper}>
                    <DataTable
                        value={resultados}
                        paginator
                        rows={5}
                        scrollable
                        scrollHeight="300px"
                        className={styles.table}
                    >
                        <Column field="grupo_id" header="Grupo ID" style={{ minWidth: '120px' }} />
                        <Column field="nome_arquivo" header="Arquivo" style={{ minWidth: '150px' }} />
                        <Column field="resultado" header="Resultado" style={{ minWidth: '150px' }} />
                        <Column field="confianca" header="Confiança (%)" style={{ minWidth: '120px' }} />
                        <Column field="data_analise" header="Data de Análise" style={{ minWidth: '160px' }} />
                    </DataTable>
                </div>
            </Card>
        </div>
    );
};

export default Historic;
