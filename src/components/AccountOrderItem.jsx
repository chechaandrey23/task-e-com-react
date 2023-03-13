import {React, useState, useRef} from 'react';
import {Grid, Box, Paper, Typography, Rating, Tooltip, Fab, Card, CardActions,
        CardActionArea, CardContent, CardHeader, CardMedia, Badge, IconButton,
        Collapse} from '@mui/material';
import {KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
        KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, NavLink} from "react-router-dom";

import {OrderItemInner} from './OrderItemInner';

const statuses = {
  completed: {message: 'completed', color: 'success'},
  canceled: {message: 'canceled', color: 'error'},
  ignored: {message: 'ignored', color: 'error'},
  waitForConfirm: {message: 'wait for confirm', color: 'warning'},
  delivered: {message: 'delivered', color: 'info'},
  notPaid: {message: 'not paid', color: 'secondary'},
  processOfDelivery: {message: 'process of delivery', color: 'primary'},
}

let i = 0;
function _getStatus() {
  let status = null;
  if(i == 0) {status = 'completed';}
  else if(i == 1) {status = 'canceled';}
  else if(i == 2) {status = 'ignored';}
  else if(i == 3) {status = 'waitForConfirm';}
  else if(i == 4) {status = 'delivered';}
  else if(i == 5) {status = 'notPaid';}
  else if(i == 6) {status = 'processOfDelivery';}
  else {i = 0; status = 'completed';}
  i++;
  return statuses[status];
}

const statusPayments = {
  paid: {message: 'paid', color: 'success'},
  unpaid: {message: 'unpaid', color: 'secondary'},
  paymentBlocked: {message: 'payment blocked', color: 'error'},
  paymentOnSpot: {message: 'payment on spot', color: 'primary'},
  waitingForPayment: {message: 'Waiting for payment', color: 'warning'}
}

let j = 0;
function _getStatusPayment() {
  let status = null;
  if(j == 0) {status = 'paid';}
  else if(j == 1) {status = 'unpaid';}
  else if(j == 2) {status = 'paymentBlocked';}
  else if(j == 3) {status = 'paymentOnSpot';}
  else if(j == 4) {status = 'waitingForPayment';}
  else {j = 0; status = 'paid';}
  j++;
  return statusPayments[status];
}

export function AccountOrderItem(props) {

  const status = _getStatus();
  const statusPayments = _getStatusPayment();

  const [showMore, setShowMore] = useState(false);

  return (<>
    <Card sx={{
      width: '100%',
      height: '100%',
      borderRadius: '0px',
      '&:nth-child(odd)': {backgroundColor: '#f5f5f5'}
    }}>
      <CardContent sx={{padding: '0px!important'}}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                <Typography>{'#'}</Typography>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{props.id}</Typography>
              </Grid>
              <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="subtitle1" sx={{
                  fontWeight: 'bold', color: status.color+'.main'
                }}>{status.message}</Typography>
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>{props.totalProducts}</Typography>
                <Typography>{'('}</Typography>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>{props.totalQuantity}</Typography>
                <Typography>{')'}</Typography>
                <Typography>&nbsp;{'pcs'}</Typography>
              </Grid>
              <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h6" sx={{color: 'green', fontWeight: 'bold'}}>
                  {(props.discountedTotal).toFixed(2)}{'$'}
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="subtitle1" sx={{
                  fontWeight: 'bold', color: statusPayments.color+'.main'
                }}>{statusPayments.message}</Typography>
              </Grid>
              <Grid item xs={1} sx={{pt:0.25, pb: 0.25, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Tooltip title={'more detail'} arrow={true}>
                  <IconButton edge="start"
                              size="large"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowMore(!showMore);
                              }}
                              color={"primary"}>
                    {!showMore?<KeyboardDoubleArrowDownIcon color="inherit" sx={{width: 32, height: 32}} />
                             :<KeyboardDoubleArrowUpIcon color="inherit" sx={{width: 32, height: 32}} />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={showMore} sx={{boxSizing: 'border-box'}}>
              <Box sx={{display: 'flex', flexDirection: 'column', p: 1}}>
                {props.products.map((entry) => {
                  return (<OrderItemInner key={entry.id}
                                          id={entry.id}
                                          title={entry.title}
                                          price={entry.price}
                                          quantity={entry.quantity}
                                          discountedPrice={entry.discountedPrice}
                                          discountPercentage={entry.discountPercentage}/>);
                })}
              </Box>
            </Collapse>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>);
}
