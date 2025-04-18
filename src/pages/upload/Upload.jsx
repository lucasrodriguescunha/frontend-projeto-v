import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router';
import styles from './Upload.module.css';
import UploadImage from '../../components/upload/UploadImage';

const Upload = () => {
    const navigate = useNavigate();

    const redirectHome = () => {
        navigate("/home");
    };

    return (
        <div className={styles.pageContainer}>
            <Card className={styles.card}>
                <h2 className={styles.title}>Escolha sua imagem</h2>

                <UploadImage/>

                <Button label="Voltar para página inicial" className={styles.button} onClick={redirectHome}/>
            </Card>
        </div>
    );
};

export default Upload;
