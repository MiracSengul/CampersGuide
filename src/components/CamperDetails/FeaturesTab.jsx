import React from 'react';
import styles from '../../pages/CamperDetailsPage.module.css';

// Grid of feature buttons (AC, Kitchen, TV etc.)
const FeaturesTab = ({ features }) => (
  <div className={styles.featuresTab}>
    <div className={styles.featuresGrid}>
      {features.map((feature, idx) => (
        <div key={idx} className={styles.featureItem}>
          <img src={feature.icon} alt={feature.label} className={styles.featureIcon} />
          <span>{feature.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturesTab;