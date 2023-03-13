import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {GeneralFooter} from '../components/GeneralFooter';
import {BodyContent} from '../components/BodyContent';
import {Registration} from '../components/Registration';

import {RedirectUser} from './RedirectUser';

export function RegistrationPage() {
  return (<><RedirectUser />
    <Grid container>
      <Grid item xs={12}><TopNavBar /></Grid>
      <Grid item xs={12}><BodyContent content={<Registration />} /></Grid>
      <Grid item xs={12}><GeneralFooter /></Grid>
    </Grid>
  </>);
}
