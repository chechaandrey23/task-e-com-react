import * as React from 'react';
import {Grid, Box, Paper, Typography} from '@mui/material';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import {Copyright as CopyrightIcon} from '@mui/icons-material';

import {darkTheme} from '../themes/dark.top.nav.bar.js';

export function GeneralFooter() {
  return (<>
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{borderRadius: '0px', display: 'flex', height: 'var(--height-footer)', justifyContent: 'center', alignItems: 'center'}}>
        <CopyrightIcon /><Typography variant="title">Test task with using React</Typography>
      </Paper>
    </ThemeProvider>
  </>);
}
