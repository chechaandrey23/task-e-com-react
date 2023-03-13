import {React, useState, useRef, useEffect, useLayoutEffect} from 'react';
import {Grid, Box, Paper, Button, IconButton, Typography, AppBar, Toolbar, Tooltip,
        Badge} from '@mui/material';
import {NavLink, useMatches, useNavigate} from "react-router-dom";
import {Cottage as CottageIcon, ViewList as ViewListIcon, ShoppingCart as ShoppingCartIcon,
        ExitToApp as ExitToAppIcon, Login as LoginIcon, AccountBox as AccountBoxIcon,
        ShoppingCartOutlined as ShoppingCartOutlinedIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {useSnackBarError} from '../hooks/useSnackBarError.jsx';

import {sagaCartCountProducts} from '../redux/saga/cart.js';

import {CartGuestModal} from './CartGuestModal';

export function CartBar() {
  const dispatch = useDispatch();

  const logout = useSelector((state) => state.auth.logout);
  const login = useSelector((state) => state.auth.login);

  const countProducts = useSelector((state) => state.cart.countProducts);
  const countDataProducts = useSelector((state) => state.cart.countDataProducts);

  const loadCountProducts = useSelector((state) => state.cart.loadCountProducts);
  const errorCountProducts = useSelector((state) => state.cart.errorCountProducts);

  const [match] = useMatches();

  useEffect(() => {
    if(login && !logout) {
      if(match.pathname!="/cart") {
        dispatch(sagaCartCountProducts());
      }
    }
  }, [login, logout]);

  const {snackBarError} = useSnackBarError();

  useEffect(() => {
    snackBarError(errorCountProducts);
  }, [errorCountProducts]);

  const [openGuestCartModal, setOpenGuestCartModal] = useState(false);

  return (<>
    <Tooltip title={'Cart'} arrow={true}>
      {(login && !logout)?<IconButton component={NavLink} to='/cart'
                  edge="start"
                  size="large"
                  color={match.pathname=="/cart"?"success":"secondary"}>
        <Badge showZero={!!countProducts}
               name="badge1"
               badgeContent={loadCountProducts?'...':countProducts}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
              }} color="warning">
        <Badge showZero={!!countProducts}
               name="badge2"
               badgeContent={loadCountProducts
                 ?'...'
                 :countDataProducts.reduce((acc, entry) => {acc += entry.count; return acc;}, 0)}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'right',
              }} color="info">
          {countProducts>0?
            <ShoppingCartIcon color={match.pathname=="/cart"?"success":"secondary"} sx={{width: 32, height: 32}} />:
            <ShoppingCartOutlinedIcon color={match.pathname=="/cart"?"success":"secondary"} sx={{width: 32, height: 32}} />}
        </Badge>
        </Badge>
      </IconButton>:<><IconButton size="large"
                                edge="start"
                                onClick={() => {setOpenGuestCartModal(true);}}
                                color={match.pathname=="/cart"?"success":"secondary"}>
        <ShoppingCartOutlinedIcon color="inherit" sx={{width: 32, height: 32}} />
      </IconButton>{openGuestCartModal?<CartGuestModal onClose={() => {setOpenGuestCartModal(false);}} />:null}</>}
    </Tooltip>
  </>);
}
