import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../features/campers/campersSlice";
import ReviewList from "../components/ReviewList";
import ReservationForm from "../components/ReservationForm";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(state => state.campers.selected);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (!camper) return <p>Loading...</p>;

  return (
    <div>
      <h2>{camper.name}</h2>
      <p>Price: ${Number(camper.price).toFixed(2)}</p>
      <p>Location: {camper.location}</p>

      <ReviewList reviews={camper.reviews || []} />
      <ReservationForm />
    </div>
  );
}