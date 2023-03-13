import {createSlice} from '@reduxjs/toolkit'

import {PaginatorGets} from './helpers/PaginatorGets.js'

export const storeOrders = createSlice({
	name: 'orders',
	initialState: {
    paginator: new PaginatorGets(10),

    orders: [],
    loadOrders: false,
    errorOrders: false,
    loadMoreOrders: false,
    errorMoreOrders: false,
	},
	reducers: {
    orders(state, action) {
      state.paginator.add(state, 'orders', action.payload);
    },
    startLoadOrders(state, action) {
      state.loadOrders = true;
    },
    endLoadOrders(state, action) {
      state.loadOrders = false;
    },
    errorOrders(state, action) {
      state.errorOrders = action.payload;
    },
    moreOrders(state, action) {
      state.paginator.addWithReplace(
        state, 'orders', action.payload, (newItem, currItem) => currItem.id == newItem.id
      );
    },
    startLoadMoreOrders(state, action) {
      state.loadMoreOrders = true;
    },
    endLoadMoreOrders(state, action) {
      state.loadMoreOrders = false;
    },
    errorMoreOrders(state, action) {
      state.errorMoreOrders = action.payload;
    },
	}
});

export const {
  orders, startLoadOrders, endLoadOrders, errorOrders,
  moreOrders, startLoadMoreOrders, endLoadMoreOrders, errorMoreOrders,
} = storeOrders.actions;

export default storeOrders.reducer;
