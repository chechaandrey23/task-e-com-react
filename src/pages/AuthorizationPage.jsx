import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {GeneralFooter} from '../components/GeneralFooter';
import {BodyContent} from '../components/BodyContent';
import {Authorization} from '../components/Authorization';

import {RedirectUser} from './RedirectUser';

export function AuthorizationPage() {
  return (<><RedirectUser />
    <Grid container>
      <Grid item xs={12}><TopNavBar /></Grid>
      <Grid item xs={12}><BodyContent content={<Authorization />} /></Grid>
      <Grid item xs={12}><GeneralFooter /></Grid>
    </Grid>
  </>);
}
