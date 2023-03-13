import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Grid, Box, Paper, Typography, Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia,
        Tooltip, IconButton, Fab, TextField, Button, Alert, Skeleton} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {ProductionQuantityLimits as ProductionQuantityLimitsIcon,
        AddCircleOutline as AddCircleOutlineIcon, RemoveCircleOutline as RemoveCircleOutlineIcon,
        ShoppingBag as ShoppingBagIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon,
        RemoveShoppingCart as RemoveShoppingCartIcon, ReplyAll as ReplyAllIcon,
        ShoppingCart as ShoppingCartIcon} from '@mui/icons-material';
import {useNavigate, NavLink} from "react-router-dom";
import {LoadingButton} from '@mui/lab';
import {Save as SaveIcon} from '@mui/icons-material';
import {useSnackBarError} from '../hooks/useSnackBarError.jsx';

import {useFirst} from '../hooks/useFirst.js';

import {sagaCartProducts, sagaCartCountProducts,
        sagaCartAddProduct, sagaCartDeleteProduct,
        sagaCartDeleteAllProducts} from '../redux/saga/cart.js';

import {CartItem} from './CartItem';
import {CartEmpty} from './CartEmpty';
import {CartItemSkeleton} from './CartItemSkeleton';
import {CartBuyConfirm} from './CartBuyConfirm';

export function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useSelector((state) => state.auth.logout);
  const login = useSelector((state) => state.auth.login);

  const errorProducts = useSelector((state) => state.cart.errorProducts);
	const products = useSelector((state) => state.cart.products);
  const loadProducts = useSelector((state) => state.cart.loadProducts);
  const total = useSelector((state) => state.cart.total);
  const discountedTotal = useSelector((state) => state.cart.discountedTotal);

  const countProducts = useSelector((state) => state.cart.countProducts);

  const deletingProduct = useSelector((state) => state.cart.deletingProduct);
  const plusingProduct = useSelector((state) => state.cart.plusingProduct);
  const minusingProduct = useSelector((state) => state.cart.minusingProduct);
  const quantitingProduct = useSelector((state) => state.cart.quantitingProduct);

  const deletingAllProducts = useSelector((state) => state.cart.deletingAllProducts);

  const errorDeleteProduct = useSelector((state) => state.cart.errorDeleteProduct);
  const errorDeleteAllProducts = useSelector((state) => state.cart.errorDeleteAllProducts);
  const errorPlusProduct = useSelector((state) => state.cart.errorPlusProduct);
  const errorMinusProduct = useSelector((state) => state.cart.errorMinusProduct);
  const errorQuantityProduct = useSelector((state) => state.cart.errorQuantityProduct);

  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if(login && !logout) {
      dispatch(sagaCartProducts());
    }
  }, []);

  const {snackBarError} = useSnackBarError();

  useEffect(() => {
    snackBarError(errorProducts);
  }, [errorProducts]);

  useEffect(() => {
    snackBarError(errorDeleteProduct);
  }, [errorDeleteProduct]);

  useEffect(() => {
    snackBarError(errorDeleteAllProducts);
  }, [errorDeleteAllProducts]);

  useEffect(() => {
    snackBarError(errorPlusProduct);
  }, [errorPlusProduct]);

  useEffect(() => {
    snackBarError(errorMinusProduct);
  }, [errorMinusProduct]);

  useEffect(() => {
    snackBarError(errorQuantityProduct);
  }, [errorQuantityProduct]);

  const refFirst = useFirst();

  return (<Paper sx={{width: '100%', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Grid container sx={{maxWidth: 'lg'}}>
      <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2, pb: 2}}>
        <ShoppingCartIcon color="inherit" sx={{width: 32, height: 32}} />
        <Typography variant="h4" sx={{fontWeight: 'bold'}}>Cart</Typography>
      </Grid>
      <Grid item xs={12} sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {products.length == 0 && !loadProducts && !refFirst.current?<CartEmpty />:null}
      </Grid>
      <Grid item xs={12}>
        {(loadProducts || refFirst.current)?null:products.map((entry) => {
          if(deletingAllProducts.includes(entry.id)) return <CartItemSkeleton key={entry.id} />
          return (<CartItem key={entry.id}
                            id={entry.id}
                            title={entry.title}
                            quantity={entry.quantity}
                            price={entry.price}
                            discountPercentage={entry.discountPercentage}
                            total={entry.total}
                            discountedPrice={entry.discountedPrice}/>);
        })}
        {(loadProducts || refFirst.current)?([1,2,3,4,5]).map((item) => {
          return <CartItemSkeleton key={item} />
        }):null}
      </Grid>
      <Grid item xs={4} sm={4} sx={{display: {md: 'none', xs: 'flex', sm: 'flex'}}}>
        <Grid container>
          <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', pl: 1}}>
            <DeleteAllButton />
          </Grid>
          <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', pl: 1}}>
            <ShopButton />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={3} sx={{display: {md: 'flex', xs: 'none', sm: 'none'},
                                     alignItems: 'center', justifyContent: 'center', pt: 2, pb: 2}}>
        <DeleteAllButton />
      </Grid>
      <Grid item xs={12} sm={12} md={3} sx={{display: {md: 'flex', xs: 'none', sm: 'none'},
                                           alignItems: 'center', justifyContent: 'center', pt: 2, pb: 2}}>
        <ShopButton />
      </Grid>
      <Grid item xs={8} sm={8} md={6} sx={{pt: 2, pb: 2, pr: 0.5}}>
        <Alert severity="success" icon={false}
               sx={{width: 'inherit', height: 'inherit', padding: '0px!important', border: '1px solid green'}}>
        <Grid container sx={{pt: 3, pb: 3}}>
          <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
            <Grid container>
              <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', pl: 1}}>
                <Typography color={products.length === 0?'text.disabled':"secondary"} sx={{textDecorationLine: 'line-through'}} variant="h6">
                  {(loadProducts || refFirst.current)
                    ?<Skeleton variant="text" sx={{fontSize: '1.8rem', width: 75}} />
                    :(total).toFixed(2)+'$'}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', pl: 1}}>
                <Typography variant="h4" sx={{color: products.length === 0?'text.disabled':'green', fontWeight: 'bold'}}>
                  {(loadProducts || refFirst.current)
                    ?<Skeleton variant="text" sx={{fontSize: '2rem', width: 100}} />
                    :(discountedTotal).toFixed(2)+'$'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button color="success" variant="contained" size="large"
                    disabled={(() => {
                      if(loadProducts || refFirst.current) return true;
                      if(deletingAllProducts.length > 0) return true;
                      if(deletingProduct.length > 0 ||
                        plusingProduct.length > 0 ||
                        minusingProduct.length > 0 ||
                        quantitingProduct.length > 0) return true;
                      return products.length === 0;
                    })()}
                    onClick={() => {setOpenConfirm(true)}}
                    startIcon={<ShoppingBagIcon color="inherit" sx={{width: 32, height: 32}} />}>
              <Typography color="inherit" variant="h4">Take</Typography>
            </Button>
            {openConfirm?<CartBuyConfirm onClose={() => {setOpenConfirm(false)}}
                                         onSuccess={() => {
                                           setOpenConfirm(false);
                                           navigate('/account');
                                         }}/>:null}
          </Grid>
        </Grid>
        </Alert>
      </Grid>
    </Grid>
  </Paper>);
}

function DeleteAllButton() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart.products);
  const loadProducts = useSelector((state) => state.cart.loadProducts);

  const deletingProduct = useSelector((state) => state.cart.deletingProduct);
  const plusingProduct = useSelector((state) => state.cart.plusingProduct);
  const minusingProduct = useSelector((state) => state.cart.minusingProduct);
  const quantitingProduct = useSelector((state) => state.cart.quantitingProduct);

  const deletingAllProducts = useSelector((state) => state.cart.deletingAllProducts);

  return (<>{!(deletingAllProducts.length>0)?<Button color="error" variant="contained" size="large"
                  disabled={(() => {
                    if(loadProducts) return true;
                    if(deletingAllProducts.length > 0) return true;
                    if(deletingProduct.length > 0 ||
                      plusingProduct.length > 0 ||
                      minusingProduct.length > 0 ||
                      quantitingProduct.length > 0) return true;
                    return products.length === 0;
                  })()}
                  onClick={() => {dispatch(sagaCartDeleteAllProducts({
                    ids: products.map((entry) => {return entry.id})
                  }))}}
                  startIcon={<RemoveShoppingCartIcon color="inherit" sx={{width: 32, height: 32}} />}>
    <Typography color="inherit" variant="h6">Erase</Typography>
  </Button>:<LoadingButton loading
                           size="large"
                           loadingPosition="start"
                           startIcon={<SaveIcon color="inherit" sx={{width: 32, height: 32}} />}
                           variant="outlined">
    <Typography variant="h6">
      {'Erasing...'}
    </Typography>
  </LoadingButton>}</>);
}

function ShopButton() {
  return (<Button color="primary" variant="outlined" size="large"
                  onClick={() => {history.back();}}
                  startIcon={<ReplyAllIcon color="inherit" sx={{width: 32, height: 32}} />}>
    <Typography color="inherit" variant="h6">back</Typography>
  </Button>);
}
