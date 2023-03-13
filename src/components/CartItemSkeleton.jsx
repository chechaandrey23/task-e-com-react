import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Grid, Box, Paper, Typography, Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia,
        Tooltip, IconButton, Fab, TextField, Button, Skeleton} from '@mui/material';
import {ProductionQuantityLimits as ProductionQuantityLimitsIcon,
        AddCircleOutline as AddCircleOutlineIcon, RemoveCircleOutline as RemoveCircleOutlineIcon,
        ShoppingBag as ShoppingBagIcon, ShoppingCartOutlined as ShoppingCartOutlinedIcon,
        RemoveShoppingCart as RemoveShoppingCartIcon} from '@mui/icons-material';

export function CartItemSkeleton() {

  return (<><Card sx={{display: 'flex', pb: 1, pl: 1, borderRadius: '0px', '&:nth-child(odd)': {backgroundColor: '#f5f5f5'}}}>
    <CardMedia sx={{height: '100px', width: '100px', position: 'relative', overflow: 'initial', alignSelf: 'center'}}>
      <Skeleton variant="rectangular" width={100} height={100} />
    </CardMedia>
    <CardContent sx={{height: '100%', width: '100%', padding: '0px!important'}}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={9} sm={10} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', pl: 1}}>
              <Typography variant="h5">
                <Skeleton variant="text" sx={{fontSize: '2.2rem', width: 350}} />
              </Typography>
            </Grid>
            <Grid item xs={3} sm={2} sx={{display: 'flex', alignItems: 'start', justifyContent: 'end', p: 1}}>
              <Tooltip title={'Delete'} arrow={true}>
                <IconButton edge="start"
                            size="large"
                            disabled={true}
                            color={"error"}>
                  <RemoveShoppingCartIcon color="inherit" sx={{width: 32, height: 32}} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Grid container>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                  <Tooltip title={'Remove quantity'} arrow={true}>
                    <IconButton edge="start"
                                size="large"
                                disabled={true}
                                color={"primary"}>
                      <RemoveCircleOutlineIcon color="inherit" sx={{width: 32, height: 32}} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <TextField label="Count" variant="outlined"
                             disabled={true}
                             sx={{maxWidth: '65px'}} />
                </Grid>
                <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                  <Tooltip title={'Add quantity'} arrow={true}>
                    <IconButton edge="end"
                                size="large"
                                disabled={true}
                                color={"primary"}>
                      <AddCircleOutlineIcon color="inherit" sx={{width: 32, height: 32}} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                  <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h6">
                    <Skeleton variant="text" sx={{fontSize: '1.5rem', width: 70}} />
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                  <Typography color="error" variant="h5">
                    <Skeleton variant="text" sx={{fontSize: '1.7rem', width: 75}} />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', pr: 1}}>
                  <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h6">
                    <Skeleton variant="text" sx={{fontSize: '1.5rem', width: 70}} />
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', pr: 1}}>
                  <Typography variant="h5" sx={{color: "green", fontWeight: 'bold'}}>
                    <Skeleton variant="text" sx={{fontSize: '1.8rem', width: 75}} />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card></>);
}
