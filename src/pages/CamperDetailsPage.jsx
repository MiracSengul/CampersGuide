import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById, clearSelectedCamper } from '../features/campers/campersSlice';
import styles from './CamperDetailsPage.module.css';

// SVG 
import mapIcon from '../assets/map.svg';
import starIcon from '../assets/star.svg';
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

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper, status } = useSelector(state => state.campers);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    dispatch(fetchCamperById(id));
    return () => {
      dispatch(clearSelectedCamper());
    };
  }, [id, dispatch]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  if (status === 'loading') return <div className={styles.loading}>Loading...</div>;
  if (!selectedCamper) return <div className={styles.notFound}>Camper not found</div>;

  const formattedPrice = selectedCamper.price?.toFixed(2);
  const reviewCount = selectedCamper.reviews?.length || 0;

  const features = [
    selectedCamper.transmission === 'automatic' && { label: 'Automatic', icon: automaticIcon },
    selectedCamper.engine === 'petrol' && { label: 'Petrol', icon: petrolIcon },
    selectedCamper.AC && { label: 'AC', icon: acIcon },
    selectedCamper.kitchen && { label: 'Kitchen', icon: kitchenIcon },
    selectedCamper.TV && { label: 'TV', icon: tvIcon },
    selectedCamper.bathroom && { label: 'Bathroom', icon: bathroomIcon },
    selectedCamper.radio && { label: 'Radio', icon: radioIcon },
    selectedCamper.refrigerator && { label: 'Refrigerator', icon: refrigeratorIcon },
    selectedCamper.microwave && { label: 'Microwave', icon: microwaveIcon },
    selectedCamper.gas && { label: 'Gas', icon: gasIcon },
    selectedCamper.water && { label: 'Water', icon: waterIcon },
  ].filter(Boolean);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Upper Side (pictures infos etc...) */}
        <div className={styles.topSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>{selectedCamper.name}</h1>
            <div className={styles.ratingLocation}>
              <div className={styles.rating}>
                <img src={starIcon} alt="star" />
                <span>{selectedCamper.rating} ({reviewCount} Reviews)</span>
              </div>
              <div className={styles.location}>
                <img src={mapIcon} alt="map" />
                <span>{selectedCamper.location}</span>
              </div>
            </div>
            <div className={styles.price}>€{formattedPrice}</div>
          </div>

          <div className={styles.gallery}>
            {selectedCamper.gallery?.map((img, index) => (
              <img key={index} src={img.original} alt={`${selectedCamper.name} ${index + 1}`} className={styles.galleryImage} />
            ))}
          </div>

          <p className={styles.description}>{selectedCamper.description}</p>
        </div>

        {/* Lover part */}
        <div className={styles.bottomSection}>
          {/* vehicle details */}
          <div className={styles.leftColumn}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${activeTab === 'features' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            {activeTab === 'features' && (
              <div className={styles.featuresTab}>
                <div className={styles.featuresGrid}>
                  {features.map((feature, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <img src={feature.icon} alt={feature.label} className={styles.featureIcon} />
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.detailsTable}>
                  <h3>Vehicle details</h3>
                  <table>
                    <tbody>
                      <tr><td>Form</td><td>{selectedCamper.form}</td></tr>
                      <tr><td>Length</td><td>{selectedCamper.length}</td></tr>
                      <tr><td>Width</td><td>{selectedCamper.width}</td></tr>
                      <tr><td>Height</td><td>{selectedCamper.height}</td></tr>
                      <tr><td>Tank</td><td>{selectedCamper.tank}</td></tr>
                      <tr><td>Consumption</td><td>{selectedCamper.consumption}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className={styles.reviewsTab}>
                {selectedCamper.reviews?.map((review, index) => (
                  <div key={index} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <strong>{review.reviewer_name}</strong>
                      <div className={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.reviewer_rating ? styles.starFilled : styles.starEmpty}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment Form */}
          <aside className={styles.rightColumn}>
            <h3>Book your campervan now</h3>
            <p className={styles.bookingSubtitle}>Stay connected! We are always ready to help you.</p>
            <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="bookingDate">Booking date *</label>
                <input type="date" id="bookingDate" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="comment">Comment</label>
                <textarea id="comment" rows="4"></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>Send</button>
              {bookingSuccess && <p className={styles.successMessage}>Booking successful!</p>}
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;