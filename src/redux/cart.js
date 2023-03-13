import {createSlice} from '@reduxjs/toolkit';

import {Cart} from './helpers/Cart.js';

export const storeCart = createSlice({
	name: 'cart',
	initialState: {
    cart: new Cart(),

    products: [],
    loadProducts: false,
    errorProducts: false,

    deletingProduct: [],
    errorDeleteProduct: false,

    addingProduct: [],
    errorAddProduct: false,

    deletingAllProducts: [],
    errorDeleteAllProducts: false,

    plusingProduct: [],
    errorPlusProduct: false,

    minusingProduct: [],
    errorMinusProduct: false,

    quantitingProduct: [],
    errorQuantityProduct: false,

    countProducts: 0,
    countIdsProducts: [],
    countDataProducts: [],
    loadCountProducts: false,
    errorCountProducts: false,

    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
	},
	reducers: {
    products(state, action) {
      state.products = [...action.payload];
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
    countProducts(state, action) {
      state.countProducts = action.payload;
    },
    countIdsProducts(state, action) {
      state.countIdsProducts = action.payload;
    },
    countDataProducts(state, action) {
      state.countDataProducts = action.payload;
    },
    startLoadCountProducts(state, action) {
      state.loadCountProducts = true;
    },
    endLoadCountProducts(state, action) {
      state.loadCountProducts = false;
    },
    errorCountProducts(state, action) {
      state.errorCountProducts = action.payload;
    },
    deleteProduct(state, action) {
      state.products = state.products.filter((entry) => entry.id != action.payload.id);
    },
    startLoadDeleteProduct(state, action) {
      state.deletingProduct = [...state.deletingProduct, action.payload];
    },
    endLoadDeleteProduct(state, action) {
      state.deletingProduct = state.deletingProduct.filter((entry) => entry != action.payload);
    },
    errorDeleteProduct(state, action) {
      state.errorDeleteProduct = action.payload;
    },

    plusProduct(state, action) {
      state.products = state.products.map((entry) => {
        if(entry.id == action.payload.id) {
          return action.payload;
        } else {
          return entry;
        }
      });
    },
    startLoadPlusProduct(state, action) {
      state.plusingProduct = [...state.plusingProduct, action.payload];
    },
    endLoadPlusProduct(state, action) {
      state.plusingProduct = state.plusingProduct.filter((entry) => entry != action.payload);
    },
    errorPlusProduct(state, action) {
      state.errorPlusProduct = action.payload;
    },
    minusProduct(state, action) {
      state.products = state.products.map((entry) => {
        if(entry.id == action.payload.id) {
          return action.payload;
        } else {
          return entry;
        }
      });
    },
    startLoadMinusProduct(state, action) {
      state.minusingProduct = [...state.minusingProduct, action.payload];
    },
    endLoadMinusProduct(state, action) {
      state.minusingProduct = state.minusingProduct.filter((entry) => entry != action.payload);
    },
    errorMinusProduct(state, action) {
      state.errorMinusProduct = action.payload;
    },
    quantityProduct(state, action) {
      state.products = state.products.map((entry) => {
        if(entry.id == action.payload.id) {
          return action.payload;
        } else {
          return entry;
        }
      });
    },
    startLoadQuantityProduct(state, action) {
      state.quantitingProduct = [...state.quantitingProduct, action.payload];
    },
    endLoadQuantityProduct(state, action) {
      state.quantitingProduct = state.quantitingProduct.filter((entry) => entry != action.payload);
    },
    errorQuantityProduct(state, action) {
      state.errorQuantityProduct = action.payload;
    },

    total(state, action) {
      state.total = action.payload;
    },
    discountedTotal(state, action) {
      state.discountedTotal = action.payload;
    },
    totalProducts(state, action) {
      state.totalProducts = action.payload;
    },
    totalQuantity(state, action) {
      state.totalQuantity = action.payload;
    },
    addProduct(state, action) {

    },
    startLoadAddProduct(state, action) {
      state.addingProduct = [...state.addingProduct, action.payload];
    },
    endLoadAddProduct(state, action) {
      state.addingProduct = state.addingProduct.filter((entry) => entry != action.payload);
    },
    errorAddProduct(state, action) {
      state.errorAddProduct = action.payload;
    },
    deleteAllProducts(state, action) {
      state.products = state.products.filter((entry) => !action.payload.includes(entry.id));
    },
    startLoadDeleteAllProducts(state, action) {
      state.deletingAllProducts = [...state.deletingProduct, ...action.payload];
      //state.deletingProduct = [...state.deletingProduct, ...action.payload];
    },
    endLoadDeleteAllProducts(state, action) {
      state.deletingAllProducts = state.deletingProduct.filter((entry) => !action.payload.includes(entry));
      //state.deletingProduct = state.deletingProduct.filter((entry) => !action.payload.includes(entry));
    },
    errorDeleteAllProducts(state, action) {
      state.errorDeleteAllProducts = action.payload;
    },
	}
});

export const {
  products, startLoadProducts, endLoadProducts, errorProducts,
  countProducts, countIdsProducts, countDataProducts, startLoadCountProducts, endLoadCountProducts, errorLoadCountProducts,
  deleteProduct, startLoadDeleteProduct, endLoadDeleteProduct, errorDeleteProduct,
  total, discountedTotal, totalProducts, totalQuantity,
  addProduct, startLoadAddProduct, endLoadAddProduct, errorAddProduct,
  deleteAllProducts, startLoadDeleteAllProducts, endLoadDeleteAllProducts, errorDeleteAllProducts,
  plusProduct, startLoadPlusProduct, endLoadPlusProduct, errorPlusProduct,
  minusProduct, startLoadMinusProduct, endLoadMinusProduct, errorMinusProduct,
  quantityProduct, startLoadQuantityProduct, endLoadQuantityProduct, errorQuantityProduct,
} = storeCart.actions;

export default storeCart.reducer;
