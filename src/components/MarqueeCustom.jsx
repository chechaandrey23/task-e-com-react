import {React, useState, useRef} from 'react';
import {Grid, Box, Paper, Typography, Rating, Tooltip, Fab, Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia} from '@mui/material';
import Marquee from "react-fast-marquee";

export function MarqueeCustom(props) {
  const [autoScrollText, setAutoScrollText] = useState(false);

  const [mouseMoveScrollText, setMouseMoveScrollText] = useState(false);

  return (<Box onClick={(e) => {
         e.preventDefault();
         setAutoScrollText(true);
         setMouseMoveScrollText(false);
       }}
       onMouseEnter={() => {
         setAutoScrollText(true);
         setMouseMoveScrollText(true);
       }}
       onMouseLeave={() => {
         //setAutoScrollText(false);
         setMouseMoveScrollText(false);
       }}>
    <Marquee gradient={false}
             speed={30}
             direction="left"
             onCycleComplete={() => {
               if(!mouseMoveScrollText) setAutoScrollText(false);
             }}
             play={autoScrollText}>
      {props.children}
    </Marquee>
  </Box>);
}
