import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {GeneralFooter} from '../components/GeneralFooter';
import {BodyContent} from '../components/BodyContent';
import {Home} from '../components/Home';
import {RightBarSupervisor} from '../components/RightBarSupervisor';

export function HomePage() {
  return (<Grid container>
    <Grid item xs={12}><TopNavBar /></Grid>
    <Grid item xs={12}><BodyContent content={<Home />} rightBar={<RightBarSupervisor />} /></Grid>
    <Grid item xs={12}><GeneralFooter /></Grid>
  </Grid>);
}
