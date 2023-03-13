import {take, call, put, select, delay} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {createSagas, createActions} from './saga.js';

import {request} from './helpers/helper.request.js';

import {
  products, startLoadProducts, endLoadProducts, errorProducts,
  countProducts, countIdsProducts, countDataProducts, startLoadCountProducts, endLoadCountProducts, errorLoadCountProducts,
  deleteProduct, startLoadDeleteProduct, endLoadDeleteProduct, errorDeleteProduct,
  total, discountedTotal, totalProducts, totalQuantity,
  addProduct, startLoadAddProduct, endLoadAddProduct, errorAddProduct,
  deleteAllProducts, startLoadDeleteAllProducts, endLoadDeleteAllProducts, errorDeleteAllProducts,
  plusProduct, startLoadPlusProduct, endLoadPlusProduct, errorPlusProduct,
  minusProduct, startLoadMinusProduct, endLoadMinusProduct, errorMinusProduct,
  quantityProduct, startLoadQuantityProduct, endLoadQuantityProduct, errorQuantityProduct,
} from '../cart.js';

function prepareProducts(products) {
  return products.map((entry) => {
    return {id: entry.id, count: entry.quantity}
  });
}

function* cartProductsSaga({payload = {}}) {
  try {
		yield put(startLoadProducts());
    const cart = yield select((state) => state.cart.cart);
    const count = cart.getCount();

    if(count > 0) {
      const res = yield call(request, {
        method: 'GET',
        responseType: 'json',
        url: 'https://dummyjson.com/carts/1',
        params: {limit: 100},
      });
      //yield delay(1500);
      yield put(products(res.data.products));

      cart.erase();
      cart.addMore(prepareProducts(res.data.products));

      yield put(total(res.data.total));
      yield put(discountedTotal(res.data.discountedTotal));
      yield put(totalProducts(res.data.totalProducts));
      yield put(totalQuantity(res.data.totalQuantity));
    } else {
      yield delay(1500);
      yield put(products([]));

      cart.erase();

      yield put(total(0));
      yield put(discountedTotal(0));
      yield put(totalProducts(0));
      yield put(totalQuantity(0));
    }
    const {count: newCount, ids, data: shortData} = cart.gets();
    yield put(countProducts(newCount));
    yield put(countDataProducts(shortData));
    yield put(countIdsProducts(ids));
	} catch(e) {
    console.error(e);
		yield put(errorProducts(e));
	} finally {
		yield put(endLoadProducts());
	}
}

function* cartCountProductsSaga({payload = {}}) {
  try {
		yield put(startLoadCountProducts());

    const cart = yield select((state) => state.cart.cart);
    const {count, ids, data: shortData} = cart.gets();
    yield delay(1500);
    yield put(countProducts(count));
    yield put(countDataProducts(shortData));
    yield put(countIdsProducts(ids));
  } catch(e) {
    console.error(e);
		yield put(errorCountProducts(e));
	} finally {
		yield put(endLoadCountProducts());
	}
}

function _calcItem(products, id, fn) {// fn: {quantity, discountedPrice, total}
  let newProduct = null;
  const newProducts = products.map((entry) => {// discountedPrice, total
    if(entry.id == id) {
      const o = {...entry};
      const res = fn(entry);
      o.quantity = res.quantity || 0;
      o.total = res.total || 0;
      o.discountedPrice = res.discountedPrice || 0;
      newProduct = o;
      return o;
    } else {
      return entry;
    }
  });
  return {product: newProduct, more: _calcAll(newProducts)};
}

function _calcAll(products) {
  const acc = products.reduce((acc, item) => {
    acc.total += item.total;
    acc.totalQuantity += item.quantity;
    acc.totalProducts += 1;
    acc.discountedTotal += item.discountedPrice;
    return acc;
  }, {total: 0, discountedTotal: 0, totalProducts: 0, totalQuantity: 0});
  return acc;
}

function* cartDeleteProductSaga({payload = {}}) {
  try {
		yield put(startLoadDeleteProduct(payload.id));
    const cart = yield select((state) => state.cart.cart);
    cart.remove(payload.id);
    const {count, ids, data: shortData} = cart.gets();
    yield delay(1500);
    yield put(countProducts(count));
    yield put(countDataProducts(shortData));
    yield put(countIdsProducts(ids));
		yield put(deleteProduct(payload));

    const products = yield select((state) => state.cart.products);
    const acc = _calcAll(products);
    console.log(acc);
    yield put(total(acc.total));
    yield put(discountedTotal(acc.discountedTotal));
    yield put(totalProducts(acc.totalProducts));
    yield put(totalQuantity(acc.totalQuantity));
	} catch(e) {
		console.error(e);
		yield put(errorDeleteProduct(e));
	} finally {
		yield put(endLoadDeleteProduct(payload.id));
	}
}

function* cartAddProductSaga({payload = {}}) {// id,
  try {
		yield put(startLoadAddProduct(payload.id));
    const cart = yield select((state) => state.cart.cart);
    cart.add(payload.id, 1);
    const {count, ids, data: shortData} = cart.gets();
    yield delay(1500);
    yield put(countProducts(count));
    yield put(countDataProducts(shortData));
    yield put(countIdsProducts(ids));
		yield put(addProduct());
	} catch(e) {
		console.error(e);
		yield put(errorAddProduct(e));
	} finally {
		yield put(endLoadAddProduct(payload.id));
	}
}

function* cartDeleteAllProductsSaga({payload = {}}) {console.log(payload.ids)
  try {
		yield put(startLoadDeleteAllProducts(payload.ids || []));
    const cart = yield select((state) => state.cart.cart);
    if(payload.ids) {
      cart.removeAll(payload.ids);
    } else {
      cart.erase();
    }
    const {count, ids, data: shortData} = cart.gets();
    yield delay(1500);
    yield put(countProducts(count));
    yield put(countDataProducts(shortData));
    yield put(countIdsProducts(ids));
		yield put(deleteAllProducts(payload.ids));

    const products = yield select((state) => state.cart.products);
    const acc = _calcAll(products);
    console.log(acc);
    yield put(total(acc.total));
    yield put(discountedTotal(acc.discountedTotal));
    yield put(totalProducts(acc.totalProducts));
    yield put(totalQuantity(acc.totalQuantity));
	} catch(e) {
		console.error(e);
		yield put(errorDeleteAllProducts(e));
	} finally {
		yield put(endLoadDeleteAllProducts(payload.ids || []));
	}
}

function* cartPlusQuantityProductsSaga({payload = {}}) {
  try {
		yield put(startLoadPlusProduct(payload.id));
    const cart = yield select((state) => state.cart.cart);
    cart.add(payload.id, 1);
    const {count, ids, data: shortData} = cart.gets();

    const products = yield select((state) => state.cart.products);
    const acc = _calcItem(products, payload.id, (entry) => {
      const quantity = entry.quantity + 1;
      const total = quantity * entry.price;
      const discountedPrice = (100 - entry.discountPercentage) * total / 100;
      return {quantity, discountedPrice, total}
    });
    console.log(acc);

    yield delay(1500);
    yield put(countProducts(count));
    yield put(countDataProducts(shortData));
    yield put(countIdsProducts(ids));
    yield put(plusProduct(acc.product));

    yield put(total(acc.more.total));
    yield put(discountedTotal(acc.more.discountedTotal));
    yield put(totalProducts(acc.more.totalProducts));
    yield put(totalQuantity(acc.more.totalQuantity));
	} catch(e) {
		console.error(e);
		yield put(errorPlusProduct(e));
	} finally {
		yield put(endLoadPlusProduct(payload.id));
	}
}

function* cartMinusQuantityProductsSaga({payload = {}}) {
  try {
		yield put(startLoadMinusProduct(payload.id));
    const cart = yield select((state) => state.cart.cart);
    cart.setCountIncrement(payload.id);
    const {count, ids, data: shortData} = cart.gets();

    const products = yield select((state) => state.cart.products);
    const acc = _calcItem(products, payload.id, (entry) => {
      const quantity = entry.quantity < 2?1:entry.quantity - 1;
      const total = quantity * entry.price;
      const discountedPrice = (100 - entry.discountPercentage) * total / 100;
      return {quantity, discountedPrice, total}
    });
    console.log(acc);

    yield delay(1500);
    yield put(countProducts(count));
    yield put(countDataProducts(shortData));
    yield put(countIdsProducts(ids));
    yield put(minusProduct(acc.product));

    yield put(total(acc.more.total));
    yield put(discountedTotal(acc.more.discountedTotal));
    yield put(totalProducts(acc.more.totalProducts));
    yield put(totalQuantity(acc.more.totalQuantity));
	} catch(e) {
		console.error(e);
		yield put(errorMinusProduct(e));
	} finally {
		yield put(endLoadMinusProduct(payload.id));
	}
}

function* cartQuantityProductsSaga({payload = {}}) {
  try {
		yield put(startLoadQuantityProduct(payload.id));
    const cart = yield select((state) => state.cart.cart);
    cart.setCount(payload.id, payload.quantity);
    const {count, ids, data: shortData} = cart.gets();

    const products = yield select((state) => state.cart.products);
    const acc = _calcItem(products, payload.id, (entry) => {
      const quantity = payload.quantity;
      const total = quantity * entry.price;
      const discountedPrice = (100 - entry.discountPercentage) * total / 100;
      return {quantity, discountedPrice, total}
    });
    console.log(acc);

    yield delay(1500);
    yield put(countProducts(count));
    yield put(countDataProducts(shortData));
    yield put(countIdsProducts(ids));
    yield put(quantityProduct(acc.product));

    yield put(total(acc.more.total));
    yield put(discountedTotal(acc.more.discountedTotal));
    yield put(totalProducts(acc.more.totalProducts));
    yield put(totalQuantity(acc.more.totalQuantity));
	} catch(e) {
		console.error(e);
		yield put(errorQuantityProduct(e));
	} finally {
		yield put(endLoadQuantityProduct(payload.id));
	}
}

const CART_FETCH_PRODUCTS = 'CART_FETCH_PRODUCTS';
const CART_FETCH_COUNT_PRODUCTS = 'CART_FETCH_COUNT_PRODUCTS';
const CART_DELETE_PRODUCT = 'CART_DELETE_PRODUCT';
const CART_ADD_PRODUCT = 'CART_ADD_PRODUCT';
const CART_PLUS_PRODUCT = 'CART_PLUS_PRODUCT';
const CART_MINUS_PRODUCT = 'CART_MINUS_PRODUCT';
const CART_QUANTITY_PRODUCT = 'CART_QUANTITY_PRODUCT';
const CART_DELETE_ALL_PRODUCTS = 'CART_DELETE_ALL_PRODUCTS';

export const cartSagas = createSagas([
	[CART_FETCH_PRODUCTS, cartProductsSaga],
	[CART_FETCH_COUNT_PRODUCTS, cartCountProductsSaga],
	[CART_DELETE_PRODUCT, cartDeleteProductSaga],
  [CART_ADD_PRODUCT, cartAddProductSaga],
  [CART_PLUS_PRODUCT, cartPlusQuantityProductsSaga],
  [CART_MINUS_PRODUCT, cartMinusQuantityProductsSaga],
  [CART_QUANTITY_PRODUCT, cartQuantityProductsSaga],
  [CART_DELETE_ALL_PRODUCTS, cartDeleteAllProductsSaga]
]);

export const {sagaCartProducts, sagaCartCountProducts, sagaCartDeleteProduct,
              sagaCartPlusProduct, sagaCartMinusProduct, sagaCartQuantityProduct,
              sagaCartAddProduct, sagaCartDeleteAllProducts} = createActions({
	sagaCartProducts: CART_FETCH_PRODUCTS,
	sagaCartCountProducts: CART_FETCH_COUNT_PRODUCTS,
	sagaCartDeleteProduct: CART_DELETE_PRODUCT,
  sagaCartAddProduct: CART_ADD_PRODUCT,
  sagaCartPlusProduct: CART_PLUS_PRODUCT,
  sagaCartMinusProduct: CART_MINUS_PRODUCT,
  sagaCartQuantityProduct: CART_QUANTITY_PRODUCT,
  sagaCartDeleteAllProducts: CART_DELETE_ALL_PRODUCTS
});
