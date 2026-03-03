import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/caravan.png'; 
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div 
      className={styles.home} 
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Campers of your dreams</h1>
            <p>You can find everything you want in our catalog</p>
            <Link to="/catalog" className={styles.ctaButton}>
              View Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;