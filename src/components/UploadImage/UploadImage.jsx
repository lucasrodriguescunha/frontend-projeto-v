import React, { useState, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Paginator } from 'primereact/paginator';

const UploadImage = () => {
    const [arquivos, setArquivos] = useState([]);
    const [first, setFirst] = useState(0);
    const fileUploadRef = useRef(null);
    const rows = 1;

    const onSelect = (event) => {
        const selecionados = Array.from(event.files).map((file) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            status: 'Aguardando upload...'
        }));

        setArquivos(selecionados);
        setFirst(0);
    };

    const onUpload = async ({ files }) => {
        const novosArquivos = [...arquivos];

        for (const item of arquivos) {
            const formData = new FormData();
            formData.append('file', item.file);

            try {
                const response = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                const index = novosArquivos.findIndex((a) => a.name === item.name);

                novosArquivos[index].status = response.ok
                    ? `Qualidade: ${data.resultado}`
                    : `Erro: ${data.error}`;
            } catch (err) {
                const index = novosArquivos.findIndex((a) => a.name === item.name);
                novosArquivos[index].status = `Erro ao conectar: ${err.message}`;
            }
        }

        setArquivos([...novosArquivos]);
    };

    const onClear = () => {
        setArquivos([]);
        setFirst(0);
    };

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    const arquivosPaginados = arquivos.slice(first, first + rows);

    return (
        <div>
            <style>
                {`
                    .ocultar-conteudo .p-fileupload-content {
                        display: none !important;
                    }
                `}
            </style>

            <div className={arquivos.length > 0 ? 'ocultar-conteudo' : ''}>
                <FileUpload
                    ref={fileUploadRef}
                    name="demo[]"
                    customUpload
                    uploadHandler={onUpload}
                    onSelect={onSelect}
                    onClear={onClear}
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    chooseLabel="Escolher"
                    uploadLabel="Upload"
                    cancelLabel="Cancelar"
                    emptyTemplate={<p className="m-0">Arraste e solte os arquivos aqui.</p>}
                    showUploadButton={arquivos.length > 0}
                    showCancelButton={arquivos.length > 0}
                    auto={false}
                    itemTemplate={() => null}
                />
            </div>

            {arquivos.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
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
                            <div style={{ flex: 1 }}>
                                <strong>{arquivo.name}</strong>
                                <p>
                                    {arquivo.status === 'Aguardando upload...' ? (
                                        <>
                                            <i className="pi pi-spin pi-spinner" style={{ marginRight: '8px' }}></i>
                                            Aguardando upload...
                                        </>
                                    ) : (
                                        arquivo.status
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}

                    {arquivos.length > 1 && (
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={arquivos.length}
                            onPageChange={onPageChange}
                            template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadImage;
