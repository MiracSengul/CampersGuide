import React from 'react';
import styles from '../../pages/CamperDetailsPage.module.css';

// List of user reviews with star ratings
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

export default ReviewsTab;