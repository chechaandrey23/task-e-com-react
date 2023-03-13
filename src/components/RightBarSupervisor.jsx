import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';

import {RightBar} from './RightBar';

export function RightBarSupervisor(props) {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down('sm'));

  return (!isXS?<RightBar {...props} />:null);
}
