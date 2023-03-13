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

import {ShortItem} from './ShortItem';

import {handlerWheel} from '../helpers/handlerWheel.js';

import {sagaShortProducts} from '../redux/saga/products.js';

export function ShortList({list, renderItem, type}) {
  const {disableScroll, enableScroll} = usePreventBodyScroll();

  const refRoot = useRef(null);
  useEffect(() => {
    if(refRoot.current) {
      const el = refRoot.current.getElementsByClassName('react-horizontal-scrolling-menu--inner-wrapper')[0];
      el.style.position = 'relative';
    }
  }, []);

  return (<Box ref={refRoot}
               onMouseEnter={disableScroll}
               onMouseLeave={enableScroll}>
    <ScrollMenu LeftArrow={<LeftArrow size={64} type={type?type:'fab'}>
                             <SkipPreviousIcon color="warning" sx={{width: 48, height: 48}} />
                           </LeftArrow>}
                RightArrow={<RightArrow size={64} type={type?type:'fab'}>
                              <SkipNextIcon color="warning" sx={{width: 48, height: 48}} />
                            </RightArrow>}
                onWheel={handlerWheel}>
      {list.map((entry, index) => {
        if(typeof renderItem == 'function') {
          return renderItem.call(null, entry, index);
        } else {
          return (<ShortItem key={entry.id} itemId={entry.id} entry={entry} />);
        }
      })}
    </ScrollMenu>
  </Box>);
}
