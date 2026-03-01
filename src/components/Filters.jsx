import { useDispatch } from "react-redux";
import { setLocation, setType, toggleFeature } from "../features/filters/filtersSlice";

export default function Filters({ onApply }) {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        placeholder="Location"
        onChange={(e) => dispatch(setLocation(e.target.value))}
      />

      <select onChange={(e) => dispatch(setType(e.target.value))}>
        <option value="">All Types</option>
        <option value="panel">Panel</option>
        <option value="fullyIntegrated">Fully Integrated</option>
      </select>

      <label>
        <input type="checkbox" onChange={() => dispatch(toggleFeature("AC"))} />
        AC
      </label>

      <label>
        <input type="checkbox" onChange={() => dispatch(toggleFeature("kitchen"))} />
        Kitchen
      </label>

      <button onClick={onApply}>Apply Filters</button>
    </div>
  );
}