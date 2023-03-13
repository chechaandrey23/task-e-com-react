import {take, call, put, select, delay} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {createSagas, createActions} from './saga.js';

import {login, startLoadLogin, endLoadLogin, errorLogin,
        logout, startLoadLogout, endLoadLogout, errorLogout,
        registration, startLoadRegistration, endLoadRegistration, errorRegistration,
        startLoadLoginGoogle, endLoadLoginGoogle,
        startLoadLoginGithub, endLoadLoginGithub,
        user, firstCheckAuth} from "../auth.js";

import {fbAuth, googleProvider, gitHubProvider} from '../../firebase.js';

import {createUserWithEmailAndPassword,
        onAuthStateChanged,
        signInWithEmailAndPassword, signOut, getAuth,
        GoogleAuthProvider, GithubAuthProvider, signInWithPopup} from 'firebase/auth';

function* loginSaga({payload = {}}) {
	try {
		yield put(startLoadLogin());
    const res = yield call(signInWithEmailAndPassword, fbAuth, payload.email, payload.password);
    console.log(res);
    yield put(user(res.user));
    yield put(login(true));
    yield put(logout(false));
	} catch(e) {
    console.error(e);
		yield put(errorLogin(e));
	} finally {
		yield put(endLoadLogin());
	}
}

function* logoutSaga({payload = {}}) {
  try {
    yield put(startLoadLogout());
  	const res = yield call(signOut, fbAuth);
    console.log(res);
    yield put(logout(true));
    yield put(login(false));
  } catch(e) {
    console.error(e);
    yield put(errorLogout(e));
  } finally {
    yield put(endLoadLogout());
  }
}

function* registrationSaga({payload = {}}) {
	try {
		yield put(startLoadRegistration());
    const res = yield call(createUserWithEmailAndPassword, fbAuth, payload.email, payload.password);
    console.log(res);
    yield put(user(res.user));
    yield put(login(true));
    yield put(logout(false));
		yield put(registration(true));
	} catch(e) {
		console.error(e);
		yield put(errorRegistration(e));
	} finally {
		yield put(endLoadRegistration());
	}
}

function authStateChangedChannel() {
  const subscribe = (emitter) => {
    const unsubscribe = fbAuth.onAuthStateChanged((user) => {emitter.call(null, user || {fakeObject: true})});
  	return () => {
			unsubscribe();
		}
	};
	return eventChannel(subscribe);
}

function* authStateChangedSaga() {
	const channel = yield call(authStateChangedChannel);

  const o = {first: true};

	while (true) {
    const res = yield take(channel);
    console.log(res);
    if(res && res.providerId == 'firebase') {
      // user change state
      yield put(user(res));
      yield put(login(true));
      yield put(logout(false));
    } else {
      // logout
      yield put(logout(true));
      yield put(login(false));
    }

    if(o.first) {
      yield put(firstCheckAuth(true));
      o.first = false;
    }
	}
}

function* getUserSaga() {
  const user = yield call(() => {
    return new Promise((res, rej) => {
      const unsubscribe = fbAuth.onAuthStateChanged(user => {
        unsubscribe();
        res(user);
       }, rej);
    });
  });
  console.log(user);
  if(user) {
    yield put(user(user));
    yield put(login(true));
    yield put(logout(false));
  } else {
    yield put(logout(true));
    yield put(login(false));
  }
}

function* loginWithGoogleSaga({payload = {}}) {
	try {
		yield put(startLoadLoginGoogle());
    const res = yield call(signInWithPopup, fbAuth, googleProvider);
    console.log(res);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    yield put(user(res.user));
    yield put(login(true));
    yield put(logout(false));
	} catch(e) {
    console.error(e);
    const credential = GoogleAuthProvider.credentialFromError(e);
		yield put(errorLogin(e));
	} finally {
		yield put(endLoadLoginGoogle());
	}
}

function* loginWithGithubSaga({payload = {}}) {
	try {
		yield put(startLoadLoginGithub());
    const res = yield call(signInWithPopup, fbAuth, gitHubProvider);
    console.log(res);
    const credential = GithubAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    yield put(user(res.user));
    yield put(login(true));
    yield put(logout(false));
	} catch(e) {
    console.error(e);
    const credential = GithubAuthProvider.credentialFromError(e);
		yield put(errorLogin(e));
	} finally {
		yield put(endLoadLoginGithub());
	}
}

const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_REGISTRATION = 'AUTH_REGISTRATION';
const AUTH_STATE_CHANGED = 'AUTH_STATE_CHANGED';
const AUTH_GET_USER = 'AUTH_GET_USER';
const AUTH_LOGIN_GOOGLE = 'AUTH_LOGIN_GOOGLE';
const AUTH_LOGIN_GITHUB = 'AUTH_LOGIN_GITHUB';

export const authSagas = createSagas([
	[AUTH_LOGIN, loginSaga],
  [AUTH_LOGOUT, logoutSaga],
  [AUTH_REGISTRATION, registrationSaga],
  authStateChangedSaga,
  [AUTH_GET_USER, getUserSaga],
  [AUTH_LOGIN_GOOGLE, loginWithGoogleSaga],
  [AUTH_LOGIN_GITHUB, loginWithGithubSaga]
]);

export const {sagaLogin, sagaLogout, sagaRegistration, sagaGetUser, sagaLoginGoogle, sagaLoginGithub} = createActions({
	sagaLogin: AUTH_LOGIN,
	sagaLogout: AUTH_LOGOUT,
	sagaRegistration: AUTH_REGISTRATION,
  sagaGetUser: AUTH_GET_USER,
  sagaLoginGoogle: AUTH_LOGIN_GOOGLE,
  sagaLoginGithub: AUTH_LOGIN_GITHUB,
});
