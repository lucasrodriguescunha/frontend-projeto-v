import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card as PrimeCard } from 'primereact/card';
import { Button } from 'primereact/button';
import styles from './Card.module.css';

const Card = ({ title, content, showButton, route }) => {
  const navigate = useNavigate();

  const handleAccessClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className={styles.card}>
      <PrimeCard>
        <div className={styles.cardTitle}>{title}</div>
        <p>{content}</p>
        {showButton && (
          <Button 
            label="Acessar"
            className={styles.customButton}
            size="small"
            onClick={handleAccessClick}
          />
        )}
      </PrimeCard>
    </div>
  );
};

export default Card;
