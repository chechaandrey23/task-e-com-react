import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {SnackbarProvider, useSnackbar} from 'notistack';

import store from './redux/store.js';
import {App} from './App';

import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <SnackbarProvider maxSnack={10}>
        <App />
      </SnackbarProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
