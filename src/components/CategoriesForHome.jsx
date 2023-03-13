import {React, useState, useRef, useEffect, useLayoutEffect, useContext} from 'react';
import {Grid, Box, Paper, Button, IconButton, Typography, AppBar, Toolbar, Tooltip,
        List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar, ListItemButton,
        Alert} from '@mui/material';
import {NavLink, useMatches, useNavigate, useSearchParams, useParams} from "react-router-dom";
import {Category as CategoryIcon, NavigateNext as NavigateNextIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';
import {useFirst} from '../hooks/useFirst.js';
import {useSnackBarError} from '../hooks/useSnackBarError.jsx';

import {sagaCategories} from '../redux/saga/products.js';

import {CategoriesItemSkeleton, CategoriesEmpty} from './Categories'

export function CategoriesForHome({isXS}) {
  const categories = useSelector((state) => state.products.categories);
  const loadCategories = useSelector((state) => state.products.loadCategories);
  const errorCategories = useSelector((state) => state.products.errorCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sagaCategories());
  }, []);

  const [arrayList, setArrayList] = useState([]);

  useEffect(() => {
    if(isXS) {
      setArrayList([categories.slice(0, Math.ceil(categories.length/2)),
                    categories.slice(Math.ceil(categories.length/2))]);
    } else {
      setArrayList([categories.slice(0, Math.ceil(categories.length/3)),
                    categories.slice(Math.ceil(categories.length/3), Math.ceil(categories.length/3) * 2),
                    categories.slice(Math.ceil(categories.length/3) * 2)]);
    }
  }, [categories, isXS]);

  const refFirst = useFirst();

  const {snackBarError} = useSnackBarError();

  useEffect(() => {
    snackBarError(errorCategories);
  }, [errorCategories]);

  if(categories.length == 0 && !loadCategories && !refFirst.current) {
    return (<><CategoriesForHomeEmpty /></>);
  }

  return (<>
    <Grid container sx={{pt: 1, pb: 1, borderTop: '1px solid gray', borderBottom: '1px solid gray'}}>
      {arrayList.map((item, index) => {
        return (<Grid item xs={arrayList.length==2?6:4} sx={{
          borderLeft: index>0?'1px solid gray':'none'
        }}>
          <List>
            {item.map((item1) => {
              return (<ListItemButton component={NavLink} to={"/products/category/"+item1}
                                      key={item1}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={item1} />
                <ListItemIcon sx={{justifyContent: 'end'}}>
                  <NavigateNextIcon />
                </ListItemIcon>
              </ListItemButton>);
            })}
            {(loadCategories || refFirst.current)?(arrayList.length==2?[1,2,3,4,5,6,7,8,9,10]:[1,2,3,4,5,6,7]).map((item) => {
              return <CategoriesItemSkeleton key={item*(index+1)} />
            }):null}
          </List>
        </Grid>);
      })}
    </Grid>
  </>);
}

export function CategoriesForHomeEmpty() {
  return (<Box sx={{width: '100%', height: '100%', mr: 0.5, ml: 0.5}}>
    <Alert severity="info" sx={{width: 'inherit', height: 'inherit'}}>
      <Grid container sx={{pr: 1, pl: 1, pt: 10, pb: 10, width: 'inherit', height: 'inherit'}}>
        <Grid item xs={12} sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>Something went wrong, there is no category!</Typography>
        </Grid>
      </Grid>
    </Alert>
  </Box>);
}
