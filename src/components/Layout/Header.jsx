import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logoSvg from '../../assets/Logo.svg';
//HEADER
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logoSvg} alt="TravelTrucks" className={styles.logo} />
        </div>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;