// Importa os hooks do React
import React, {useCallback, useRef, useState} from 'react';

// Importa componentes da biblioteca PrimeReact
import {FileUpload} from 'primereact/fileupload';
import {Paginator} from 'primereact/paginator';
import {Badge} from 'primereact/badge';
import {Toast} from 'primereact/toast';

// Importa função para gerar IDs únicos
import {v4 as uuidv4} from 'uuid';

// Importa o componente de menu suspenso personalizado
import Dropdown from "../Dropdown/Dropdown";

// Importa serviço responsável por enviar imagens para análise
import aiService from "../../services/AIService";

// Importa os estilos CSS do módulo
import styles from './UploadImage.module.css';

// Define as opções de análise disponíveis
const analysisOptions = [
    "Maçãs",
    "Mangas",
];

// Componente principal de upload de imagens
const UploadImage = () => {
    // Estado para armazenar arquivos selecionados
    const [files, setFiles] = useState([]);

    // Estado da primeira página da paginação
    const [first, setFirst] = useState(0);

    // Identificador único do grupo de imagens (gerado a cada novo envio)
    const [groupId, setGroupId] = useState(null);

    // Categoria/fruta selecionada pelo usuário
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);

    // Referência ao componente FileUpload
    const fileUploadRef = useRef(null);

    // Referência ao componente Toast para exibir mensagens
    const toast = useRef(null);

    // Número de arquivos exibidos por página
    const rows = 1;

    // Função chamada ao selecionar arquivos
    const onSelectFiles = useCallback((event) => {
        // Gera um novo ID de grupo para essa seleção
        const newGroupId = uuidv4();
        setGroupId(newGroupId);

        // Mapeia os arquivos selecionados e cria objetos do tipo ImageModel
        const selectedFiles = Array.from(event.files).map((file) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            status: 'Aguardando upload...',
            data_analise: null,
            confianca: null
        }));

        // Atualiza o estado com os arquivos selectedFiles
        setFiles(selectedFiles);

        // Reinicia a paginação para o início
        setFirst(0);
    }, []);

    // Função chamada ao clicar em "Upload"
    const onUploadFiles = useCallback(async () => {
        // Verifica se uma fruta foi selecionada
        if (!selectedAnalysis) {
            toast.current.show({
                severity: 'warn',
                summary: 'Atenção',
                detail: 'Por favor, selecione uma categoria de fruta antes de fazer upload.',
                life: 3000
            });
            return;
        }

        try {
            // Envia todos os arquivos para o serviço de IA e atualiza os resultados
            const updatedFiles = await Promise.all(
                files.map(async (item) => {
                    const result = await aiService.uploadImage(item.file, groupId, selectedAnalysis);

                    // Verifica se o resultado da API é válido
                    if (!result || !result.resultado) {
                        throw new Error("Resposta inválida do servidor.");
                    }

                    // Atualiza o objeto com os dados da análise
                    item.status = result.resultado;
                    item.data_analise = result.data_analise;
                    item.confianca = result.confianca;

                    return item;
                })
            );

            // Atualiza o estado com os arquivos analisados
            setFiles([...updatedFiles]);
        } catch (err) {
            // Em caso de erro, marca os arquivos como erro
            const fileFailed = files.map((item) => {
                item.status = `Erro: ${err}`;
                item.data_analise = null;
                item.confianca = null;

                return item;
            });

            setFiles([...fileFailed]);
        }
    }, [files, groupId, selectedAnalysis]);

    // Função para limpar a seleção de arquivos
    const onClear = useCallback(() => {
        setFiles([]);
        setFirst(0);
        setGroupId(null);
    }, []);

    // Função para mudar a página da visualização
    const onPageChange = useCallback((event) => {
        setFirst(event.first);
    }, []);

    // Seleciona os arquivos da página atual
    const pagedFiles = files.slice(first, first + rows);

    return (
        <div>
            {/* Componente Toast para mensagens */}
            <Toast ref={toast}/>

            {/* Esconde conteúdo se houver arquivos */}
            <div className={files.length > 0 ? styles['ocultar-conteudo'] : ''}>
                {/* Componente de dropdown para selecionar fruta */}
                <Dropdown
                    options={analysisOptions}
                    placeholder="Selecione uma fruta"
                    selectedOption={selectedAnalysis}
                    onOptionChange={setSelectedAnalysis}
                />

                {/* Componente de upload de arquivos */}
                <div className={files.length > 0 ? 'ocultar-conteudo' : ''}>
                    <FileUpload
                        ref={fileUploadRef}
                        name="file"
                        customUpload // Usa função personalizada para upload
                        uploadHandler={onUploadFiles}
                        onSelect={onSelectFiles}
                        onClear={onClear}
                        multiple // Permite múltiplos arquivos
                        accept="image/*"
                        maxFileSize={1000000} // Tamanho máximo: 1MB
                        chooseLabel="Escolher"
                        uploadLabel={
                            <span className={styles['upload-label']}>
                                Upload
                                {/* Badge com número de arquivos */}
                                {files.length > 0 && (
                                    <Badge value={files.length} className={styles.badge}/>
                                )}
                            </span>
                        }
                        cancelLabel="Cancelar"
                        emptyTemplate={<p className="m-0">Arraste e solte as imagens aqui.</p>}
                        showUploadButton={files.length > 0}
                        showCancelButton={files.length > 0}
                        auto={false} // Upload manual
                        itemTemplate={() => null} // Não exibe template padrão
                        uploadIcon={null} // Remove ícone de upload
                    />
                </div>

                {/* Exibe arquivos analisados */}
                {files.length > 0 && (
                    <div className={styles['margin-top']}>
                        {pagedFiles.map((file, index) => (
                            <div
                                key={index}
                                className={styles['file-container']}
                            >
                                {/* Exibe imagem de pré-visualização */}
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    className={styles['preview-imagem']}
                                />

                                {/* Informações do file */}
                                <div className={styles['info-container']}>
                                    <strong>{file.name}</strong>
                                    <p>
                                        {file.status === 'Aguardando upload...' ? (
                                            <>
                                                <i className={`pi pi-spin pi-spinner ${styles['spinner-icon']}`}></i>
                                                Aguardando upload...
                                            </>
                                        ) : (
                                            file.status
                                        )}
                                    </p>

                                    {/* Data da análise, se disponível */}
                                    {file.data_analise && (
                                        <p>Data da análise: {file.data_analise}</p>
                                    )}

                                    {/* Confiança da IA, se analisado */}
                                    {file.status !== 'Aguardando upload...' && file.confianca !== undefined && (
                                        <p>Confiança: {file.confianca}%</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Paginação se houver mais de um file */}
                        {files.length > 1 && (
                            <Paginator
                                first={first}
                                rows={rows}
                                totalRecords={files.length}
                                onPageChange={onPageChange}
                                template={{layout: 'PrevPageLink CurrentPageReport NextPageLink'}}
                                currentPageReportTemplate="{currentPage} de {totalPages}"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Exporta o componente
export default UploadImage;
