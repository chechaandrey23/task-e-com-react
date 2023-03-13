import {take, call, put, select, delay} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {createSagas, createActions} from './saga.js';

import {request} from './helpers/helper.request.js';

import {
  orders, startLoadOrders, endLoadOrders, errorOrders,
  moreOrders, startLoadMoreOrders, endLoadMoreOrders, errorMoreOrders,
} from '../orders.js';

function _slice(list, page) {
  return list.slice((page-1)*10, ((page-1)*10)+10);
}

function _sliceFirst(list, page) {
  return list.slice(0, ((page-1)*10)+10);
}

function* ordersSaga({payload = {}}) {
  try {
		yield put(startLoadOrders());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/carts',
      params: {limit: 100},
    });
    console.log(res);
    let data = res.data.carts;
    data = _sliceFirst(data, payload.page || 1);
    yield put(orders(data));
    //yield put(orders([]));
	} catch(e) {
    console.error(e);
		yield put(errorOrders(e));
	} finally {
		yield put(endLoadOrders());
	}
}

function* moreOrdersSaga({payload = {}}) {console.log("SAGA PAGE: "+payload.page);
  try {
		yield put(startLoadMoreOrders());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/carts',
      params: {limit: 100},
    });
    console.log(res);
    let data = res.data.carts;
    data = _slice(data, payload.page || 1);
    yield put(moreOrders(data));
	} catch(e) {
    console.error(e);
		yield put(errorMoreOrders(e));
	} finally {
		yield put(endLoadMoreOrders());
	}
}

const FETCH_MORE_ORDERS = 'FETCH_MORE_ORDERS';
const FETCH_ORDERS = 'FETCH_ORDERS';

export const ordersSagas = createSagas([
	[FETCH_MORE_ORDERS, moreOrdersSaga],
	[FETCH_ORDERS, ordersSaga],
]);

export const {sagaMoreOrders, sagaOrders} = createActions({
	sagaMoreOrders: FETCH_MORE_ORDERS,
	sagaOrders: FETCH_ORDERS,
});
