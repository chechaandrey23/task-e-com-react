import {React, useRef, useEffect, useCallback} from 'react';
import {Container, Box, Typography, Grid, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText,
        IconButton, Button, TextField, Alert, AlertTitle, Skeleton, Tooltip,
        Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia} from '@mui/material';
import {Close as CloseIcon, EmojiNature as EmojiNatureIcon, Payments as PaymentsIcon,
        Reply as ReplyIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import {LoadingButton} from '@mui/lab';
import {Save as SaveIcon} from '@mui/icons-material';

import {sagaCartDeleteAllProducts} from '../redux/saga/cart.js';

import {darkTheme} from '../themes/dark.top.nav.bar.js';

export function CartBuyConfirm(props) {
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down('md'));

  const products = useSelector((state) => state.cart.products);
  const loadProducts = useSelector((state) => state.cart.loadProducts);
  const total = useSelector((state) => state.cart.total);
  const discountedTotal = useSelector((state) => state.cart.discountedTotal);

  const deletingAllProducts = useSelector((state) => state.cart.deletingAllProducts);

  const handleOKClose = useCallback(() => {
    dispatch(sagaCartDeleteAllProducts({
      ids: products.map((entry) => {return entry.id})
    }));
	}, []);

	useEffect(() => {
    if(products.length == 0) {
      props.onSuccess?.call(null);
    }
	}, [products]);

  return (
    <Dialog open={true}
            fullScreen={isSM?true:false}
            fullWidth={true}
            onClose={deletingAllProducts.length > 0?undefined:props.onClose}
            scroll={'body'}
            maxWidth={'md'}>
    <DialogTitle>
      <Typography variant="h6">
        {'Modal Confirm Buys'}
      </Typography>
      <Tooltip title={'Close Dialog'} arrow={true}>
        <IconButton aria-label="close"
                    color="secondary"
                    size="large"
                    disabled={deletingAllProducts.length > 0}
                    onClick={deletingAllProducts.length > 0?undefined:props.onClose}
                    sx={{position: 'absolute', right: 8, top: 8}}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </DialogTitle>
    <DialogContent sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
          <Alert icon={false} severity="success" sx={{pt: 3, pb: 3, width: '100%', padding: '0px!important'}}>
            <Grid container>
              <Grid item xs={12} sx={{pb: 2, pt: 2, pl: 1}}>
                <Typography variant="h6">You confirm payment and delivery of the following items:</Typography>
              </Grid>
              <Grid item xs={12}>
                {products.map((entry) => {
                  return (<>
                    <Card key={entry.id} sx={{
                      display: 'flex', pb: 1, pl: 1,
                      borderRadius: '0px',
                      backgroundColor: 'inherit',
                      '&:nth-child(odd)': {backgroundColor: '#e3ffe5'}
                    }}>
                      <CardMedia sx={{height: '64px', width: '64px', overflow: 'initial', alignSelf: 'center'}}>
                        <EmojiNatureIcon sx={{width: 'inherit', height: 'inherit', color: 'gray'}} color="inherit" />
                      </CardMedia>
                      <CardContent sx={{
                        height: '64px', width: '100%', padding: '0px!important',
                        display: 'flex', justifyContent: 'start', alignItems: 'center'
                      }}>
                        <Grid container>
                          <Grid item xs={8} sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                            <Typography variant="subtitle1">{entry.title}</Typography>
                          </Grid>
                          <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>{entry.quantity}</Typography>
                            <Typography>&nbsp;{'pcs'}</Typography>
                          </Grid>
                          <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                              {(entry.discountedPrice).toFixed(2)}{'$'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </>);
                })}
              </Grid>
              <Grid item xs={7} sx={{pl: 1, display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                <Typography variant="h6">for total cost:</Typography>
              </Grid>
              <Grid item xs={5} sx={{pt: 3, pr:2, pb: 3, display: 'flex', justifyContent: 'end'}}>
                <Typography variant="h4" sx={{color: 'green', fontWeight: 'bold'}}>
                  {(discountedTotal).toFixed(2)}{'$'}
                </Typography>
              </Grid>
            </Grid>
          </Alert>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={{display: 'flex', justifyContent: 'center', pb: 3}}>
      <Button variant="outlined" color="secondary" size="large"
              startIcon={<ReplyIcon color="inherit" sx={{width: 32, height: 32}} />}
              disabled={deletingAllProducts.length > 0}
              onClick={deletingAllProducts.length > 0?undefined:props.onClose}>
        <Typography variant="h6">
          {'Close'}
        </Typography>
      </Button>
      {!(deletingAllProducts.length > 0)?<Button variant="contained" color="success" size="large"
              startIcon={<PaymentsIcon color="inherit" sx={{width: 32, height: 32}} />}
              onClick={handleOKClose}>
        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
          {'Confirm Buy'}
        </Typography>
      </Button>:<LoadingButton loading
                               size="large"
                               loadingPosition="start"
                               startIcon={<SaveIcon color="inherit" sx={{width: 32, height: 32}} />}
                               variant="outlined">
        <Typography variant="h6" sx={{fontWeight: 'bold'}}>
          {'Buying...'}
        </Typography>
      </LoadingButton>}
    </DialogActions>
  </Dialog>
  );
}
