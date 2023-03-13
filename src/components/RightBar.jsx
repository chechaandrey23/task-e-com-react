import {React, useState, useRef, useEffect, useLayoutEffect, useContext} from 'react';
import {Grid, Box, Paper, Button, IconButton, Typography, AppBar, Toolbar, Tooltip,
        List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar, ListItemButton} from '@mui/material';
import {NavLink, useMatches, useNavigate, useSearchParams, useParams} from "react-router-dom";
import {Category as CategoryIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {styled, ThemeProvider, createTheme} from '@mui/material/styles';

import {Categories} from './Categories';

import {sagaCategories} from '../redux/saga/products.js';

import {darkTheme} from '../themes/dark.right.bar.js';

import {ctxRightBar} from './BodyContent';

export function RightBar(props) {
  const navigate = useNavigate();
  const ctx = useContext(ctxRightBar);

  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const refList = useRef(null);

  const fn = () => {
    if(ctx.baseEl.current) {
      const bSize = ctx.baseEl.current.getBoundingClientRect();
      refList.current.style.minHeight = bSize.height+'px';
    }
  }

  useEffect(() => {
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    }
  }, []);

  useEffect(() => {
    fn.call(null);
  }, [products]);

  return (
    <Box ref={refList} sx={{overflowY: 'auto', height: 'calc(var(--min-height-body-content))'}}>
      <Categories />
    </Box>
  );
}
