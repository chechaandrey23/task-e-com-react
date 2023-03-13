import * as React from 'react';
import {Grid, Box, Paper} from '@mui/material';
import {useParams} from "react-router-dom";

import {ProductsHeader} from './ProductsHeader';
import {ProductsBody} from './ProductsBody';
import {BreadCrumbs} from './BreadCrumbs';

export function Products() {
  const {category} = useParams();

  return (<Grid container>
    <Grid item xs={12}><BreadCrumbs category={category} /></Grid>
    <Grid item xs={12}><ProductsHeader /></Grid>
    <Grid item xs={12} sx={{display: 'flex'}}><ProductsBody /></Grid>
  </Grid>);
}
