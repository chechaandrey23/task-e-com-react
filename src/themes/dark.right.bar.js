import {ThemeProvider, createTheme} from '@mui/material/styles';

export const darkTheme = createTheme({
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: false,
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
      contrastText: '#aaaaaa'
    },
    secondary: {
      main: '#ffffff',
    },
  },
});
