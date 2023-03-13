import {createSlice} from '@reduxjs/toolkit'

export const storeHome = createSlice({
	name: 'home',
	initialState: {
    caruselProducts: [],
    loadCaruselProducts: false,
    errorCaruselProducts: false,
    ratingProducts: [],
    loadRatingProducts: false,
    errorRatingProducts: false,
    interestProducts: [],
    loadInterestProducts: false,
    errorInterestProducts: false,
	},
	reducers: {
    caruselProducts(state, action) {
      state.caruselProducts = action.payload;
    },
    startLoadCaruselProducts(state, action) {
      state.loadCaruselProducts = true;
    },
    endLoadCaruselProducts(state, action) {
      state.loadCaruselProducts = false;
    },
    errorCaruselProducts(state, action) {
      state.errorCaruselProducts = action.payload;
    },
    ratingProducts(state, action) {
      state.ratingProducts = action.payload;
    },
    startLoadRatingProducts(state, action) {
      state.loadRatingProducts = true;
    },
    endLoadRatingProducts(state, action) {
      state.loadRatingProducts = false;
    },
    errorRatingProducts(state, action) {
      state.errorRatingProducts = action.payload;
    },
    interestProducts(state, action) {
      state.interestProducts = action.payload;
    },
    startLoadInterestProducts(state, action) {
      state.loadInterestProducts = true;
    },
    endLoadInterestProducts(state, action) {
      state.loadInterestProducts = false;
    },
    errorInterestProducts(state, action) {
      state.errorInterestProducts = action.payload;
    },
	}
});

export const {
  caruselProducts, startLoadCaruselProducts, endLoadCaruselProducts, errorCaruselProducts,
  ratingProducts, startLoadRatingProducts, endLoadRatingProducts, errorRatingProducts,
  interestProducts, startLoadInterestProducts, endLoadInterestProducts, errorInterestProducts,
} = storeHome.actions;

export default storeHome.reducer;
