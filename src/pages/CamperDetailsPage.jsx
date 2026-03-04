import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById, clearSelectedCamper } from '../features/campers/campersSlice';
import styles from './CamperDetailsPage.module.css';

// Import subcomponents
import CamperHeader from '../components/CamperDetails/CamperHeader';
import CamperGallery from '../components/CamperDetails/CamperGallery';
import Tabs from '../components/CamperDetails/Tabs';
import FeaturesTab from '../components/CamperDetails/FeaturesTab';
import ReviewsTab from '../components/CamperDetails/ReviewsTab';
import VehicleDetails from '../components/CamperDetails/VehicleDetails';
import BookingForm from '../components/CamperDetails/BookingForm';

// Import icons (for features generation)
import acIcon from '../assets/ac.svg';
import automaticIcon from '../assets/automatic.svg';
import petrolIcon from '../assets/petrol.svg';
import kitchenIcon from '../assets/kitchen.svg';
import tvIcon from '../assets/tv.svg';
import bathroomIcon from '../assets/bathroom.svg';
import radioIcon from '../assets/radio.svg';
import refrigeratorIcon from '../assets/refrigerator.svg';
import microwaveIcon from '../assets/microwave.svg';
import gasIcon from '../assets/gas.svg';
import waterIcon from '../assets/water.svg';

// Helper: generate feature list with icons based on camper data
const getFeatures = (camper) => {
  return [
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
};

// Main page component
const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper, status } = useSelector(state => state.campers);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    dispatch(fetchCamperById(id));
    return () => dispatch(clearSelectedCamper());
  }, [id, dispatch]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  if (status === 'loading') return <div className={styles.loading}>Loading...</div>;
  if (!selectedCamper) return <div className={styles.notFound}>Camper not found</div>;

  const features = getFeatures(selectedCamper);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Top section: header, gallery, description */}
        <div className={styles.topSection}>
          <CamperHeader camper={selectedCamper} />
          <CamperGallery images={selectedCamper.gallery} />
          <p className={styles.description}>{selectedCamper.description}</p>
        </div>

        {/* Tabs for switching between features and reviews */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <hr className={styles.fullWidthHr} />

        {/* Two-column layout: left column with tab content and vehicle details, right column with booking form */}
        <div className={styles.bottomSection}>
          <div className={styles.leftColumn}>
            {activeTab === 'features' ? (
              <>
                <FeaturesTab features={features} />
                <VehicleDetails camper={selectedCamper} />
              </>
            ) : (
              <ReviewsTab reviews={selectedCamper.reviews} />
            )}
          </div>
          <BookingForm onSubmit={handleBookingSubmit} success={bookingSuccess} />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;