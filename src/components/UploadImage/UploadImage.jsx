import React, {useState} from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Paginator} from 'primereact/paginator';

const UploadImage = () => {
    const [arquivos, setArquivos] = useState([]);
    const [first, setFirst] = useState(0);
    const rows = 5;

    const onSelect = (event) => {
        const selecionados = Array.from(event.files).map((file) => ({
            name: file.name,
            status: 'Aguardando upload...'
        }));

        setArquivos([...arquivos, ...selecionados]);
    };

    const onUpload = async (event) => {
        const novosArquivos = [...arquivos];

        for (const file of event.files) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                const index = novosArquivos.findIndex((a) => a.name === file.name);

                novosArquivos[index].status = response.ok
                    ? `Qualidade: ${data.resultado}`
                    : `Erro: ${data.error}`;

                setArquivos([...novosArquivos]);
            } catch (err) {
                const index = novosArquivos.findIndex((a) => a.name === file.name);
                novosArquivos[index].status = `Erro ao conectar: ${err.message}`;
                setArquivos([...novosArquivos]);
            }
        }
    };

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    const handleClear = () => {
        setArquivos([]);
        setFirst(0);
    };

    const arquivosPaginados = arquivos.slice(first, first + rows);

    return (
        <div>
            <FileUpload
                name="demo[]"
                customUpload
                uploadHandler={onUpload}
                onSelect={onSelect}
                multiple
                accept="image/*"
                maxFileSize={1000000}
                chooseLabel="Escolher"
                cancelLabel="Cancelar"
                emptyTemplate={<p className="m-0">Arraste e solte os arquivos aqui.</p>}
                onClear={handleClear}
            />

            {arquivos.length > 0 && (
                <div style={{marginTop: '1rem'}}>
                    <h3>Arquivos selecionados:</h3>
                    <section>
                        {arquivosPaginados.map((arquivo, index) => (
                            <p key={index}>
                                <strong>{arquivo.name}</strong>: {arquivo.status}
                            </p>
                        ))}
                    </section>
                </div>
            )}

            {arquivos.length > rows && (
                <div className="card" style={{marginTop: '1rem'}}>
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={arquivos.length}
                        onPageChange={onPageChange}
                        template={{layout: 'PrevPageLink CurrentPageReport NextPageLink'}}
                    />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
