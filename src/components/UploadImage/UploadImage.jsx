import React, {useCallback, useRef, useState} from 'react';

import {FileUpload} from 'primereact/fileupload';
import {Paginator} from 'primereact/paginator';
import {Toast} from 'primereact/toast';
import {Button} from "primereact/button";
import {v4 as uuidv4} from 'uuid';
import Dropdown from "../Dropdown/Dropdown";
import aiService from "../../services/AIService";
import userService from "../../services/UserService";

import styles from './UploadImage.module.css';

const analysisOptions = [
    "Maçãs",
    "Mangas",
];

const UploadImage = () => {
    const [files, setFiles] = useState([]);
    const [first, setFirst] = useState(0);
    const [groupId, setGroupId] = useState(null);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [showWebcam, setShowWebcam] = useState(false);
    const fileUploadRef = useRef(null);
    const toast = useRef(null);
    const rows = 1;

    const customHeaderTemplate = (options) => {
        const {className, chooseButton, cancelButton} = options;

        return (
            <div className={className} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                {chooseButton}
                <Button
                    label="Webcam"
                    icon="pi pi-camera"
                    className="p-button-secondary"
                    onClick={startWebcam}
                />
                <Button
                    label="Upload"
                    icon="pi pi-upload"
                    className="p-button-success"
                    onClick={onUploadFiles}
                    disabled={files.length === 0}
                />
                {cancelButton}
            </div>
        );
    };

    const startWebcam = () => {
        setShowWebcam(true);

        navigator.mediaDevices.getUserMedia({video: true})
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch(err => {
                console.error("Erro ao acessar webcam:", err);
            });
    };

    const captureImage = async () => {
        if (!selectedAnalysis) {
            toast.current.show({
                severity: 'warn',
                summary: 'Atenção',
                detail: 'Por favor, selecione uma categoria de fruta antes de capturar.',
                life: 3000
            });
            return;
        }

        const context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, 256, 256);

        const dataUrl = canvasRef.current.toDataURL("image/png");
        const file = dataURLtoFile(dataUrl, `webcam-${uuidv4()}.png`);

        const currentGroupId = groupId || uuidv4();
        if (!groupId) setGroupId(currentGroupId);

        const newFile = {
            file,
            name: file.name,
            preview: dataUrl,
            status: 'Aguardando upload...',
            data_analise: null,
            confianca: null
        };

        setFiles((prev) => [...prev, newFile]);
        setFirst(0);

        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }

        setShowWebcam(false);
    };

    const closeWebcam = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setShowWebcam(false);
    };

    const dataURLtoFile = (dataUrl, filename) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    };

    const onSelectFiles = useCallback((event) => {
        const newGroupId = uuidv4();
        setGroupId(newGroupId);

        const selectedFiles = Array.from(event.files).map((file) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            status: 'Aguardando upload...',
            data_analise: null,
            confianca: null
        }));

        setFiles(selectedFiles);
        setFirst(0);
    }, []);

    const onUploadFiles = useCallback(async () => {
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
            const email = localStorage.getItem("userEmail");
            if (!email) throw new Error("E-mail do usuário não encontrado no localStorage.");

            const usuario = await userService.getUsuarioByEmail(email);
            const idUsuario = usuario?.idUsuario;
            if (!idUsuario) throw new Error("ID do usuário não encontrado.");

            const updatedFiles = await Promise.all(
                files.map(async (item) => {
                    const result = await aiService.uploadImage(item.file, groupId, selectedAnalysis, idUsuario);

                    if (!result || !result.resultado) {
                        throw new Error("Resposta inválida do servidor.");
                    }

                    item.status = result.resultado;
                    item.data_analise = result.data_analise;
                    item.confianca = result.confianca;

                    return item;
                })
            );

            setFiles([...updatedFiles]);
        } catch (err) {
            const fileFailed = files.map((item) => {
                item.status = `Erro: ${err.message}`;
                item.data_analise = null;
                item.confianca = null;
                return item;
            });

            setFiles([...fileFailed]);
        }
    }, [files, groupId, selectedAnalysis]);

    const onClear = useCallback(() => {
        setFiles([]);
        setFirst(0);
        setGroupId(null);
    }, []);

    const onPageChange = useCallback((event) => {
        setFirst(event.first);
    }, []);

    const pagedFiles = files.slice(first, first + rows);

    return (
        <div className={styles.uploadImageContainer}>
            <Toast ref={toast}/>

            <div className={files.length > 0 ? styles['ocultar-conteudo'] : ''}>
                <Dropdown
                    options={analysisOptions}
                    placeholder="Selecione uma fruta"
                    selectedOption={selectedAnalysis}
                    onOptionChange={setSelectedAnalysis}
                    style={{minWidth: '100%'}}
                />

                {showWebcam && (
                    <div className={styles.webcamContainer}>
                        <div className={styles.webcamModal}>
                            <div className={styles.webcamHeader}>
                                <h3>Capturar Imagem</h3>
                                <Button
                                    icon="pi pi-times"
                                    className="p-button-text p-button-plain"
                                    onClick={closeWebcam}
                                />
                            </div>
                            <div className={styles.webcamContent}>
                                <video ref={videoRef} width="300" height="200" className={styles.webcamVideo}/>
                                <div className={styles.webcamActions}>
                                    <Button
                                        label="Capturar"
                                        icon="pi pi-camera"
                                        onClick={captureImage}
                                        className="p-button-success"
                                    />
                                    <Button
                                        label="Cancelar"
                                        icon="pi pi-times"
                                        onClick={closeWebcam}
                                        className="p-button-secondary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <canvas ref={canvasRef} width="300" height="200" style={{display: 'none'}}/>

                <div className={files.length > 0 ? 'ocultar-conteudo' : ''}>
                    <FileUpload
                        ref={fileUploadRef}
                        name="file"
                        customUpload
                        uploadHandler={onUploadFiles}
                        onSelect={onSelectFiles}
                        onClear={onClear}
                        multiple
                        accept="image/*"
                        maxFileSize={1000000}
                        chooseLabel="Escolher"
                        uploadLabel="Upload"
                        cancelLabel="Cancelar"
                        headerTemplate={customHeaderTemplate}
                        emptyTemplate={<p className="m-0">Arraste e solte as imagens aqui.</p>}
                        showUploadButton={files.length > 0}
                        showCancelButton={files.length > 0}
                        auto={false}
                        itemTemplate={() => null}
                        uploadIcon={null}
                    />

                    {files.length > 0 && (
                        <div className={styles['margin-top']}>
                            {pagedFiles.map((file, index) => (
                                <div key={index} className={styles['file-container']}>
                                    <img src={file.preview} alt={file.name} className={styles['preview-imagem']}/>

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
                                        {file.data_analise && (
                                            <p>Data da análise: {file.data_analise}</p>
                                        )}
                                        {file.status !== 'Aguardando upload...' && file.confianca !== undefined && (
                                            <p>Confiança: {file.confianca}%</p>
                                        )}
                                    </div>
                                </div>
                            ))}

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
        </div>
    );
};

export default UploadImage;