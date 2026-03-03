import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCampers as fetchCampersAPI, fetchCamperById as fetchCamperByIdAPI } from './services/campersApi';

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async ({ filters, page, limit }, { rejectWithValue }) => {
    try {
      const data = await fetchCampersAPI({ ...filters, page, limit });
      return data; // { total, items }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchCamperByIdAPI(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    total: 0,
    status: 'idle',
    error: null,
    selectedCamper: null,
    filters: {
      location: '',
      form: '', // 'alcove', 'fullyIntegrated', 'panelTruck'
      features: [],
    },
    pagination: {
      page: 1,
      limit: 4, // number of cards per page
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // when filters change go back to first page
      state.items = []; // clear previous results
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearSelectedCamper: (state) => {
      state.selectedCamper = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.total = action.payload.total;
        // ID check
        const existingIds = new Set(state.items.map(item => item.id));
        const newItems = action.payload.items.filter(item => !existingIds.has(item.id));
        
        state.items = [...state.items, ...newItems];
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPage, clearSelectedCamper } = campersSlice.actions;
export default campersSlice.reducer;