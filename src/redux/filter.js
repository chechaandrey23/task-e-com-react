import {createSlice} from '@reduxjs/toolkit';

export const storeFilter = createSlice({
	name: 'filter',
	initialState: {
    switchCategories: false,
    categories: [],
    switchPricies: true,
    pricies: [450, 1900],
    switchSorting: false,
    sorting: ['price', 'DESC'],
    defaultFilter: {
      categories: [],
      switchCategories: false,
      pricies: [450, 1900],
      switchPricies: true,
      sorting: ['price', 'DESC'],
      switchSorting: false,
    }
	},
	reducers: {
    saveCategories(state, action) {
      state.categories = action.payload;
    },
    saveSwitchCategories(state, action) {
      state.switchCategories = action.payload;
    },
    savePricies(state, action) {
      state.pricies = action.payload;
    },
    saveSwitchPricies(state, action) {
      state.switchPricies = action.payload;
    },
    saveSorting(state, action) {
      state.sorting = action.payload;
    },
    saveSwitchSorting(state, action) {
      state.switchSorting = action.payload;
    },
    toDefault(state, action) {
      state.categories = state.defaultFilter.categories;
      state.switchCategories = state.defaultFilter.switchCategories;
      state.pricies = state.defaultFilter.pricies;
      state.switchPricies = state.defaultFilter.switchPricies;
      state.sorting = state.defaultFilter.sorting;
      state.switchSorting = state.defaultFilter.switchSorting;
    }
	}
});

export const {
  saveCategories, saveSwitchCategories, savePricies, saveSwitchPricies,
  saveSorting, saveSwitchSorting, toDefault,
} = storeFilter.actions;

export default storeFilter.reducer;
