import {React, useState, useRef} from 'react';
import {Grid, Box, Paper, Typography, Rating, Tooltip, Fab, Card, CardActions,
        CardActionArea, CardContent, CardHeader, CardMedia, Badge, Skeleton} from '@mui/material';
import {AddShoppingCart as AddShoppingCartIcon} from '@mui/icons-material';

export function ProductsBodyItemSkeleton() {

  return (<Grid item className="card-item" xs={6} sm={4} md={4} lg={3} xl={2} sx={{position: 'relative'}}>
  <Card sx={{width: '100%', height: '100%', borderRadius: '0px' }}>
    <CardActionArea sx={{position: 'relative'}}>
      <CardMedia sx={{height: '300px', width: '100%', overflow: 'hidden'}}>
        <Skeleton variant="rectangular" width="inherit" height='inherit' />
      </CardMedia>
      <CardContent>
        <Grid container>
          <Grid item xs={12} sx={{pb: 1}}>
              <Typography variant="h6" sx={{pr: 1}}>
                <Skeleton variant="text" sx={{fontSize: '1.5rem', width: 250}} />
              </Typography>
          </Grid>
          <Grid item xs={12}>
            <Rating value={5} size="large" disabled={true}/>
          </Grid>
        </Grid>
      </CardContent>
    </CardActionArea>
      <CardContent sx={{zIndex: 6}}>
        <Grid container>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={12}>
                <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h6">
                  <Skeleton variant="text" sx={{fontSize: '1.5rem', width: 50}} />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="error" variant="h5">
                  <Skeleton variant="text" sx={{fontSize: '2rem', width: 100}} />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Tooltip title={'Add to Cart'} arrow={true}>
              <Fab sx={{
                zIndex: 0
              }}
                   color="success"
                   disabled={true}
                   aria-label="add_to_cart">
                <AddShoppingCartIcon color="inherit" sx={{width: 32, height: 32}} />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
  </Card>
  </Grid>);
}
