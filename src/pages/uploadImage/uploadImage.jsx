import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import styles from './uploadImage.module.css';

const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleUpload = () => {
        if (!selectedImage) {
            alert("Por favor, selecione uma imagem antes de enviar.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        console.log("Imagem pronta para envio:", selectedImage);

        alert("Imagem enviada com sucesso!");
    };

    return (
        <div className={styles.pageContainer}>
            <Card className={styles.card}>
                <h2 className={styles.title}>Escolha sua imagem</h2>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className={styles.input}
                />
                <Button label="Enviar" onClick={handleUpload} className={styles.button}/>
            </Card>
        </div>
    );
};

export default UploadImage;
