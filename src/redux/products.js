import {createSlice} from '@reduxjs/toolkit'

import {PaginatorGets} from './helpers/PaginatorGets.js'

export const storeProducts = createSlice({
	name: 'products',
	initialState: {
    paginator: new PaginatorGets(20),
    products: [],
    loadProducts: false,
    errorProducts: false,
    loadMoreProducts: false,
    errorMoreProducts: false,
    categories: [],
    loadCategories: false,
    errorCategories: false,
    product: null,
    loadProduct: false,
    errorProduct: false,
    shortProducts: [],
    loadShortProducts: false,
    errorShortProducts: false,
	},
	reducers: {
    moreProducts(state, action) {
      state.paginator.addWithReplace(state, 'products', action.payload, (newItem, currItem) => currItem.id == newItem.id);
    },
    startLoadMoreProducts(state, action) {
      state.loadMoreProducts = true;
    },
    endLoadMoreProducts(state, action) {
      state.loadMoreProducts = false;
    },
    errorMoreProducts(state, action) {
      state.errorMoreProducts = action.payload;
    },
    products(state, action) {
      state.paginator.add(state, 'products', action.payload);
    },
    startLoadProducts(state, action) {
      state.loadProducts = true;
    },
    endLoadProducts(state, action) {
      state.loadProducts = false;
    },
    errorProducts(state, action) {
      state.errorProducts = action.payload;
    },
    categories(state, action) {
      state.categories = [...action.payload];
    },
    startLoadCategories(state, action) {
      state.loadCategories = true;
    },
    endLoadCategories(state, action) {
      state.loadCategories = false;
    },
    errorCategories(state, action) {
      state.errorCategories = action.payload;
    },
    product(state, action) {
      state.product = {...action.payload}
    },
    startLoadProduct(state, action) {
      state.loadProduct = true;
    },
    endLoadProduct(state, action) {
      state.loadProduct = false;
    },
    errorProduct(state, action) {
      state.errorProduct = action.payload;
    },
    shortProducts(state, action) {
      state.shortProducts = [...action.payload];
    },
    startLoadShortProducts(state, action) {
      state.loadShortProducts = true;
    },
    endLoadShortProducts(state, action) {
      state.loadShortProducts = false;
    },
    errorShortProducts(state, action) {
      state.errorShortProducts = action.payload;
    },
	}
});

export const {
  products, startLoadProducts, endLoadProducts, errorProducts,
  moreProducts, startLoadMoreProducts, endLoadMoreProducts, errorLoadMoreProducts,
  categories, startLoadCategories, endLoadCategories, errorCategories,
  product, startLoadProduct, endLoadProduct, errorProduct,
  shortProducts, startLoadShortProducts, endLoadShortProducts, errorShortProducts,
} = storeProducts.actions;

export default storeProducts.reducer;
