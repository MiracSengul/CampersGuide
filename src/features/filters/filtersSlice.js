import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  type: "",
  features: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    toggleFeature: (state, action) => {
      if (state.features.includes(action.payload)) {
        state.features = state.features.filter(f => f !== action.payload);
      } else {
        state.features.push(action.payload);
      }
    },
    resetFilters: () => initialState,
  },
});

export const { setLocation, setType, toggleFeature, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;