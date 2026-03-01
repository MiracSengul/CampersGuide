import { useState } from "react";

export default function ReservationForm() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div>
      <h3>Reservation</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" required />
        <input type="date" required />
        <button type="submit">Reserve</button>
      </form>
      {success && <p>Reservation successful!</p>}
    </div>
  );
}