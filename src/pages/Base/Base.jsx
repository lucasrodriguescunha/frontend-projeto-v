import React from 'react';
import Card from '../../components/Card/Card'
import styles from './Base.module.css'

const Base = () => {
    return (
        <div className={styles.container}>
            <Card title="Analisar imagem" subTitle="Envie sua imagem para análise." route="/upload"/>
            <Card title="Seu perfil" subTitle="Clique para acessar seu perfil." route="/profile"/>
            <Card title="Relatórios" subTitle="Clique para ver o relatório das imagens analisadas." route="/record"/>
            <Card title="Administrador" subTitle="Clique para ver solicitações de acesso." route="/admin"/>
        </div>
    )
}

export default Base;