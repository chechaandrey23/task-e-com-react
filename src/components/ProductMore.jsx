import {useEffect, useState, useContext, useRef, useLayoutEffect} from 'react';
import {Grid, Box, Paper, Typography, Rating,
        Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia} from '@mui/material';
import {Satellite as SatelliteIcon, SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import {LeftArrow, RightArrow} from './Arrows';
import {usePreventBodyScroll} from '../hooks/usePreventBodyScroll.js';
import Marquee from "react-fast-marquee";
import {useNavigate} from "react-router-dom";
import {Discount} from './Discount';
import {MarqueeCustom} from './MarqueeCustom';

import {handlerWheel} from '../helpers/handlerWheel.js'

import {sagaShortProducts} from '../redux/saga/products.js';

import {ShortList} from './ShortList';

export function ProductMore(props) {
  const dispatch = useDispatch();

  const shortProducts = useSelector((state) => state.products.shortProducts);
  const loadShortProducts = useSelector((state) => state.products.loadShortProducts);
  const errorShortProducts = useSelector((state) => state.products.errorShortProducts);

  useEffect(() => {
    dispatch(sagaShortProducts({category: props.category}));
  }, []);

  return (<ShortList list={shortProducts} />);
}
