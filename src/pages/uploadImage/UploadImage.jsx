import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router';
import styles from './UploadImage.module.css';
import Upload from "../../components/Upload";

const UploadImage = () => {
    const navigate = useNavigate();

    const redirectHome = () => {
        navigate("/home");
    };

    return (
        <div className={styles.pageContainer}>
            <Card className={styles.card}>
                <h2 className={styles.title}>Escolha sua imagem</h2>

                <Upload/>

                <Button label="Voltar para página inicial" className={styles.button} onClick={redirectHome}/>
            </Card>
        </div>
    );
};

export default UploadImage;
