import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../pages/CamperDetailsPage.module.css';

// Booking form with date picker and validation
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

export default BookingForm;