import { createSlice } from '@reduxjs/toolkit';

// get datas from localStorage
const loadFavorites = () => {
  try {
    const serialized = localStorage.getItem('favorites');
    return serialized ? JSON.parse(serialized) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavorites(), // ID's of favourites
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const index = state.items.indexOf(id);
      if (index === -1) {
        state.items.push(id);
      } else {
        state.items.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;