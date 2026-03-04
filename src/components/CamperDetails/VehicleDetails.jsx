import React from 'react';
import styles from '../../pages/CamperDetailsPage.module.css';

// Technical specifications in a two-column list
const VehicleDetails = ({ camper }) => (
  <div className={styles.detailsList}>
    <h3>Vehicle details</h3>
    <ul className={styles.detailsItems}>
      <li><span>Form</span> {camper.form}</li>
      <li><span>Length</span> {camper.length}</li>
      <li><span>Width</span> {camper.width}</li>
      <li><span>Height</span> {camper.height}</li>
      <li><span>Tank</span> {camper.tank}</li>
      <li><span>Consumption</span> {camper.consumption}</li>
    </ul>
  </div>
);

export default VehicleDetails;