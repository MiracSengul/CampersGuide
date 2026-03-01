import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);

  const isFavorite = favorites.includes(camper.id);

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{camper.name}</h3>
      <p>${Number(camper.price).toFixed(2)}</p>

      <button onClick={() => dispatch(toggleFavorite(camper.id))}>
        {isFavorite ? "Remove Favorite" : "Add Favorite"}
      </button>

      <a href={`/catalog/${camper.id}`} target="_blank">
        Show More
      </a>
    </div>
  );
}