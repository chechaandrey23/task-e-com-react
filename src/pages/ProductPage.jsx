import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {GeneralFooter} from '../components/GeneralFooter';
import {BodyContent} from '../components/BodyContent';
import {Product} from '../components/Product';

export function ProductPage() {
  return (<Grid container>
    <Grid item xs={12}><TopNavBar /></Grid>
    <Grid item xs={12}><BodyContent content={<Product />} /></Grid>
    <Grid item xs={12}><GeneralFooter /></Grid>
  </Grid>);
}
