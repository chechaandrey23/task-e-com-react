import {useRef, createContext, useContext} from 'react';
import {Grid, Box, Paper} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';

export const ctxRightBar = createContext(null);

export function BodyContent(props = {}) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const refRightBar = useRef(null);

  if(props.rightBar) {
    if(isSmall) {
      return (<Grid container sx={{minHeight: 'var(--min-height-body-content)', justifyContent: 'start', alignItems: 'start'}}>
        <Grid item xs={12} sx={{height: 'inherit'}}>{props.content?props.content:null}</Grid>
      </Grid>);
    } else {
      return (<Grid container sx={{minHeight: 'var(--min-height-body-content)', justifyContent: 'start', alignItems: 'start'}}>
        <Grid item xs={4} md={3} lg={2} sx={{height: 'inherit'}}>
          <ctxRightBar.Provider value={{baseEl: refRightBar}} >{props.rightBar?props.rightBar:null}</ctxRightBar.Provider>
        </Grid>
        <Grid ref={refRightBar} item xs={8} md={9} lg={10} sx={{height: 'inherit'}}>{props.content?props.content:null}</Grid>
      </Grid>);
    }
  } else {
    return (<Box sx={{minHeight: 'var(--min-height-body-content)', display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>{props.content?props.content:null}</Box>)
  }
}
