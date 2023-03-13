import {React, useState, useRef} from 'react';
import {Grid, Box, Paper, Typography, Rating, Tooltip, Fab, Card, CardActions,
        CardActionArea, CardContent, CardHeader, CardMedia, Badge, IconButton,
        Collapse, Skeleton} from '@mui/material';
import {KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
        KeyboardDoubleArrowUp as KeyboardDoubleArrowUpIcon} from '@mui/icons-material';

export function OrdersItemSkeleton() {
  return (<>
    <Card sx={{
      width: '100%',
      height: '100%',
      borderRadius: '0px',
      '&:nth-child(odd)': {backgroundColor: '#f5f5f5'}
    }}>
      <CardContent sx={{padding: '0px!important'}}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                  <Skeleton variant="text" sx={{fontSize: '1rem', width: 50}} />
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="subtitle1" sx={{
                  fontWeight: 'bold', color: 'text.disabled'
                }}>
                  <Skeleton variant="text" sx={{fontSize: '1rem', width: 100}} />
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                  <Skeleton variant="text" sx={{fontSize: '2rem', width: 75}} />
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="h6" sx={{color: 'green', fontWeight: 'bold'}}>
                  <Skeleton variant="text" sx={{fontSize: '2rem', width: 100}} />
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="subtitle1" sx={{
                  fontWeight: 'bold', color: 'text.disabled'
                }}>
                  <Skeleton variant="text" sx={{fontSize: '1rem', width: 100}} />
                </Typography>
              </Grid>
              <Grid item xs={1} sx={{pt:0.25, pb: 0.25, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Tooltip title={'more detail'} arrow={true}>
                  <IconButton edge="start"
                              size="large"
                              disabled={true}
                              color={"primary"}>
                    <KeyboardDoubleArrowDownIcon color="inherit" sx={{width: 32, height: 32}} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>);
}
