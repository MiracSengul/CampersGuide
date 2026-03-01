import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>TravelTrucks</h1>
      <button onClick={() => navigate("/catalog")}>
        View Now
      </button>
    </div>
  );
}