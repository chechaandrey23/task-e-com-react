import {useRef, createContext, useContext} from 'react';
import {Grid, Box, Paper, Breadcrumbs, Typography} from '@mui/material';
import {NavLink, useMatches, useNavigate} from "react-router-dom";
import {NavigateNext as NavigateNextIcon, Cottage as CottageIcon,
        ViewList as ViewListIcon, Category as CategoryIcon} from '@mui/icons-material';

export function BreadCrumbs(props = {}) {

  return (<Box sx={{p:1, pt:2, pb: 2}}>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}
                 aria-label="breadcrumb">
      <Box component={NavLink}
           to="/"
           color="inherit"
           sx={{display: 'flex',
                '&:hover': {textDecoration: 'underline'},
                flexDirection: 'row',
                alignItems: 'center',
                textDecoration: 'none'
              }}>
        <CottageIcon sx={{mr: 0.5}} fontSize="inherit" />
        <Typography variant="subtitle1">home</Typography>
      </Box>
      <Box component={NavLink}
           to="/products"
           color="inherit"
           sx={{display: 'flex',
                '&:hover': {textDecoration: 'underline'},
                flexDirection: 'row',
                alignItems: 'center',
                textDecoration: 'none'
              }}>
        <ViewListIcon sx={{mr: 0.5}} fontSize="inherit" />
        <Typography variant="subtitle1">catalog</Typography>
      </Box>
      {props.category?<Box component={NavLink}
                           to={"/products/category/"+props.category}
                           color="inherit"
                           sx={{display: 'flex',
                                '&:hover': {textDecoration: 'underline'},
                                flexDirection: 'row',
                                alignItems: 'center',
                                textDecoration: 'none'
                              }}>
        <CategoryIcon sx={{mr: 0.5}} fontSize="inherit" />
        <Typography variant="subtitle1">{props.category}</Typography>
      </Box>:null}
    </Breadcrumbs>
  </Box>);
}
