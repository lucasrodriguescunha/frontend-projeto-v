import React from 'react';
import Card from '../card/Card';
import styles from './Container.module.css';

const Container = () => {
  return (
    <div className={styles.container}>
      <Card title="Analisar" content="Faça upload de sua imagem para a análise." showButton={true}/>
      <Card title="Card 2" content="Conteúdo do Card 2." />
      <Card title="Card 3" content="Conteúdo do Card 3." />
    </div>
  );
};

export default Container;
