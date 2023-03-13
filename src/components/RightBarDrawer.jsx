import {React, useState, useRef, useEffect, useLayoutEffect, useContext} from 'react';
import {Grid, Drawer, Button, Typography, Box, AppBar, Toolbar,
        Tooltip, IconButton} from '@mui/material';
import {KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon,
        FilterAlt as FilterAltIcon, List as ListIcon, Reply as ReplyIcon,
        GridView as GridViewIcon} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';

import {Categories} from './Categories';

import {darkTheme} from '../themes/dark.top.nav.bar.js';

export function RightBarDrawer(props) {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  return (<>
    <Button variant="contained" color="primary" size="large"
            onClick={() => {setState(true)}}
            startIcon={<ListIcon sx={{width: 32, height: 32}} color="inherit" />}>
      <Typography variant="subtitle1">{'Categories'}</Typography>
    </Button>
    <Drawer anchor={'left'}
            open={state}
            variant="temporary"
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {xs:'block', md: 'none'},
              '& .MuiDrawer-paper': {boxSizing: 'border-box'/*, width: drawerWidth*/},
            }}
            onClose={toggleDrawer(false)}>
      <Box sx={{width: '290px', height: 'var(--height-header)'}}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="primary"
                  sx={{height: 'var(--height-header)', justifyContent: 'center'}}>
            <Toolbar sx={{height: 'inherit', pr: {xs: 1, sm: 1}, pl: {xs: 1, sm: 1}}}>
              <Grid container sx={{height: '100%', alignItems: 'center'}}>
                <Grid item xs={9} sx={{alignItems: 'center', display: 'flex', height: 'inherit', cursor: 'pointer'}}>
                  <Grid container>
                    <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <GridViewIcon color="inherit" sx={{width: 32, height: 32}} />
                    </Grid>
                    <Grid item xs={8} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                      <Typography variant="h6">Categories</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3} sx={{alignItems: 'center', display: 'flex', height: 'inherit'}}>
                  <Tooltip title={'Back'} arrow={true}>
                    <IconButton edge="end"
                                size="large"
                                onClick={toggleDrawer(false)}
                                color="inherit">
                      <ReplyIcon color="inherit" sx={{width: 32, height: 32}} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <Box sx={{
        width: '290px',
        overflow: 'auto',
        height: 'calc(var(--min-height-body-content) + var(--height-footer))'
      }}
           onClick={toggleDrawer(false)}
           onKeyDown={toggleDrawer(false)}>
        {state?<Categories {...props} />:null}
      </Box>
    </Drawer>
  </>);
}
