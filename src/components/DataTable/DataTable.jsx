import React from "react";
import {DataTable as PrimeDataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Skeleton} from "primereact/skeleton";
import {Paginator} from "primereact/paginator";

const DataTable = ({data, loading, currentPage, onPageChange}) => {
    const extractData = () => {
        if (!data || !data.grupos) return [];

        const groups = Object.keys(data.grupos);
        if (groups.length === 0) return [];

        const currentGroupKey = groups[currentPage % groups.length] || groups[0];
        return data.grupos[currentGroupKey] || [];
    };

    const formatSnakeCase = (text) => {
        if (!text) return "";

        const wordMap = {
            nao: "Não",
            defeituosa: "Defeituosa",
            defeituoso: "Defeituoso",
        };

        return text
            .split("_")
            .map((word) => wordMap[word.toLowerCase()] || (word.charAt(0).toUpperCase() + word.slice(1)))
            .join(" ");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
    };

    const tableData = loading ? Array.from({length: 5}) : extractData();
    const totalGroups = data && data.grupos ? Object.keys(data.grupos).length : 0;

    return (
        <div style={{minWidth: "1200px"}}>
            <PrimeDataTable
                value={tableData}
                scrollable
                scrollHeight="200px"
                emptyMessage={"Nenhuma informação encontrada."}
            >
                <Column
                    field="nome_arquivo"
                    header="Nome do Arquivo"
                    body={(rowData) =>
                        loading
                            ? <Skeleton width="80%" height="1.5rem"/>
                            : rowData.nome_arquivo
                    }
                    style={{minWidth: '150px'}}
                />
                <Column
                    field="resultado"
                    header="Resultado"
                    body={(rowData) =>
                        loading
                            ? <Skeleton width="70%" height="1.5rem"/>
                            : formatSnakeCase(rowData.resultado)
                    }
                    style={{minWidth: '150px'}}
                />
                <Column
                    field="pontuacao"
                    header="Pontuação"
                    body={(rowData) =>
                        loading
                            ? <Skeleton width="50%" height="1.5rem"/>
                            : `${rowData.confianca}`
                    }
                    style={{minWidth: '120px'}}
                />
                <Column
                    field="data_analise"
                    header="Data da Análise"
                    body={(rowData) =>
                        loading
                            ? <Skeleton width="60%" height="1.5rem"/>
                            : formatDate(rowData.data_analise)
                    }
                    style={{minWidth: '160px'}}
                />
            </PrimeDataTable>

            {totalGroups > 1 && (
                <Paginator
                    first={currentPage}
                    rows={1}
                    totalRecords={totalGroups}
                    onPageChange={onPageChange}
                    template="PrevPageLink PageLinks NextPageLink"
                />
            )}
        </div>
    );
};

export default DataTable;
