import * as React from 'react';
import {Grid, Box, Paper, Typography, Skeleton} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';

export function AccountHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const firstCheckAuth = useSelector((state) => state.auth.firstCheckAuth);

  return (<Paper sx={{pl: 1, pr: 1, pt: 2, pb: 2, borderRadius: '0px', mt: 0}}>
    <Grid contaner sx={{display: 'flex', flexFlow: 'wrap'}}>
      <Grid item xs={3} sm={4} md={5} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
        <Typography variant="subtitle1" sx={{display: 'inline-block'}}>Hello User:</Typography>
      </Grid>
      <Grid item xs={9} sm={8} md={7} sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
        <Typography variant="h5" color="error" sx={{display: 'inline-block', pl: 1}}>
          {user && user.displayName?user.displayName:
            (!firstCheckAuth?<Skeleton variant="text" sx={{fontSize: '1.5rem', width: 250}} />:'Unknown Unknown')
          }
        </Typography>
      </Grid>
      <Grid item xs={3} sm={4} md={5} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
        <Typography variant="subtitle1" sx={{display: 'inline-block'}}>E-Mail:</Typography>
      </Grid>
      <Grid item xs={9} sm={8} md={7} sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
        <Typography variant="h6" color="error" sx={{display: 'inline-block', pl: 1}}>
          {user?user.email:(!firstCheckAuth?<Skeleton variant="text" sx={{fontSize: '1.5rem', width: 200}} />:'Unknown')}
        </Typography>
      </Grid>
      <Grid item xs={3} sm={4} md={5} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
        <Typography variant="subtitle1" sx={{display: 'inline-block'}}>Auth with:</Typography>
      </Grid>
      <Grid item xs={9} sm={8} md={7} sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
        <Typography variant="h6" color="error" sx={{display: 'inline-block', pl: 1}}>
          {user?user.providerData[0].providerId:
            (!firstCheckAuth?<Skeleton variant="text" sx={{fontSize: '1.5rem', width: 100}} />:'Unknown')
          }
        </Typography>
      </Grid>
    </Grid>
  </Paper>);
}
