import { call, takeEvery, put, all, spawn, take, cancel } from 'redux-saga/effects';

import {homeSagas} from './home.js';
import {cartSagas} from './cart.js';
import {authSagas} from './auth.js';
import {productsSagas} from './products.js';
import {ordersSagas} from './orders.js';

// takeLatest
// takeLatest
export default function* rootSaga() {
	//yield fork(socketFetchSaga);
	const sagas = [
		...homeSagas,
		...cartSagas,
		...authSagas,
		...productsSagas,
		...ordersSagas,
	];

	yield all(sagas.map((o) => {
		return spawn(function *() {
			while(true) {
				try {
					if(o.pattern) {
						let lastTask
						while(true) {
							const action = yield take(o.pattern);
							// cancel is no-op if the task has already terminated
							if(lastTask) yield cancel(lastTask);
							//lastTask = yield fork(saga, ...args.concat(action));
							lastTask = yield call(o.saga, action);
						}
					} else {
						yield call(o);
					}
					break;
				} catch(e) {
					// error
					console.error(e);
					throw e;
				}
			}
		});
	}));
}

//{expName: constName}
export function createActions(obj) {
	return Object.keys(obj || {}).reduce((acc, key) => {
		acc[key] = ((constName) => {
			return (data) => ({type: constName, payload: data});
		})(obj[key]);

		return acc;
	}, {});
}

// constName, fn | fn
export function createSagas(arr) {
	return (Array.isArray(arr)?arr:[]).reduce((acc, value) => {
		if(typeof value === 'function') {
			acc.push(value);
		} else if(Array.isArray(value) && typeof value[1] === 'function') {
			acc.push({pattern: value[0]+'', saga: value[1]});
		}

		return acc;
	}, []);
}
