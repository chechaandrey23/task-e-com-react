import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import filterReduser from './filter.js';
import cartReduser from './cart.js';
import authReduser from './auth.js';
import productsReduser from './products.js';
import homeReduser from './home.js';
import ordersReduser from './orders.js';

import saga from "./saga/saga.js";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		home: homeReduser,
		filter: filterReduser,
		cart: cartReduser,
		auth: authReduser,
		products: productsReduser,
		orders: ordersReduser,
	},
	middleware: [...getDefaultMiddleware({thunk: false, serializableCheck: false}), sagaMiddleware]
});

sagaMiddleware.run(saga);

export default store;
