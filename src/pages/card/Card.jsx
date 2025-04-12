import React from 'react';
import { Card as PrimeCard } from 'primereact/card';
import { Button } from 'primereact/button';
import styles from './Card.module.css';

const Card = ({ title, content, showButton }) => {
  return (
    <div className={styles.card}>
      <PrimeCard>
        <div className={styles.cardTitle}>{title}</div>
        <p>{content}</p>
        {showButton && (
          <Button 
            label="Enviar imagem"
            className={styles.customButton}
            size="small"
          />
        )}
      </PrimeCard>
    </div>
  );
};

export default Card;
