import React from 'react';
import Card from '../../components/Card/Card';

import styles from './Base.module.css';

const cardData = [
    {title: "Análise", subTitle: "Envie sua imagens para análise.", route: "/app/upload"},
    {title: "Seu perfil", subTitle: "Clique para acessar seu perfil ", route: "/app/profile"},
    {title: "Relatórios", subTitle: "Clique para acessar a página de relatórios.", route: "/app/report"},
    {title: "Controle de usuários", subTitle: "Clique para ver solicitações de acesso.", route: "/app/admin"},
];

const Base = () => {
    return (
        <div className={styles.baseContainer}>
            {cardData.map(({title, subTitle, route}) => (
                <Card key={route} title={title} subTitle={subTitle} route={route}/>
            ))}
        </div>
    );
};

export default Base;
