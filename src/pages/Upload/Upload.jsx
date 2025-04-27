import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router';
import styles from './Upload.module.css';
import UploadImage from '../../components/UploadImage/UploadImage';

const Upload = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.pageContainer}>
            <Card className={styles.card}>
                <h2 className={styles.title}>Escolha suas imagens</h2>

                <UploadImage/>

                <Button label="Visualizar histórico" icon="pi pi-paper" className={styles.button}
                        onClick={() => navigate("/app/historic")}/>

                <Button label="Voltar para página inicial" className={styles.button}
                        onClick={() => navigate("/app/home")}/>
            </Card>
        </div>
    );
};

export default Upload;
