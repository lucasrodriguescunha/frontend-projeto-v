import React from 'react';
import Card from '../../components/Card/Card'
import styles from './Base.module.css'

const Base = () => {
  return (
    <div className={styles.container}>
        <Card title="Analisar imagem" subTitle="Envie sua imagem para análise." route="/upload"/>
        <Card title="Seu perfil" subTitle="Clique para acessar seu perfil." route="/profile"/>
    </div>
  )
}

export default Base;