import React, {memo} from 'react';
import {Card as PrimeCard} from 'primereact/card';
import {Button} from 'primereact/button';
import styles from './Card.module.css';

const Card = ({title, subTitle, content, route, onClick}) => {
    return (
        <div className={styles.cardContainer}>
            <PrimeCard className={styles.card} title={title} subTitle={subTitle}>
                <div className={styles.buttonWrapper}>
                    <Button icon="pi pi-arrow-right" className={styles.cardButton} onClick={onClick}/>
                </div>
            </PrimeCard>
        </div>
    );
};

export default memo(Card);
