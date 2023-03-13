import {React, useState, useRef, useEffect, useLayoutEffect} from 'react';
import {Grid, Box, Paper, Button, IconButton, Typography, AppBar, Toolbar, Tooltip, LinearProgress} from '@mui/material';
import {NavLink, useMatches, useNavigate} from "react-router-dom";
import {Cottage as CottageIcon, ViewList as ViewListIcon, ShoppingCart as ShoppingCartIcon,
        ExitToApp as ExitToAppIcon, Login as LoginIcon, AccountBox as AccountBoxIcon} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux';

import {darkTheme} from '../themes/dark.top.nav.bar.js';

import {sagaGetUser} from '../redux/saga/auth.js';

import {LogoutModal} from './LogoutModal';
import {CartBar} from './CartBar';

export function TopNavBar() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  const [match] = useMatches();

  useLayoutEffect(() => {
    //dispatch(sagaGetUser());
  }, []);

  const firstCheckAuth = useSelector((state) => state.auth.firstCheckAuth);

  return (<>
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary" sx={{height: 'var(--height-header)', justifyContent: 'center'}}>
        <Toolbar sx={{height: 'inherit'}}>
          <Grid container sx={{height: '100%', alignItems: 'center'}}>
            <Grid item sx={{alignItems: 'center', display: 'flex', height: 'inherit'}}>
              {!isXS?<Button component={NavLink} to='/'
                      variant="text"
                      color={match.pathname=='/'?"success":"secondary"}
                      startIcon={<CottageIcon color="inherit" sx={{width: 24, height: 24}} />}
                      sx={{width: '100%', height: '100%'}}>
                <Box component="span" sx={{display: {xs: 'none', sm: 'inline'}}}><Typography variant="h6">{'Home'}</Typography></Box>
              </Button>:<Tooltip title={'Home'} arrow={true}>
                <IconButton component={NavLink} to='/'
                            edge="start"
                            size="large"
                            color={match.pathname=="/"?"success":"secondary"}>
                  <CottageIcon color="inherit" sx={{width: 32, height: 32}} />
                </IconButton>
              </Tooltip>}
            </Grid>
            <Grid item sx={{pl: 2, alignItems: 'center', display: 'flex', height: 'inherit'}}>
              {!isXS?<Button component={NavLink} to='/products'
                      variant="text"
                      color={match.pathname.includes('/product')?"success":"secondary"}
                      startIcon={<ViewListIcon color="inherit" sx={{width: 24, height: 24}} />}
                      sx={{width: '100%', height: '100%'}}>
                <Box component="span" sx={{display: {xs: 'none', sm: 'inline'}}}><Typography variant="h6">{'Catalog'}</Typography></Box>
              </Button>:<Tooltip title={'Catalog'} arrow={true}>
                <IconButton component={NavLink} to='/products'
                            edge="start"
                            size="large"
                            color={match.pathname.includes('/product')?"success":"secondary"}>
                  <ViewListIcon color="inherit" sx={{width: 32, height: 32}} />
                </IconButton>
              </Tooltip>}
            </Grid>
            <Grid sx={{ flexGrow: 1 }}></Grid>
            {!firstCheckAuth?<TopNavBarCheckAuth />:<TopNavBarTail />}

          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  </>);
}

function TopNavBarCheckAuth() {

  return (<>
    <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
          <Typography variant="h6">{('Check Auth').toUpperCase()}</Typography>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress color="warning" />
        </Grid>
      </Grid>
    </Grid>
  </>);
}

function TopNavBarTail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModalLogout, setShowModalLogout] = useState(false);

  const logout = useSelector((state) => state.auth.logout);
  const login = useSelector((state) => state.auth.login);

  const [match] = useMatches();

  return (<>
    <Grid item sx={{alignItems: 'center', display: 'flex'}}>
      <CartBar />
    </Grid>
    {(login && !logout)?<>
      <Grid item sx={{pl: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Tooltip title={'Account'} arrow={true}>
        <IconButton component={NavLink} to='/account'
                              edge="start"
                              size="large"
                              color={match.pathname=="/account"?"success":"secondary"}>
          <AccountBoxIcon color="inherit" sx={{width: 32, height: 32}} />
        </IconButton>
      </Tooltip>
      </Grid>
      <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Tooltip title={'Logout'} arrow={true}>
          <IconButton size="large"
                      edge="end"
                      onClick={() => setShowModalLogout(true)}
                      color="warning">
            <ExitToAppIcon color="inherit" sx={{width: 32, height: 32}} />
          </IconButton>
        </Tooltip>
        {showModalLogout?<LogoutModal onClose={() => {setShowModalLogout(false)}}
                                      onSuccess={() => {
                                        setShowModalLogout(false);
                                        navigate('/');
                                      }} />:null}
      </Grid>
    </>:<Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Tooltip title={'Authorization'} arrow={true}>
        <IconButton component={NavLink} to='/authorization'
                              edge="end"
                              size="large"
                              color={match.pathname=="/authorization"?"info":"secondary"}>
          <LoginIcon color="inherit" sx={{width: 32, height: 32}} />
        </IconButton>
      </Tooltip>
    </Grid>}
  </>);
}
