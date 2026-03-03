import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../../favorites/favoritesSlice';
import Button from '../../../components/UI/Button';
import styles from './CamperCard.module.css';

// SVG
import mapIcon from '../../../assets/map.svg';
import starIcon from '../../../assets/star.svg';
import heartIcon from '../../../assets/heart.svg';
import heartFilledIcon from '../../../assets/heart-filled.svg';
import acIcon from '../../../assets/ac.svg';
import automaticIcon from '../../../assets/automatic.svg';
import petrolIcon from '../../../assets/petrol.svg';
import kitchenIcon from '../../../assets/kitchen.svg';
import tvIcon from '../../../assets/tv.svg';
import bathroomIcon from '../../../assets/bathroom.svg';
import radioIcon from '../../../assets/radio.svg';
import refrigeratorIcon from '../../../assets/refrigerator.svg';
import microwaveIcon from '../../../assets/microwave.svg';
import gasIcon from '../../../assets/gas.svg';
import waterIcon from '../../../assets/water.svg';

const CamperCard = ({ camper, isFavorite }) => {
  const dispatch = useDispatch();

  const handleFavorite = (e) => {
    e.preventDefault();
    dispatch(toggleFavorite(camper.id));
  };

  const formattedPrice = camper.price?.toFixed(2);
  const reviewCount = camper.reviews?.length || 0;

  // All features are generated dynamically.
  const features = [
    camper.transmission === 'automatic' && { label: 'Automatic', icon: automaticIcon },
    camper.engine === 'petrol' && { label: 'Petrol', icon: petrolIcon },
    camper.AC && { label: 'AC', icon: acIcon },
    camper.kitchen && { label: 'Kitchen', icon: kitchenIcon },
    camper.TV && { label: 'TV', icon: tvIcon },
    camper.bathroom && { label: 'Bathroom', icon: bathroomIcon },
    camper.radio && { label: 'Radio', icon: radioIcon },
    camper.refrigerator && { label: 'Refrigerator', icon: refrigeratorIcon },
    camper.microwave && { label: 'Microwave', icon: microwaveIcon },
    camper.gas && { label: 'Gas', icon: gasIcon },
    camper.water && { label: 'Water', icon: waterIcon },
  ].filter(Boolean);

  return (
    <div className={styles.card}>
      <Link to={`/catalog/${camper.id}`} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <img src={camper.gallery?.[0]?.thumb} alt={camper.name} className={styles.image} />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{camper.name}</h3>
            <div className={styles.priceFav}>
              <span className={styles.price}>€{formattedPrice}</span>
              <button onClick={handleFavorite} className={styles.favButton}>
                <img src={isFavorite ? heartFilledIcon : heartIcon} alt="favorite" />
              </button>
            </div>
          </div>

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

          <p className={styles.description}>{camper.description}</p>

          <div className={styles.features}>
            {features.map((feature, idx) => (
              <div key={idx} className={styles.feature}>
                {feature.icon && <img src={feature.icon} alt="" className={styles.featureIcon} />}
                <span>{feature.label}</span>
              </div>
            ))}
          </div>

          <Button className={styles.showMore}>Show More</Button>
        </div>
      </Link>
    </div>
  );
};

export default CamperCard;