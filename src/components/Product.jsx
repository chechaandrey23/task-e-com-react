import {useEffect, useRef, useContext, useState, useLayoutEffect} from 'react';
import {Grid, Box, Paper, Rating, Button, Typography, Card, CardActionArea, CardMedia,
        Tooltip, Badge, Alert, Skeleton, IconButton} from '@mui/material';
import {NavLink, useMatches, useNavigate, useSearchParams, useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {useFirst} from '../hooks/useFirst.js';
import Carousel from 'react-material-ui-carousel';
import Image from 'mui-image';
import {AddShoppingCart as AddShoppingCartIcon, ShoppingCartCheckout as ShoppingCartCheckoutIcon,
        SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon,
        GridView as GridViewIcon, CloudDownload as CloudDownloadIcon, Close as CloseIcon} from '@mui/icons-material';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import {LeftArrow, RightArrow} from './Arrows';
import {usePreventBodyScroll} from '../hooks/usePreventBodyScroll.js';
import {Discount} from './Discount';
import {LoadingButton} from '@mui/lab';
import {Save as SaveIcon} from '@mui/icons-material';
import {useSnackBarError} from '../hooks/useSnackBarError.jsx';

import {handlerWheel} from '../helpers/handlerWheel.js';

import {sagaProduct} from '../redux/saga/products.js';
import {sagaCartAddProduct} from '../redux/saga/cart.js';

import {ProductMore} from './ProductMore';
import {BreadCrumbs} from './BreadCrumbs';
import {ShortList} from './ShortList';
import {CartGuestModal} from './CartGuestModal';

import {ShortItemSkeleton} from './ShortItemSkeleton';

export function Product() {
  const dispatch = useDispatch();
  const {id} = useParams();

  const product = useSelector((state) => state.products.product);
  const loadProduct = useSelector((state) => state.products.loadProduct);
  const errorProduct = useSelector((state) => state.products.errorProduct);

  const countDataProducts = useSelector((state) => state.cart.countDataProducts);

  const addingProduct = useSelector((state) => state.cart.addingProduct);
  const errorAddProduct = useSelector((state) => state.cart.errorAddProduct);

  useEffect(() => {
    dispatch(sagaProduct({id}));
  }, [id]);

  const [itemImage, setItemImage] = useState(0);

  const [currentRating, setCurrentRating] = useState(0);

  const {disableScroll, enableScroll} = usePreventBodyScroll();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const first = useFirst();

  const logout = useSelector((state) => state.auth.logout);
  const login = useSelector((state) => state.auth.login);

  const [openGuestCartModal, setOpenGuestCartModal] = useState(false);

  const {snackBarError} = useSnackBarError();

  useEffect(() => {
    snackBarError(errorProduct);
  }, [errorProduct]);

  useEffect(() => {
    snackBarError(errorAddProduct);
  }, [errorAddProduct]);

  if(!product && !loadProduct && !first.current) {
    return (<Grid container sx={{alignSelf: 'center'}}>
      <Box sx={{width: '100%', height: '100%', mr: 0.5, ml: 0.5}}>
        <Alert severity="info" sx={{width: 'inherit', height: 'inherit', alignSelf: 'center'}}>
          <Grid container sx={{pr: 1, pl: 1, pt: 5, pb: 5, width: 'inherit', height: 'inherit'}}>
            <Grid item xs={12} sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
              <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                {'Product with id "'}{id}{'" does not exist!'}
              </Typography>
              <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                Go to the main catalog and continue shopping!
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{pt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Button component={NavLink} to="/products"
                      color="primary" variant="contained" size="large"
                      startIcon={<GridViewIcon color="inherit" sx={{width: 32, height: 32}} />}>
                <Typography color="inherit" variant="h6">catalog</Typography>
              </Button>
            </Grid>
          </Grid>
        </Alert>
      </Box>
    </Grid>);
  }

  if(!loadProduct && !first.current) {
    return (<Grid container sx={{alignSelf: 'start'}}>
      <Grid item xs={12}>
        <BreadCrumbs category={product.category} />
      </Grid>
      <Grid item xs={12} sx={{p: 1, pt:0, display: 'flex', justifyContent: 'start'}}>
        <Typography variant="h4">{product.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={8} md={6} lg={7} xl={8}>
            <Grid container>
              <Grid item xs={12} sx={{position: 'relative'}}>
                <Box sx={{position: 'absolute', zIndex: '2', top: '20px', left: '10px'}}>
                  <Discount>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                      {'discount:'}&nbsp;{'-'}{product.discountPercentage}{'%'}</Typography>
                  </Discount>
                </Box>
                <Carousel autoPlay={false}
                          indicators={false}
                          fullHeightHover={false}
                          duration={200}
                          animation="slide"
                          swipe={false}
                          index={itemImage}
                          onChange={(index) => {setItemImage(index)}}
                          NextIcon={<SkipNextIcon color="warning" sx={{width: 48, height: 48}} />}
                          PrevIcon={<SkipPreviousIcon color="warning" sx={{width: 48, height: 48}} />}
                          height={600}
                          sx={{
                            width: '100%',
                          }}
                          navButtonsProps={{
                            style: {
                              opacity: "0.9 !important",
                              backgroundColor: 'black',
                              '&:hover': {
                                opacity: "0.75 !important",
                                backgroundColor: 'black',
                              },
                            }
                          }}
                          navButtonsAlwaysVisible={true}>
                  {product.images.map((item) => {
                    return (<Box sx={{width: '100%', height: '100%'}}>
                      <Image src={item}
                             width="inherit"
                             height="inherit"
                             duration={0}
                             errorIcon={<div>ERROR!</div>}
                             showLoading={<CloudDownloadIcon sx={{color: 'text.disabled', width: 'inherit', height: 'inherit'}} />} />
                    </Box>);
                  })}
                </Carousel>
              </Grid>
              <Grid item xs={12} sx={{pt: 1}}>
                <ShortList list={product.images}
                           type="side"
                           renderItem={(item, index) => {
                             return (<ImageCustom itemId={item}
                                                  src={item}
                                                  selected={itemImage==index}
                                                  onSelect={() => {setItemImage(index)}}
                                                  key={index+1}/>);
                           }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={6} lg={5} xl={4} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid container>
              <Grid item xs={6} sm={12} md={6} sx={{pt:3, pb: 3, display: 'flex', justifyContent: 'end'}}>
                <Tooltip title={<Typography variant="h6" sx={{fontWeight: 'bold'}}>{product.rating}</Typography>} arrow={true}>
                <Rating value={currentRating || product.rating}
                        precision={1}
                        size="large"
                        onChange={(e, newValue) => {setCurrentRating(newValue);}}/>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={12} md={6}></Grid>
              <Grid item xs={6} sm={12} md={6}>
                <Grid container>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'end'}}>
                    <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h4">{product.price.toFixed(2)}{'$'}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'end'}}>
                    <Typography color="error" variant="h3" sx={{fontWeight: 'bold'}}>{(product.price*(100-product.discountPercentage)/100).toFixed(2)}{'$'}</Typography>
                  </Grid>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'end'}}>
                    <Typography variant="h6" color="primary">{'stock: '+product.stock+' pcs'}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={12} md={6} sx={{pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Badge showZero={false} badgeContent={(() => {
                  const count = countDataProducts.reduce((acc, entry) => {
                    if(entry.id == product.id) acc += entry.count; return acc;
                  }, 0);
                  return count;
                })()} anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }} color="warning">
                  {!addingProduct.includes(product.id)?<Button variant="contained"
                          size="large"
                          color="success"
                          disabled={addingProduct.includes(product.id)}
                          onClick={(login && !logout)?((e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            dispatch(sagaCartAddProduct({id: product.id}));
                          }):(() => {
                            setOpenGuestCartModal(true);
                          })}
                          startIcon={<AddShoppingCartIcon sx={{width: 48, height: 48}} />}>
                    <Typography variant="h4" sx={{fontWeight: 'bold'}}>buy</Typography>
                  </Button>:<LoadingButton loading
                                           size="large"
                                           loadingPosition="start"
                                           startIcon={<SaveIcon color="inherit" sx={{width: 48, height: 48}} />}
                                           variant="outlined">
                    <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                      {'Add...'}
                    </Typography>
                  </LoadingButton>}
                </Badge>
                {(login && !logout)?null:openGuestCartModal?<CartGuestModal onClose={() => {
                  setOpenGuestCartModal(false);
                }} />:null}
              </Grid>
              <Grid item xs={6} sm={12} md={6}></Grid>
              <Grid item xs={6} sm={12} md={6} sx={{pt:2, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Box component={NavLink}
                     to="/cart"
                     color="primary"
                     sx={{display: 'flex',
                          '&:hover': {textDecoration: 'underline'},
                          flexDirection: 'row',
                          alignItems: 'center',
                          textDecoration: 'none'
                        }}>
                  <ShoppingCartCheckoutIcon fontSize="inherit" />
                  <Typography variant="h5">{'checkout cart'}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{'Description'}</Typography>
      </Grid>
      <Grid item xs={12} sx={{pt: 1, pb: 2}}>
        <Typography variant="body2">{product.description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{'You may also be interested'}</Typography>
      </Grid>
      <Grid item xs={12} sx={{width: 'inherit', pt: 1, pb: 1}}>
        <ProductMore category={product.category} />
      </Grid>
    </Grid>);
  } else {// product Skeleton
    return (<Grid container sx={{alignSelf: 'start'}}>
      <Grid item xs={12}>
        <BreadCrumbs />
      </Grid>
      <Grid item xs={12} sx={{p: 1, pt:0, display: 'flex', justifyContent: 'start'}}>
        <Typography variant="h4">
          <Skeleton variant="text" sx={{fontSize: '2.5rem', width: 300}} />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={8} md={6} lg={7} xl={8}>
            <Grid container>
              <Grid item xs={12} sx={{position: 'relative'}}>
                <Skeleton variant="rectangular" height={600} sx={{width: 'inherit'}} />
              </Grid>
              <Grid item xs={12} sx={{pt: 1}}>
                <ShortList list={[1,2,3,4,5]}
                           type="side"
                           renderItem={(item, index) => {
                             return (<Skeleton key={index+1}
                                               itemId={item}
                                               variant="rectangular"
                                               sx={{m: 1}}
                                               height={50} width={100} />);
                           }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={6} lg={5} xl={4} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid container>
              <Grid item xs={6} sm={12} md={6} sx={{pt:3, pb: 3, display: 'flex', justifyContent: 'end'}}>
                <Rating value={5} size="large" disabled={true}/>
              </Grid>
              <Grid item xs={6} sm={12} md={6}></Grid>
              <Grid item xs={6} sm={12} md={6}>
                <Grid container>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'end'}}>
                    <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h4">
                      <Skeleton variant="text" sx={{fontSize: '2.5rem', width: 100}} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'end'}}>
                    <Typography color="error" variant="h3" sx={{fontWeight: 'bold'}}>
                      <Skeleton variant="text" sx={{fontSize: '4.5rem', width: 150}} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{display: 'flex', justifyContent: 'end'}}>
                    <Typography variant="h6" color="primary">
                      <Skeleton variant="text" sx={{fontSize: '1rem', width: 150}} />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={12} md={6} sx={{pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button variant="contained"
                        size="large"
                        color="success"
                        disabled={true}
                        startIcon={<AddShoppingCartIcon sx={{width: 48, height: 48}} />}>
                  <Typography variant="h4" sx={{fontWeight: 'bold'}}>buy</Typography>
                </Button>
              </Grid>
              <Grid item xs={6} sm={12} md={6}></Grid>
              <Grid item xs={6} sm={12} md={6} sx={{pt:2, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Skeleton variant="text" sx={{fontSize: '1.5rem', width: 150}} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{'Description'}</Typography>
      </Grid>
      <Grid item xs={12} sx={{pt: 1, pb: 2}}>
        <Typography variant="body2">
          <Skeleton variant="text" sx={{fontSize: '1rem', width: '75%'}} />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{'You may also be interested'}</Typography>
      </Grid>
      <Grid item xs={12} sx={{width: 'inherit', pt: 1, pb: 1}}>
        <ShortList list={[1,2,3,4,5,6,7,8,9,10]}
                   type="fab"
                   renderItem={(item, index) => {
                     return (<ShortItemSkeleton key={index+1} itemId={item} />);
                   }} />
      </Grid>
    </Grid>);
  }
}

function ImageCustom(props) {
  const visibility = useContext(VisibilityContext);

  const visible = visibility.isItemVisible(props.itemId);

  useLayoutEffect(() => {
    visibility.scrollToItem(visibility.getItemById(props.itemId), "smooth", "center");
  }, [props.selected]);

  return (<>
    <Box sx={{
      height: '50px',
      width: '100px',
      p: 1,
    }}>
    <Card sx={{
      width: '100%',
      height: '100%',
      borderRadius: '0px',
      boxShadow: props.selected?'5px 5px 5px green, -5px -5px 5px green, 5px -5px 5px green, -5px 5px 5px green':'none',
      '&:hover': {
        boxShadow: '5px 5px 5px orange, -5px -5px 5px orange, 5px -5px 5px orange, -5px 5px 5px orange',
      }
    }}>
      <CardActionArea sx={{height: '100%'}} onClick={(e) => {
        props.onSelect.call(null);
      }}>
        <CardMedia sx={{height: '100%', width: '100%', overflow: 'hidden'}}>
          <Image src={props.src}
                 width="inherit"
                 height="inherit"
                 duration={0}
                 errorIcon={<div>ERROR!</div>}
                 showLoading={<div>Loading...</div>} />
        </CardMedia>
      </CardActionArea>
    </Card>
    </Box>
  </>);
}
