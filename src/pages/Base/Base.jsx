import React from 'react';
import Card from '../../components/Card/Card';
import styles from './Base.module.css';

const cardData = [
    {title: "Analisar imagem", subTitle: "Envie sua imagem para análise.", route: "/app/upload"},
    {title: "Seu perfil", subTitle: "Clique para acessar seu perfil.", route: "/app/profile"},
    {title: "Relatórios", subTitle: "Clique para ver o relatório das imagens analisadas.", route: "/app/historic"},
    {title: "Administrador", subTitle: "Clique para ver solicitações de acesso.", route: "/app/admin"},
];

const Base = () => {
    return (
        <div className={styles.container}>
            {cardData.map(({title, subTitle, route}) => (
                <Card key={route} title={title} subTitle={subTitle} route={route}/>
            ))}
        </div>
    );
};

export default Base;
