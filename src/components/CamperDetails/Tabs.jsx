import React from 'react';
import styles from '../../pages/CamperDetailsPage.module.css';

// Tabs for switching between Features and Reviews
const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tabButton} ${activeTab === 'features' ? styles.activeTab : ''}`}
        onClick={() => onTabChange('features')}
      >
        Features
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
        onClick={() => onTabChange('reviews')}
      >
        Reviews
      </button>
    </div>
  );
};

export default Tabs;