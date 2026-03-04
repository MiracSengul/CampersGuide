import React from 'react';
import styles from '../../pages/CamperDetailsPage.module.css';
import mapIcon from '../../assets/map.svg';
import starIcon from '../../assets/star.svg';

// Displays camper name, rating, location and price
const CamperHeader = ({ camper }) => {
  const formattedPrice = camper.price?.toFixed(2);
  const reviewCount = camper.reviews?.length || 0;

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{camper.name}</h1>
      <div className={styles.ratingLocation}>
        <div className={styles.rating}>
          <img src={starIcon} alt="star" />
          <span>{camper.rating} ({reviewCount} Reviews)</span>
        </div>
        <div className={styles.location}>
          <img src={mapIcon} alt="map" />
          <span>{camper.location}</span>
        </div>
      </div>
      <div className={styles.price}>€{formattedPrice}</div>
    </div>
  );
};

export default CamperHeader;