import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';

import {AccountHeader} from './AccountHeader';
import {AccountOrders} from './AccountOrders';

export function Account() {
  return (<Grid container sx={{alignSelf: 'start'}}>
    <Grid item xs={12}><AccountHeader /></Grid>
    <Grid item xs={12}><AccountOrders /></Grid>
  </Grid>);
}
