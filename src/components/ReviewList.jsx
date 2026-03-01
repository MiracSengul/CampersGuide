import StarRating from "./StarRating";

export default function ReviewList({ reviews }) {
  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>{review.comment}</p>
          <StarRating rating={review.rating} />
        </div>
      ))}
    </div>
  );
}