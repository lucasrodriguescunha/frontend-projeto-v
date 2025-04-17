import React from 'react';
import Card from '../card/Card';
import styles from './Container.module.css';

const Container = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>QualiAI</h1>
      <div className={styles.container}>
        <Card 
          title="Analisar" 
          content="Faça upload de sua imagem para a análise." 
          showButton={true} 
          route="/upload-image"
        />
        <Card 
          title="Perfil" 
          content="Clique para acessar seu perfil." 
          showButton={true} 
          route="/profile"
        />
        <Card 
          title="Card 3" 
          content="Conteúdo do Card 3." 
          showButton={true}
        />
      </div>
    </div>
  );
};

export default Container;
