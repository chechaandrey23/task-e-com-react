import {useEffect, useState, useContext} from 'react';
import {Grid, Box, Paper, Typography, Rating,
        Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia,
        Tooltip, Skeleton} from '@mui/material';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import {useNavigate, NavLink} from "react-router-dom";
import {Discount} from './Discount';
import {MarqueeCustom} from './MarqueeCustom';
import Image from 'mui-image';

export function ShortItemSkeleton({entry, itemId}) {
  const visibility = useContext(VisibilityContext);
  const navigate = useNavigate();

  const visible = visibility.isItemVisible(itemId);

  return (<>
    <Box sx={{
      height: '300px',
      width: '200px',
      p: 1,
    }}>
      <Card sx={{
        height: '100%',
        width: '100%',
        borderRadius: '0px'
      }}>
        <CardActionArea sx={{height: '100%', position: 'relative'}}>
          <CardMedia sx={{height: '150px', width: '100%', overflow: 'hidden'}}>
            <Skeleton variant="rectangular" width="inherit" height='inherit' />
          </CardMedia>
          <CardContent>
            <Grid contaner>
              <Grid item xs={12} sx={{height: '1rem'}}>
                <Typography variant="subtitle2">
                  <Skeleton variant="text" sx={{fontSize: '0.8rem', width: '90%'}} />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Rating value={5} size="large" disabled={true}/>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} sx={{pl: 1}}>
                    <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h6">
                      <Skeleton variant="text" sx={{fontSize: '1rem', width: '60px'}} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="error" variant="h4">
                      <Skeleton variant="text" sx={{fontSize: '2rem', width: '100px'}} />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  </>);
}
