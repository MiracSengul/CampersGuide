import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCampersAPI, fetchCamperByIdAPI } from "./campersAPI";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (params) => {
    return await fetchCampersAPI(params);
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id) => {
    return await fetchCamperByIdAPI(id);
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    selected: null,
    loading: false,
    page: 1,
  },
  reducers: {
    clearCampers: (state) => {
      state.items = [];
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export const { clearCampers, incrementPage } = campersSlice.actions;
export default campersSlice.reducer;