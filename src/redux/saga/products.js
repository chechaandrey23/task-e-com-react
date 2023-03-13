import {take, call, put, select, delay} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {createSagas, createActions} from './saga.js';

import {request} from './helpers/helper.request.js';

import {
  products, startLoadProducts, endLoadProducts, errorProducts,
  moreProducts, startLoadMoreProducts, endLoadMoreProducts, errorLoadMoreProducts,
  categories, startLoadCategories, endLoadCategories, errorCategories,
  product, startLoadProduct, endLoadProduct, errorProduct,
  shortProducts, startLoadShortProducts, endLoadShortProducts, errorShortProducts,
} from '../products.js';

function _slice(list, page) {
  return list.slice((page-1)*20, ((page-1)*20)+20);
}

function _sliceFirst(list, page) {
  return list.slice(0, ((page-1)*20)+20);
}

function _filterCats(list, cats) {
  return list.filter((entry) => {
    return cats.includes(entry.category);
  });
}

function _filterPricies(list, price1, price2) {
  return list.filter((entry) => {
    return entry.price >= price1 && entry.price <= price2;
  });
}

function _sort(list, field, type) {
  if(field == 'price' || field == 'rating') {
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

function* productsSaga({payload = {}}) {
  try {
		yield put(startLoadProducts());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/products'+(payload.category?'/category/'+payload.category:''),
      params: {limit: 100},
    });
    let data = res.data.products;
    if(payload.categories) data = _filterCats(data, payload.categories);
    if(payload.pricies) data = _filterPricies(data, payload.pricies[0] * 1, payload.pricies[1] * 1);
    if(payload.sorting) data = _sort(data, payload.sorting[0], payload.sorting[1]);
    data = _sliceFirst(data, payload.page || 1);
    yield put(products(data));
	} catch(e) {
    console.error(e);
		yield put(errorProducts(e));
	} finally {
		yield put(endLoadProducts());
	}
}

function* moreProductsSaga({payload = {}}) {console.log("SAGA PAGE: "+payload.page);
  try {
		yield put(startLoadMoreProducts());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/products'+(payload.category?'/category/'+payload.category:''),
      params: {limit: 100},
    });
    let data = res.data.products;
    if(payload.categories) data = _filterCats(data, payload.categories);
    if(payload.pricies) data = _filterPricies(data, payload.pricies[0] * 1, payload.pricies[1] * 1);
    if(payload.sorting) data = _sort(data, payload.sorting[0], payload.sorting[1]);
    data = _slice(data, payload.page || 1);
    yield put(moreProducts(data));
	} catch(e) {
    console.error(e);
		yield put(errorMoreProducts(e));
	} finally {
		yield put(endLoadMoreProducts());
	}
}

function* shortProductsSaga({payload = {}}) {
  try {
		yield put(startLoadShortProducts());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/products'+(payload.category?'/category/'+payload.category:''),
      params: {limit: payload.limit || 10},
    });
    yield put(shortProducts(res.data.products));
	} catch(e) {
    console.error(e);
		yield put(errorShortProducts(e));
	} finally {
		yield put(endLoadShortProducts());
	}
}

function* productSaga({payload = {}}) {
  try {
		yield put(startLoadProduct());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/products/'+payload.id,
    });
    yield put(product(res.data));
	} catch(e) {
    console.error(e);
		yield put(errorProduct(e));
	} finally {
		yield put(endLoadProduct());
	}
}

function* categoriesSaga({payload = {}}) {
  try {
		yield put(startLoadCategories());
    const res = yield call(request, {
      method: 'GET',
      responseType: 'json',
      url: 'https://dummyjson.com/products/categories',
    });
    yield put(categories(res.data));
    //yield put(categories([]));
	} catch(e) {
    console.error(e);
		yield put(errorCategories(e));
	} finally {
		yield put(endLoadCategories());
	}
}

const FETCH_MORE_PRODUCTS = 'FETCH_MORE_PRODUCTS';
const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FETCH_PRODUCT = 'FETCH_PRODUCT';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const FETCH_SHORT_PRODUCTS = 'FETCH_SHORT_PRODUCTS';

export const productsSagas = createSagas([
	[FETCH_MORE_PRODUCTS, moreProductsSaga],
	[FETCH_PRODUCTS, productsSaga],
	[FETCH_PRODUCT, productSaga],
	[FETCH_CATEGORIES, categoriesSaga],
  [FETCH_SHORT_PRODUCTS, shortProductsSaga]
]);

export const {sagaMoreProducts, sagaProducts, sagaProduct, sagaCategories, sagaShortProducts} = createActions({
	sagaMoreProducts: FETCH_MORE_PRODUCTS,
	sagaProducts: FETCH_PRODUCTS,
	sagaProduct: FETCH_PRODUCT,
	sagaCategories: FETCH_CATEGORIES,
  sagaShortProducts: FETCH_SHORT_PRODUCTS,
});
