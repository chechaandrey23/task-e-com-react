import * as React from 'react';
import {useRef, useEffect, useCallback} from 'react';
import {Container, Box, Typography, Grid, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText,
        IconButton, Button, TextField, Alert, AlertTitle, Skeleton, Tooltip} from '@mui/material';
import {Close as CloseIcon, Reply as ReplyIcon, Logout as LogoutIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Save as SaveIcon} from '@mui/icons-material';

import {sagaLogout} from '../redux/saga/auth.js';

export function LogoutModal(props) {
  const dispatch = useDispatch();

  const errorLogout = useSelector((state) => state.auth.errorLogout);
	const logout = useSelector((state) => state.auth.logout);
  const loadLogout = useSelector((state) => state.auth.loadLogout);

  const handleOKClose = useCallback(() => {
		dispatch(sagaLogout());
	}, []);

	useEffect(() => {
    if(logout) {
      props.onSuccess?.call(null);
    }
	}, [logout]);

  return (<Dialog open={true}
                  fullScreen={false}
                  fullWidth={true}
                  onClose={!loadLogout?props.onClose:undefined}
                  maxWidth={'sm'}>
    <DialogTitle>
      <Typography variant="h6">
        {'Dialog Confirm Logout'}
      </Typography>
      <Tooltip title={'Close Dialog'} arrow={true}>
        <IconButton aria-label="close"
                    color="secondary"
                    size="large"
                    disabled={loadLogout}
                    onClick={props.onClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8
                    }}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </DialogTitle>
    <DialogContent sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
          <Alert severity="warning" sx={{pt: 3, pb: 3, width: '100%'}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', ml: 3}}>
              {'Are you sure you want to leave the admin area of ​​the site?'} {'Most of the functionality will be unavailable!'}
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={{display: 'flex', justifyContent: 'center', pb: 3}}>
      <Button variant="outlined" color="secondary" size="large"
              startIcon={<ReplyIcon color="inherit" sx={{width: 32, height: 32}} />}
              onClick={props.onClose} disabled={loadLogout}>
        <Typography sx={{fontWeight: 'bold'}}>
          {'Close'}
        </Typography>
      </Button>
      {!loadLogout?<Button variant="contained" color="warning" size="large"
                           startIcon={<LogoutIcon color="inherit" sx={{width: 32, height: 32}} />}
                           onClick={handleOKClose}>
        <Typography sx={{fontWeight: 'bold'}}>
          {'Logout'}
        </Typography>
      </Button>:<LoadingButton loading
                               size="large"
                               loadingPosition="start"
                               startIcon={<SaveIcon color="inherit" sx={{width: 32, height: 32}} />}
                               variant="outlined">
        <Typography sx={{fontWeight: 'bold'}}>
          {'Logouting...'}
        </Typography>
      </LoadingButton>}
    </DialogActions>
  </Dialog>);
}
