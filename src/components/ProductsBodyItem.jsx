import {React, useState, useRef} from 'react';
import {Grid, Box, Paper, Typography, Rating, Tooltip, Fab, Card, CardActions,
        CardActionArea, CardContent, CardHeader, CardMedia, Badge, CircularProgress} from '@mui/material';
import Marquee from "react-fast-marquee";
import {AddShoppingCart as AddShoppingCartIcon, CloudDownload as CloudDownloadIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import {useNavigate, NavLink} from "react-router-dom";
import {Discount} from './Discount';
import Image from 'mui-image';

import {MarqueeCustom} from './MarqueeCustom';
import {CartGuestModal} from './CartGuestModal';

import {sagaCartAddProduct} from '../redux/saga/cart.js';

export function ProductsBodyItem(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const countDataProducts = useSelector((state) => state.cart.countDataProducts);

  const addingProduct = useSelector((state) => state.cart.addingProduct);

  const [cardAppendix, setCardAppendix] = useState('appendix');

  const logout = useSelector((state) => state.auth.logout);
  const login = useSelector((state) => state.auth.login);

  const [openGuestCartModal, setOpenGuestCartModal] = useState(false);

  return (<>
    <Card sx={{
      width: '100%',
      height: '100%',
      borderRadius: '0px'
    }}>
      <CardActionArea sx={{position: 'relative'}} component={NavLink} to={'/product/'+props.id}>
        <CardMedia sx={{height: '300px', width: '100%', overflow: 'hidden'}}>
          <Image src={props.thumbnail}
                 width="inherit"
                 height="inherit"
                 duration={0}
                 errorIcon={<div>ERROR!</div>}
                 showLoading={<CloudDownloadIcon sx={{color: 'text.disabled', width: 'inherit', height: 'inherit'}} />} />
        </CardMedia>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sx={{pb: 1}}>
              <MarqueeCustom>
                <Typography variant="h6" sx={{pr: 1}}>
                  {props.title}
                </Typography>
              </MarqueeCustom>
            </Grid>
            <Grid item xs={12}>
              <Tooltip title={<Typography variant="h6" sx={{fontWeight: 'bold'}}>{props.rating}</Typography>} arrow={true}>
              <Rating value={props.rating}
                      size="large"
                      precision={1}/>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent sx={{position: 'absolute', zIndex: '2', top: '10px', left: '1px'}}>
          <Discount>
            <Typography variant="h6" sx={{fontWeight: 'bold'}}>{'-'+props.discountPercentage+'%'}</Typography>
          </Discount>
        </CardContent>
      </CardActionArea>
        <CardContent sx={{zIndex: 6}}>
          <Grid container>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h6">{(props.price).toFixed(2)}{'$'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="error" variant="h5">{(props.price*(100-props.discountPercentage)/100).toFixed(2)}{'$'}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Tooltip title={'Add to Cart'} arrow={true}>
                <Badge showZero={false} badgeContent={(() => {
                  const count = countDataProducts.reduce((acc, entry) => {
                    if(entry.id == props.id) acc += entry.count; return acc;
                  }, 0);
                  return count;
                })()} anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }} color="warning">
                <Fab sx={{
                  zIndex: 0
                }}
                     color="success"
                     disabled={addingProduct.includes(props.id)}
                     onClick={(login && !logout)?((e) => {
                       e.stopPropagation();
                       e.preventDefault();
                       dispatch(sagaCartAddProduct({id: props.id}));
                     }):(() => {
                       setOpenGuestCartModal(true);
                     })}
                     aria-label="add_to_cart">
                  {!addingProduct.includes(props.id)
                    ?<AddShoppingCartIcon color="inherit" sx={{width: 32, height: 32}} />
                    :<CircularProgress color="inherit" sx={{width: 24, height: 24}} />}
                </Fab>
                </Badge>
              </Tooltip>
              {(login && !logout)?null:openGuestCartModal?<CartGuestModal onClose={() => {
                setOpenGuestCartModal(false);
              }} />:null}
            </Grid>
          </Grid>
        </CardContent>

      <CardActionArea className="appendix" component={NavLink} to={'/product/'+props.id} sx={{
        position: 'absolute',
        //boxShadow: '5px 5px 10px orange, -5px -5px 10px orange, 5px -5px 10px orange, -5px 5px 10px orange',
        zIndex: '5',
        backgroundColor: 'inherit',
        display: 'none',
        top: '494px'
      }}>
        <CardContent>
          <Grid container>
          <Grid item>
            <Typography variant="subtitle2">{props.brand}</Typography>
          </Grid>
            <Grid item>
              <Typography variant="body2">{props.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  </>);
}
