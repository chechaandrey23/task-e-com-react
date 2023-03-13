import {createSlice} from '@reduxjs/toolkit'

//import Paginator from './helpers/Paginator.js'

export const storeAuth = createSlice({
	name: 'auth',
	initialState: {
    login: false,
		loadLogin: false,
		errorLogin: false,
    logout: false,
		loadLogout: false,
		errorLogout: false,
    auth: false,
    registration: false,
    loadRegistration: false,
    errorRegistration: false,
    user: null,
    loadLoginGoogle: false,
    loadLoginGithub: false,

    firstCheckAuth: false,
	},
	reducers: {
    login(state, action) {
			state.login = action.payload;
		},
		startLoadLogin(state, action) {
			state.loadLogin = true;
		},
		endLoadLogin(state, action) {
			state.loadLogin = false;
		},
		errorLogin(state, action) {
			state.errorLogin = action.payload;
		},
    logout(state, action) {
			state.logout = action.payload;
		},
		startLoadLogout(state, action) {
			state.loadLogout = true;
		},
		endLoadLogout(state, action) {
			state.loadLogout = false;
		},
		errorLogout(state, action) {
			state.errorLogout = action.payload;
		},
    auth(state, action) {
      state.auth = action.payload;
      if(action.payload) {
        state.login = true;
        state.logout = false;
      } else {
        state.login = false;
        state.logout = true;
      }
    },
    registration(state, action) {
			state.registration = action.payload;
		},
		startLoadRegistration(state, action) {
			state.loadRegistration = true;
		},
		endLoadRegistration(state, action) {
			state.loadRegistration = false;
		},
		errorRegistration(state, action) {
			state.errorRegistration = action.payload;
		},
		user(state, action) {
			state.user = {...action.payload};
		},
    startLoadLoginGoogle(state, action) {
			state.loadLoginGoogle = true;
		},
		endLoadLoginGoogle(state, action) {
			state.loadLoginGoogle = false;
		},
    startLoadLoginGithub(state, action) {
			state.loadLoginGithub = true;
		},
		endLoadLoginGithub(state, action) {
			state.loadLoginGithub = false;
		},
    firstCheckAuth(state, action) {
      state.firstCheckAuth = !!action.payload;
    }
	}
});

export const {login, startLoadLogin, endLoadLogin, errorLogin,
              logout, startLoadLogout, endLoadLogout, errorLogout,
              registration, startLoadRegistration, endLoadRegistration, errorRegistration,
              startLoadLoginGoogle, endLoadLoginGoogle,
              startLoadLoginGithub, endLoadLoginGithub,
              auth, user, firstCheckAuth} = storeAuth.actions;

export default storeAuth.reducer;
