import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';

import {TopNavBar} from '../components/TopNavBar';
import {GeneralFooter} from '../components/GeneralFooter';
import {BodyContent} from '../components/BodyContent';
import {Account} from '../components/Account';

import {RedirectGuest} from './RedirectGuest';

export function AccountPage() {
  return (<><RedirectGuest />
    <Grid container>
      <Grid item xs={12}><TopNavBar /></Grid>
      <Grid item xs={12}><BodyContent content={<Account />} /></Grid>
      <Grid item xs={12}><GeneralFooter /></Grid>
    </Grid>
  </>);
}
