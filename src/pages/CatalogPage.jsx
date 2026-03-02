import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, clearCampers, incrementPage } from "../features/campers/campersSlice";
import CamperCard from "../components/CamperCard";
import Filters from "../components/Filters";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, page } = useSelector(state => state.campers);
  const filters = useSelector(state => state.filters);

  useEffect(() => {

    const params = {
      _page: page,
      _limit: 4
    };
  
    if (filters.location) params.location = filters.location;
    if (filters.type) params.form = filters.type;
  
    dispatch(fetchCampers(params));
  
  }, [dispatch, page, filters]);

  const loadMore = () => {
    dispatch(incrementPage());
  };

  const applyFilters = () => {
    dispatch(clearCampers());
  };

  return (
    <div>
      <h2>Catalog</h2>
      <Filters onApply={applyFilters} />
      {items.map(camper => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}