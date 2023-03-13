import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Grid, Box, Paper, Typography, Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia,
        Tooltip, IconButton, Fab, TextField, Button} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {ProductionQuantityLimits as ProductionQuantityLimitsIcon,
        AddCircleOutline as AddCircleOutlineIcon, RemoveCircleOutline as RemoveCircleOutlineIcon,
        ShoppingBag as ShoppingBagIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon,
        RemoveShoppingCart as RemoveShoppingCartIcon} from '@mui/icons-material';
import {useNavigate, NavLink} from "react-router-dom";

import {sagaCartProducts, sagaCartCountProducts,
        sagaCartAddProduct, sagaCartDeleteProduct,
        sagaCartPlusProduct, sagaCartMinusProduct, sagaCartQuantityProduct,
        sagaCartDeleteAllProducts} from '../redux/saga/cart.js';

import {Discount} from './Discount';

export function CartItem(props) {
  const dispatch = useDispatch();

  const refInputValue = useRef(null);
  const refValue = useRef(null);
  useEffect(() => {
    refInputValue.current.value = props.quantity;
  }, [props.quantity]);

  const deletingProduct = useSelector((state) => state.cart.deletingProduct);
  const plusingProduct = useSelector((state) => state.cart.plusingProduct);
  const minusingProduct = useSelector((state) => state.cart.minusingProduct);
  const quantitingProduct = useSelector((state) => state.cart.quantitingProduct);

  return (<><Card key={props.id} sx={{display: 'flex', pb: 1, pl: 1, borderRadius: '0px', '&:nth-child(odd)': {backgroundColor: '#f5f5f5'}}}>
    <CardMedia component={NavLink} to={"/product/"+props.id}
               sx={{height: '100px', width: '100px', position: 'relative', overflow: 'initial', alignSelf: 'center'}}>
      <Box sx={{position: 'absolute', zIndex: '2', top: '7px', left: '2px'}}>
        <Discount>
          <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>{'-'+props.discountPercentage+'%'}</Typography>
        </Discount>
      </Box>
      <ProductionQuantityLimitsIcon sx={{width: 'inherit', height: 'inherit', color: 'gray'}} color="inherit" />
    </CardMedia>
    <CardContent sx={{height: '100%', width: '100%', padding: '0px!important'}}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={9} sm={10} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', pl: 1}}>
              <NavLink to={"/product/"+props.id}><Typography variant="h5">{props.title}</Typography></NavLink>
            </Grid>
            <Grid item xs={3} sm={2} sx={{display: 'flex', alignItems: 'start', justifyContent: 'end', p: 1}}>
              <Tooltip title={'Delete'} arrow={true}>
                <IconButton edge="start"
                            size="large"
                            disabled={
                              deletingProduct.includes(props.id) ||
                              plusingProduct.includes(props.id) ||
                              minusingProduct.includes(props.id) ||
                              quantitingProduct.includes(props.id)
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              dispatch(sagaCartDeleteProduct({id:props.id}));
                            }}
                            color={"error"}>
                  <RemoveShoppingCartIcon color="inherit" sx={{width: 32, height: 32}} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Grid container>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                  <Tooltip title={'Remove quantity'} arrow={true}>
                    <IconButton edge="start"
                                size="large"
                                disabled={
                                  deletingProduct.includes(props.id) ||
                                  plusingProduct.includes(props.id) ||
                                  minusingProduct.includes(props.id) ||
                                  quantitingProduct.includes(props.id)
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  dispatch(sagaCartMinusProduct({id:props.id}));
                                }}
                                color={"primary"}>
                      <RemoveCircleOutlineIcon color="inherit" sx={{width: 32, height: 32}} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <TextField label="Count" variant="outlined"
                             inputRef={refInputValue}
                             ref={refValue}
                             onBlur={(e) => {
                               refInputValue.current.value = props.quantity;
                             }}
                             onChange={(e) =>{
                               let value = e.target.value;
                               e.stopPropagation();
                               e.preventDefault();
                               if(value === '') return;
                               value *= 1;
                               if(Number.isInteger(value)) {
                                 if(value > 0) {
                                   dispatch(sagaCartQuantityProduct({id: props.id, quantity: value}));
                                 }
                               }
                             }}
                             disabled={
                               deletingProduct.includes(props.id) ||
                               plusingProduct.includes(props.id) ||
                               minusingProduct.includes(props.id) ||
                               quantitingProduct.includes(props.id)
                             }
                             sx={{maxWidth: '65px'}} />
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                  <Tooltip title={'Add quantity'} arrow={true}>
                    <IconButton edge="end"
                                size="large"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  dispatch(sagaCartPlusProduct({id: props.id}));
                                }}
                                disabled={
                                  deletingProduct.includes(props.id) ||
                                  plusingProduct.includes(props.id) ||
                                  minusingProduct.includes(props.id) ||
                                  quantitingProduct.includes(props.id)
                                }
                                color={"primary"}>
                      <AddCircleOutlineIcon color="inherit" sx={{width: 32, height: 32}} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                  <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h6">{(props.price).toFixed(2)}{'$'}</Typography>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                  <Typography color="error" variant="h5">{(props.price*(100-props.discountPercentage)/100).toFixed(2)}{'$'}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', pr: 1}}>
                  <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h6">{(props.total).toFixed(2)}{'$'}</Typography>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', pr: 1}}>
                  <Typography variant="h5" sx={{color: "green", fontWeight: 'bold'}}>{(props.discountedPrice).toFixed(2)}{'$'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card></>);
}
