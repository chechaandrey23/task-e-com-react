import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {GeneralFooter} from '../components/GeneralFooter';
import {BodyContent} from '../components/BodyContent';
import {Cart} from '../components/Cart';

import {RedirectGuest} from './RedirectGuest';

export function CartPage() {
  return (<><RedirectGuest />
    <Grid container>
      <Grid item xs={12}><TopNavBar /></Grid>
      <Grid item xs={12}><BodyContent content={<Cart />} /></Grid>
      <Grid item xs={12}><GeneralFooter /></Grid>
    </Grid>
  </>);
}
