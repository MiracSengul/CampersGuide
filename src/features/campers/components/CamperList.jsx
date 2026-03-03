import React from 'react';
import CamperCard from './CamperCard';
import styles from './CamperList.module.css';

const CamperList = ({ campers, favorites }) => {
  return (
    <div className={styles.list}>
      {campers.map(camper => (
        <CamperCard
          key={camper.id}
          camper={camper}
          isFavorite={favorites.includes(camper.id)}
        />
      ))}
    </div>
  );
};

export default CamperList;