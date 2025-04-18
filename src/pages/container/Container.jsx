import React from 'react';
import Card from '../../components/card/Card'
import styles from './Container.module.css'

const Container = () => {
  return (
    <div className={styles.container}>
        <Card title="Analisar imagem" subTitle="Envie sua imagem para análise." route="/upload"/>
        <Card title="Seu perfil" subTitle="Clique para acessar seu perfil." route="/profile"/>
    </div>
  )
}

export default Container;