import {React, useState, useRef, useEffect, useLayoutEffect, useContext} from 'react';
import {Grid, Box, Paper, Button, IconButton, Typography, AppBar, Toolbar, Tooltip,
        List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar, ListItemButton,
        Skeleton, Alert} from '@mui/material';
import {NavLink, useMatches, useNavigate, useSearchParams, useParams} from "react-router-dom";
import {Category as CategoryIcon, NavigateNext as NavigateNextIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import {useSnackBarError} from '../hooks/useSnackBarError.jsx';

import {sagaCategories} from '../redux/saga/products.js';

import {useFirst} from '../hooks/useFirst.js';

export function Categories(props) {
  const categories = useSelector((state) => state.products.categories);
  const loadCategories = useSelector((state) => state.products.loadCategories);
  const errorCategories = useSelector((state) => state.products.errorCategories);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(sagaCategories());
  }, []);

  const {category} = useParams();

  const queryCats = searchParams.getAll('categories[]');

  const refFirst = useFirst();

  const {snackBarError} = useSnackBarError();

  useEffect(() => {
    snackBarError(errorCategories);
  }, [errorCategories]);

  return (<>
    <List>
      {categories.map((item) => {
        return (<CategoriesItem key={item} item={item} />);
      })}
      {(loadCategories || refFirst.current)?([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]).map((item) => {
        return <CategoriesItemSkeleton key={item} />
      }):null}
      {categories.length == 0 && !loadCategories && !refFirst.current?<CategoriesEmpty />:null}
    </List>
  </>);
}

export function CategoriesItem(props) {
  const {category} = useParams();

  const [searchParams] = useSearchParams();

  const queryCats = searchParams.getAll('categories[]');

  return (<ListItemButton selected={props.item==category || queryCats.includes(props.item)?true:false}
                          component={NavLink} to={"/products/category/"+props.item}
                          key={props.item}>
    <ListItemIcon>
      <CategoryIcon />
    </ListItemIcon>
    <ListItemText primary={props.item} />
    <ListItemIcon sx={{justifyContent: 'end'}}>
      <NavigateNextIcon />
    </ListItemIcon>
  </ListItemButton>);
}

export function CategoriesItemSkeleton() {
  return (<ListItemButton>
    <ListItemIcon>
      <CategoryIcon />
    </ListItemIcon>
    <Skeleton variant="text" sx={{fontSize: '2rem', width: 200}} />
    <ListItemIcon sx={{justifyContent: 'end'}}>
      <NavigateNextIcon />
    </ListItemIcon>
  </ListItemButton>);
}

export function CategoriesEmpty() {
  return (<Box sx={{pt: 5, display: 'flex', justifyContent: 'center', alignItems: 'start'}}>
    <Alert severity="info" sx={{width: 'inherit', height: 'inherit', pt: 5, pb: 5}}>
      <Typography variant="h6" sx={{fontWeight: 'bold'}}>{'Category Not Found!'}</Typography>
    </Alert>
  </Box>);
}
