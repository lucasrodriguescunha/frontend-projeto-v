import React from "react";
import {DataTable} from "primereact/datatable";
import styles from "../../pages/Historic/Historic.module.css";
import {Column} from "primereact/column";
import {Skeleton} from "primereact/skeleton";
import {Paginator} from "primereact/paginator";

const DataTableHistoric = ({loading, grupoAtual, totalGrupos, currentPage, onPageChange}) => {
    return (
        <div>
            <DataTable style={{ width: "100%", height: "100%" }}
                value={loading ? Array.from({length: 5}) : grupoAtual ? grupoAtual[1] : []}
                scrollable
                scrollHeight="200px"
                emptyMessage={"Nenhuma informação encontrada."}
                className={styles.table}
            >
                <Column
                    field="imagem_preview"
                    header="Imagem"
                    body={(rowData) =>
                        loading
                            ? <Skeleton width="80%" height="1.5rem"/>
                            : rowData.imagem_preview
                    }
                    style={{minWidth: '150px'}}
                />
                <Column
                    field="nome_arquivo"
                    header="Arquivo"
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
                            : rowData.resultado
                    }
                    style={{minWidth: '150px'}}
                />
                <Column
                    field="confianca"
                    header="Confiança (%)"
                    body={(rowData) =>
                        loading
                            ? <Skeleton width="50%" height="1.5rem"/>
                            : rowData.confianca
                    }
                    style={{minWidth: '120px'}}
                />
                <Column
                    field="data_analise"
                    header="Data de Análise"
                    body={(rowData) =>
                        loading
                            ? <Skeleton width="60%" height="1.5rem"/>
                            : rowData.data_analise
                    }
                    style={{minWidth: '160px'}}
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
    );
};

export default DataTableHistoric;
