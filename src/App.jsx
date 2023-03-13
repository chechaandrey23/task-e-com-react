import React, {Component} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Container, CssBaseline} from '@mui/material';

import './App.css';

import {HomePage} from './pages/HomePage';
import {ErrorPage} from './pages/ErrorPage';
import {AccountPage} from './pages/AccountPage';
import {CartPage} from './pages/CartPage';
import {AuthorizationPage} from './pages/AuthorizationPage';
import {RegistrationPage} from './pages/RegistrationPage';
import {ProductsPage} from './pages/ProductsPage';
import {ProductPage} from './pages/ProductPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <AccountPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/authorization',
    element: <AuthorizationPage />
  },
  {
    path: '/registration',
    element: <RegistrationPage />
  },
  {
    path: '/products',
    element: <ProductsPage />
  },
  {
    path: '/products/category/:category',
    element: <ProductsPage />
  },
  {
    path: '/product/:id',
    element: <ProductPage />
  },
]);

export function App() {
  return (<>
    <CssBaseline />
    <Container maxWidth={false} sx={{pl: {xs: 1, sm: 1}, pr: {xs: 1, sm: 1}, overflowX: 'hidden'}}>
      <RouterProvider router={router} />
    </Container>
  </>);
}
