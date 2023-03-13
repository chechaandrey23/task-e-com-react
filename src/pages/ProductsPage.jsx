import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {GeneralFooter} from '../components/GeneralFooter';
import {BodyContent} from '../components/BodyContent';
import {Products} from '../components/Products';
import {RightBarSupervisor} from '../components/RightBarSupervisor';

export function ProductsPage() {
  return (<Grid container>
    <Grid item xs={12}><TopNavBar /></Grid>
    <Grid item xs={12}><BodyContent content={<Products />} rightBar={<RightBarSupervisor />} /></Grid>
    <Grid item xs={12}><GeneralFooter /></Grid>
  </Grid>);
}
