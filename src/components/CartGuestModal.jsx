import * as React from 'react';
import {useRef, useEffect, useCallback} from 'react';
import {Container, Box, Typography, Grid, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText,
        IconButton, Button, TextField, Alert, AlertTitle, Skeleton, Tooltip} from '@mui/material';
import {Close as CloseIcon, Reply as ReplyIcon, Login as LoginIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {LoadingButton} from '@mui/lab';
import {Save as SaveIcon, AppRegistration as AppRegistrationIcon} from '@mui/icons-material';
import {useNavigate, NavLink} from "react-router-dom";

export function CartGuestModal(props) {

  return (<Dialog open={true}
                  fullScreen={false}
                  fullWidth={true}
                  onClose={props.onClose}
                  maxWidth={'sm'}>
    <DialogTitle>
      <Typography variant="h6">
        {'Dialog Gart Guest Info'}
      </Typography>
      <Tooltip title={'Close Dialog'} arrow={true}>
        <IconButton aria-label="close"
                    color="secondary"
                    size="large"
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
          <Alert severity="info" sx={{pt: 3, pb: 3, width: '100%'}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', ml: 3}}>
              {'Only an authorized user can use the shopping cart!'}
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions sx={{display: 'flex', justifyContent: 'center', pb: 3}}>
      <Button variant="outlined" color="secondary" size="large"
              startIcon={<ReplyIcon color="inherit" sx={{width: 32, height: 32}} />}
              sx={{mr: 1}}
              onClick={props.onClose}>
        <Typography sx={{fontWeight: 'bold'}}>
          {'Close'}
        </Typography>
      </Button>
      <Button component={NavLink} to='/registration'
              variant="outlined"
              color="info"
              size="large"
              onClick={props.onClose}
              startIcon={<AppRegistrationIcon color="inherit" sx={{width: 32, height: 32}} />}>
        <Box><Typography sx={{fontWeight: 'bold'}}>{'Sign up'}</Typography></Box>
      </Button>
      <Button component={NavLink} to='/authorization'
              variant="outlined"
              color="info"
              size="large"
              onClick={props.onClose}
              startIcon={<LoginIcon color="inherit" sx={{width: 32, height: 32}} />}>
        <Box><Typography sx={{fontWeight: 'bold'}}>{'Sign in'}</Typography></Box>
      </Button>
    </DialogActions>
  </Dialog>);
}
