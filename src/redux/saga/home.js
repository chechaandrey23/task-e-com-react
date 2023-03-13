import {take, call, put, select, delay} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {createSagas, createActions} from './saga.js';

import {request} from './helpers/helper.request.js';

import {
  caruselProducts, startLoadCaruselProducts, endLoadCaruselProducts, errorCaruselProducts,
  ratingProducts, startLoadRatingProducts, endLoadRatingProducts, errorRatingProducts,
  interestProducts, startLoadInterestProducts, endLoadInterestProducts, errorInterestProducts,
} from '../home.js';

function _sliceFirst(list, page) {
  return list.slice(0, ((page-1)*20)+20);
}

function _sort(list, field, type) {
  if(field == 'price' || field == 'rating' || field == 'discountPercentage' || field == 'stock') {
    if(type == 'DESC') {
      return list.sort((a, b) => {return b[field] - a[field]});
    } else {// ASC
      return list.sort((a, b) => {return a[field] - b[field]});
    }
  } else if(field == 'title' || field == 'category' || field == 'brand') {
    if(type == 'DESC') {
      return list.sort((a, b) => {return (b[field] || '').toLowerCase().localeCompare((a[field] || '').toLowerCase())});
    } else {// ASC
      return list.sort((a, b) => {return (a[field] || '').toLowerCase().localeCompare((b[field] || '').toLowerCase())});
    }
  } else {
    throw new Error('Unknown Field: '+field);
  }
}

function* caruselProductsSaga({payload = {}}) {
  try {
		yield put(startLoadCaruselProducts());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/products'+(payload.category?'/category/'+payload.category:''),
      params: {limit: 100},
    });
    let data = res.data.products;
    data = _sort(data, 'discountPercentage', 'DESC');
    data = _sliceFirst(data, 1);
    yield put(caruselProducts(data));
	} catch(e) {
    console.error(e);
		yield put(errorCaruselProducts(e));
	} finally {
		yield put(endLoadCaruselProducts());
	}
}

function* ratingProductsSaga({payload = {}}) {
  try {
		yield put(startLoadRatingProducts());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/products'+(payload.category?'/category/'+payload.category:''),
      params: {limit: 100},
    });
    let data = res.data.products;
    data = _sort(data, 'rating', 'DESC');
    data = _sliceFirst(data, 1);
    yield put(ratingProducts(data));
	} catch(e) {
    console.error(e);
		yield put(errorRatingProducts(e));
	} finally {
		yield put(endLoadRatingProducts());
	}
}

function* interestProductsSaga({payload = {}}) {
  try {
		yield put(startLoadInterestProducts());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/products'+(payload.category?'/category/'+payload.category:''),
      params: {limit: 100},
    });
    let data = res.data.products;
    data = _sort(data, 'stock', 'DESC');
    data = _sliceFirst(data, 1);
    yield put(interestProducts(data));
	} catch(e) {
    console.error(e);
		yield put(errorInterestProducts(e));
	} finally {
		yield put(endLoadInterestProducts());
	}
}

const FETCH_CARUSEL_PRODUCTS = 'FETCH_CARUSEL_PRODUCTS';
const FETCH_RATING_PRODUCTS = 'FETCH_RATING_PRODUCTS';
const FETCH_INTEREST_PRODUCT = 'FETCH_INTEREST_PRODUCT';

export const homeSagas = createSagas([
	[FETCH_CARUSEL_PRODUCTS, caruselProductsSaga],
	[FETCH_RATING_PRODUCTS, ratingProductsSaga],
	[FETCH_INTEREST_PRODUCT, interestProductsSaga],
]);

export const {sagaCaruselProducts, sagaRatingProducts, sagaInterestProducts} = createActions({
	sagaCaruselProducts: FETCH_CARUSEL_PRODUCTS,
	sagaRatingProducts: FETCH_RATING_PRODUCTS,
	sagaInterestProducts: FETCH_INTEREST_PRODUCT,
});
