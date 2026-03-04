import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById, clearSelectedCamper } from '../features/campers/campersSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

// Yardımcı fonksiyonlar
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

// Alt bileşenler
const CamperHeader = ({ camper }) => {
  const formattedPrice = camper.price?.toFixed(2);
  const reviewCount = camper.reviews?.length || 0;
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{camper.name}</h1>
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
      <div className={styles.price}>€{formattedPrice}</div>
    </div>
  );
};

const CamperGallery = ({ images }) => (
  <div className={styles.gallery}>
    {images.map((img, index) => (
      <img key={index} src={img.original} alt={`Camper ${index + 1}`} className={styles.galleryImage} />
    ))}
  </div>
);

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

const ReviewsTab = ({ reviews }) => (
  <div className={styles.reviewsTab}>
    {reviews.map((review, index) => (
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
);

// Vehicle details liste olarak
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

const BookingForm = ({ onSubmit, success }) => {
  const [startDate, setStartDate] = useState(null);

  return (
    <aside className={styles.bookingSection}>
      <h3>Book your campervan now</h3>
      <p className={styles.bookingSubtitle}>Stay connected! We are always ready to help you.</p>
      <form onSubmit={onSubmit} className={styles.bookingForm}>
        <div className={styles.formGroup}>
          <input type="text" placeholder="Name *" required />
        </div>
        <div className={styles.formGroup}>
          <input type="email" placeholder="Email *" required />
        </div>
        <div className={styles.formGroup}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Booking date *"
            className={styles.datePicker}
            wrapperClassName={styles.datePickerWrapper}
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <textarea placeholder="Comment" rows="4"></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Send</button>
        {success && <p className={styles.successMessage}>Booking successful!</p>}
      </form>
    </aside>
  );
};


// Ana bileşen
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
        {/* Üst kısım */}
        <div className={styles.topSection}>
          <CamperHeader camper={selectedCamper} />
          <CamperGallery images={selectedCamper.gallery} />
          <p className={styles.description}>{selectedCamper.description}</p>
        </div>

        {/* Sekmeler - tam genişlik */}
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

        {/* Tam genişlikte ayırıcı çizgi */}
        <hr className={styles.fullWidthHr} />

        {/* İki sütunlu alt kısım */}
        <div className={styles.bottomSection}>
          {/* Sol sütun: sekmelerin içeriği (sadece features veya reviews) + vehicle details */}
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

          {/* Sağ sütun: rezervasyon formu (her zaman görünür) */}
          <BookingForm onSubmit={handleBookingSubmit} success={bookingSuccess} />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;