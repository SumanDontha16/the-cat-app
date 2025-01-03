import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catImages: [],
  favorites: [],
  votes: [],
}

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setCatImages: (state, action) => {
      state.catImages = action.payload;
    },
    addCatImage: (state, action) => {
      state.catImages.push(action.payload); 
    },
    updateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    updateVotes: (state, action) => {
      state.votes = {...state.votes, ...action.payload};
    },
  },
});

export const favoritesSelector = (state) => state.cats.favorites;
export const votesSelector = (state) => state.cats.votes;

export const { addCatImage, updateFavorites, updateVotes } = catsSlice.actions;
export default catsSlice.reducer;