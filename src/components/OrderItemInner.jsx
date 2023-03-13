import {React, useState, useRef} from 'react';
import {Grid, Box, Paper, Typography, Rating, Tooltip, Fab, Card, CardActions,
        CardActionArea, CardContent, CardHeader, CardMedia, Badge, IconButton,
        Collapse} from '@mui/material';
import {EmojiNature as EmojiNatureIcon} from '@mui/icons-material';
import {useNavigate, NavLink} from "react-router-dom";

export function OrderItemInner(props) {


  return (<>
    <Card sx={{
      width: '100%',
      height: '100%',
      borderRadius: '0px',
      display: 'flex',
      mb: 1,
      backgroundColor: 'azure'
    }}>
      <CardMedia component={NavLink} to={"/product/"+props.id}
                 sx={{height: '64px', width: '64px', overflow: 'initial', alignSelf: 'center'}}>
        <EmojiNatureIcon sx={{
          width: 'inherit', height: 'inherit', color: 'text.disabled'
        }} color="inherit" />
      </CardMedia>
      <CardContent sx={{padding: '0px!important', width: '100%', height: '100%'}}>
        <Grid container>
          <Grid item xs={12} sx={{pl: 2, display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
            <NavLink to={"/product/"+props.id}>
              <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{props.title}</Typography>
            </NavLink>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={1} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                <Typography>{'#'}</Typography>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{props.id}</Typography>
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{props.quantity}</Typography>
                <Typography>&nbsp;{'pcs'}</Typography>
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                <Typography variant="subtitle1" color="secondary" sx={{fontWeight: 'bold'}}>
                  {(props.price).toFixed(2)}{'$'}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                <Typography>{'with'}&nbsp;</Typography>
                <Typography variant="subtitle1" color="error" sx={{fontWeight: 'bold'}}>
                  {'-'}{props.discountPercentage}{'%'}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{pr: 1, display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                <Typography variant="subtitle1" sx={{fontWeight: 'bold', color: 'green'}}>
                  {(props.discountedPrice).toFixed(2)}{'$'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>);
}
