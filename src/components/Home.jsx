import {useEffect} from 'react';
import {Grid, Box, Paper, Typography, Skeleton, Alert} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Image from 'mui-image';
import {useSelector, useDispatch} from 'react-redux';
import {SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon, CloudDownload as CloudDownloadIcon} from '@mui/icons-material';
import {usePreventBodyScroll} from '../hooks/usePreventBodyScroll.js';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import {LeftArrow, RightArrow} from './Arrows';
import {useNavigate} from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import {useFirst} from '../hooks/useFirst.js';
import {useSnackBarError} from '../hooks/useSnackBarError.jsx';

import {CategoriesForHome} from './CategoriesForHome';
import {ShortList} from './ShortList';
import {ShortItemSkeleton} from './ShortItemSkeleton';

import {handlerWheel} from '../helpers/handlerWheel.js'

import {sagaCaruselProducts, sagaRatingProducts, sagaInterestProducts} from '../redux/saga/home.js';

export function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {disableScroll, enableScroll} = usePreventBodyScroll();

  const caruselProducts = useSelector((state) => state.home.caruselProducts);
  const loadCaruselProducts = useSelector((state) => state.home.loadCaruselProducts);
  const errorCaruselProducts = useSelector((state) => state.home.errorCaruselProducts);

  const ratingProducts = useSelector((state) => state.home.ratingProducts);
  const loadRatingProducts = useSelector((state) => state.home.loadRatingProducts);
  const errorRatingProducts = useSelector((state) => state.home.errorRatingProducts);

  const interestProducts = useSelector((state) => state.home.interestProducts);
  const loadInterestProducts = useSelector((state) => state.home.loadInterestProducts);
  const errorInterestProducts = useSelector((state) => state.home.errorInterestProducts);

  useEffect(() => {
    dispatch(sagaCaruselProducts());
  }, []);

  useEffect(() => {
    dispatch(sagaRatingProducts());
  }, []);

  useEffect(() => {
    dispatch(sagaInterestProducts());
  }, []);

  const {snackBarError} = useSnackBarError();

  useEffect(() => {
    snackBarError(errorCaruselProducts);
  }, [errorCaruselProducts]);

  useEffect(() => {
    snackBarError(errorRatingProducts);
  }, [errorRatingProducts]);

  useEffect(() => {
    snackBarError(errorInterestProducts);
  }, [errorInterestProducts]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isXS = useMediaQuery(theme.breakpoints.down('sm'));

  const first = useFirst();

  return (<>
    <Grid container>
      <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1, pt: 2, pb: 2}}>
      {(!loadCaruselProducts && !first.current)?((caruselProducts.length == 0)?<CaruselProductsEmpty />:
        <Carousel autoPlay={false}
                  indicators={true}
                  fullHeightHover={false}
                  duration={200}
                  animation="slide"
                  swipe={false}
                  stopAutoPlayOnHover={true}
                  height={450}
                  sx={{
                    width: {sx: '100%', sm: '100%', md: '100%', lg: '1200px'},

                  }}
                  //index={itemImage}
                  //onChange={(index) => {setItemImage(index)}}
                  NextIcon={<SkipNextIcon color="warning" sx={{width: 48, height: 48}} />}
                  PrevIcon={<SkipPreviousIcon color="warning" sx={{width: 48, height: 48}} />}
                  navButtonsAlwaysVisible={true}>
          {caruselProducts.map((item) => {
            return (<Box key={item.id}
                         onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           navigate('/product/'+item.id);
                         }}
                         sx={{width: '100%', height: '100%', position: 'relative', cursor: 'pointer'}}>
              <Image src={item.images[0]}
                     width="inherit"
                     height="inherit"
                     duration={0}
                     errorIcon={<div>ERROR!</div>}
                     showLoading={<CloudDownloadIcon sx={{color: 'text.disabled', width: 'inherit', height: 'inherit'}} />} />
              <Box sx={{position: 'absolute', left: '10px', top: '0px'}}>
                <Typography color="primary" variant="h2" sx={{fontWeight: 'bold'}}>{item.title}</Typography>
              </Box>
              <Box sx={{position: 'absolute', right: '10px', bottom: '0px'}}>
                <Typography color="error" variant="h1" sx={{fontWeight: 'bold'}}>{(item.price*(100-item.discountPercentage)/100).toFixed(2)}{'$'}</Typography>
              </Box>
              <Box sx={{position: 'absolute', right: '10px', bottom: '90px'}}>
                <Typography color="error" variant="h3" sx={{fontWeight: 'bold'}}>{'-'}{(item.discountPercentage).toFixed(2)}{'%'}</Typography>
              </Box>
            </Box>);
          })}
        </Carousel>)
        :<Skeleton variant="rectangular" height={450} sx={{width: '100%'}} />}
      </Grid>
      <Grid item xs={12}>
        {isSmall?<CategoriesForHome isXS={isXS} />:null}
      </Grid>
      <Grid item xs={12} sx={{pl: 2, pt: 1}}>
        <Typography variant="h4">The most popular</Typography>
      </Grid>
      <Grid item xs={12}>
        {(!loadRatingProducts && !first.current)
          ?((ratingProducts.length == 0)?<RatingProductsEmpty />:<ShortList list={ratingProducts} />)
          :<ShortList list={[1,2,3,4,5,6,7,8,9,10]} type="fab" renderItem={(item, index) => {
            return (<ShortItemSkeleton key={index+1} itemId={item} />);
          }} />}
      </Grid>
      <Grid item xs={12} sx={{pl: 2, pt: 1}}>
        <Typography variant="h4">You visible</Typography>
      </Grid>
      <Grid item xs={12}>
        {(!loadInterestProducts && !first.current)
          ?((interestProducts.length == 0)?<InterestProductsEmpty />:<ShortList list={interestProducts} />)
          :<ShortList list={[1,2,3,4,5,6,7,8,9,10]} type="fab" renderItem={(item, index) => {
            return (<ShortItemSkeleton key={index+1} itemId={item} />);
          }} />}
      </Grid>
    </Grid>
  </>);
}

export function CaruselProductsEmpty() {
  return (<Box sx={{width: '100%', height: 'inherit', mr: 0.5, ml: 0.5}}>
    <Alert severity="info" sx={{width: 'inherit', height: 'inherit'}}>
      <Grid container sx={{pr: 1, pl: 1, pt: 10, pb: 10, width: 'inherit', height: 'inherit'}}>
        <Grid item xs={12} sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>Something went wrong, there are no products with the biggest discounts!</Typography>
        </Grid>
      </Grid>
    </Alert>
  </Box>);
}

export function RatingProductsEmpty() {
  return (<Box sx={{width: '100%', height: '100%', mr: 0.5, ml: 0.5}}>
    <Alert severity="info" sx={{width: 'inherit', height: 'inherit'}}>
      <Grid container sx={{pr: 1, pl: 1, pt: 10, pb: 10, width: 'inherit', height: 'inherit'}}>
        <Grid item xs={12} sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>Something went wrong, there are no products with the highest ratings!</Typography>
        </Grid>
      </Grid>
    </Alert>
  </Box>);
}

export function InterestProductsEmpty() {
  return (<Box sx={{width: '100%', height: '100%', mr: 0.5, ml: 0.5}}>
    <Alert severity="info" sx={{width: 'inherit', height: 'inherit'}}>
      <Grid container sx={{pr: 1, pl: 1, pt: 10, pb: 10, width: 'inherit', height: 'inherit'}}>
        <Grid item xs={12} sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>Something went wrong, there are no products you are interested in!</Typography>
        </Grid>
      </Grid>
    </Alert>
  </Box>);
}
