import React, {useRef, useState} from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Paginator} from 'primereact/paginator';
import {Badge} from 'primereact/badge';
import {v4 as uuidv4} from 'uuid';
import ImageModel from "../../models/ImageModel";

import aiService from "../../services/AIService";

const UploadImage = () => {
    const [arquivos, setArquivos] = useState([]);
    const [first, setFirst] = useState(0);
    const [grupoId, setGrupoId] = useState(null);
    const fileUploadRef = useRef(null);
    const rows = 1;

    const onSelect = (event) => {
        const novoGrupoId = uuidv4();
        setGrupoId(novoGrupoId);

        const selecionados = Array.from(event.files).map((file) => new ImageModel({
            file,
            name: file.name,
            preview: URL.createObjectURL(file)
        }));

        setArquivos(selecionados);
        setFirst(0);
    };

    const onUpload = async () => {
        try {
            const atualizados = await Promise.all(
                arquivos.map(async (item) => {
                    const response = await aiService.uploadImage(item.file, grupoId);
                    const resultado = response.resultado;

                    item.atualizarResultadoAnalise(resultado);
                    return item;
                })
            );

            setArquivos([...atualizados]);
        } catch (err) {
            const falhou = arquivos.map((item) => {
                item.definirStatusErro(err.message);
                return item;
            });

            setArquivos([...falhou]);
        }
    };

    const onClear = () => {
        setArquivos([]);
        setFirst(0);
        setGrupoId(null);
    };

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    const arquivosPaginados = arquivos.slice(first, first + rows);

    return (
        <div>
            <style>
                {
                    `.ocultar-conteudo .p-fileupload-content {
                        display: none !important;
                    }`
                }
            </style>

            <div className={arquivos.length > 0 ? 'ocultar-conteudo' : ''}>
                <FileUpload
                    ref={fileUploadRef}
                    name="file"
                    customUpload
                    uploadHandler={onUpload}
                    onSelect={onSelect}
                    onClear={onClear}
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Escolher"
                    uploadLabel={
                        <span style={{display: 'flex', alignItems: 'center'}}>
                            Upload
                            {arquivos.length > 0 && (
                                <Badge value={arquivos.length} style={{marginLeft: '8px'}}/>
                            )}
                        </span>
                    }
                    cancelLabel="Cancelar"
                    emptyTemplate={<p className="m-0">Arraste e solte os arquivos aqui.</p>}
                    showUploadButton={arquivos.length > 0}
                    showCancelButton={arquivos.length > 0}
                    auto={false}
                    itemTemplate={() => null}
                    uploadIcon={null}
                />
            </div>

            {arquivos.length > 0 && (
                <div style={{marginTop: '1rem'}}>
                    {arquivosPaginados.map((arquivo, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '10px',
                                marginBottom: '1rem'
                            }}
                        >
                            <img
                                src={arquivo.preview}
                                alt={arquivo.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                            <div style={{flex: 1}}>
                                <strong>{arquivo.name}</strong>
                                <p>
                                    {arquivo.status === 'Aguardando upload...' ? (
                                        <>
                                            <i className="pi pi-spin pi-spinner" style={{marginRight: '8px'}}></i>
                                            Aguardando upload...
                                        </>
                                    ) : (
                                        arquivo.status
                                    )}
                                </p>
                                {arquivo.data_analise && (
                                    <p>Data da análise: {arquivo.data_analise}</p>
                                )}
                                {arquivo.confianca !== undefined && (
                                    <p>Confiança: {arquivo.confianca}%</p>
                                )}
                            </div>
                        </div>
                    ))}

                    {arquivos.length > 1 && (
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={arquivos.length}
                            onPageChange={onPageChange}
                            template={{layout: 'PrevPageLink CurrentPageReport NextPageLink'}}
                            currentPageReportTemplate="{currentPage} de {totalPages}"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadImage;
