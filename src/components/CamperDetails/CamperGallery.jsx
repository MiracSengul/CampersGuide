import React from 'react';
import styles from '../../pages/CamperDetailsPage.module.css';

// Horizontal scrollable image gallery
const CamperGallery = ({ images }) => (
  <div className={styles.gallery}>
    {images.map((img, index) => (
      <img key={index} src={img.original} alt={`Camper ${index + 1}`} className={styles.galleryImage} />
    ))}
  </div>
);

export default CamperGallery;