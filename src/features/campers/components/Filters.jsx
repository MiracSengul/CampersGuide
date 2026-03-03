import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../campersSlice';
import styles from './Filters.module.css';

// SVG
import locationIcon from '../../../assets/Location.svg';
import acIcon from '../../../assets/ac.svg';
import automaticIcon from '../../../assets/automatic.svg';
import kitchenIcon from '../../../assets/kitchen.svg';
import tvIcon from '../../../assets/tv.svg';
import bathroomIcon from '../../../assets/bathroom.svg';
import vanIcon from '../../../assets/van.svg';
import fullyIntegratedIcon from '../../../assets/fully-integrated.svg';
import alcoveIcon from '../../../assets/alcove.svg';

const featureOptions = [
  { label: 'AC', value: 'AC', icon: acIcon },
  { label: 'Automatic', value: 'automatic', icon: automaticIcon },
  { label: 'Kitchen', value: 'kitchen', icon: kitchenIcon },
  { label: 'TV', value: 'TV', icon: tvIcon },
  { label: 'Bathroom', value: 'bathroom', icon: bathroomIcon },
  // Other features can be added optionally.
];

const formOptions = [
  { label: 'Van', value: 'panelTruck', icon: vanIcon },
  { label: 'Fully Integrated', value: 'fullyIntegrated', icon: fullyIntegratedIcon },
  { label: 'Alcove', value: 'alcove', icon: alcoveIcon },
];

const Filters = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [form, setForm] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    dispatch(setFilters({ location, form, features: selectedFeatures }));
  }, [location, form, selectedFeatures, dispatch]);

  const handleFeatureChange = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  return (
    <div className={styles.filters}>
      {/* Location */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Location</label>
        <div className={styles.inputWrapper}>
          <img src={locationIcon} alt="location" className={styles.inputIcon} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Kyiv, Ukraine"
            className={styles.locationInput}
          />
        </div>
      </div>

      {/* Vehicle equipment */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterHeading}>Vehicle equipment</h3>
        <div className={styles.featureGrid}>
          {featureOptions.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.value);
            return (
              <button
                key={feature.value}
                className={`${styles.featureButton} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleFeatureChange(feature.value)}
                type="button"
              >
                <img src={feature.icon} alt={feature.label} className={styles.featureIcon} />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle type */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterHeading}>Vehicle type</h3>
        <div className={styles.formGrid}>
          {formOptions.map((option) => {
            const isSelected = form === option.value;
            return (
              <button
                key={option.value}
                className={`${styles.formButton} ${isSelected ? styles.selected : ''}`}
                onClick={() => setForm(form === option.value ? '' : option.value)}
                type="button"
              >
                <img src={option.icon} alt={option.label} className={styles.formIcon} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search button */}
      <button className={styles.searchButton}>Search</button>
    </div>
  );
};

export default Filters;