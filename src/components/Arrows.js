import React from "react";
import {VisibilityContext} from "react-horizontal-scrolling-menu";
import {Backdrop, Box, IconButton, Fab} from '@mui/material';
//import {SkipNext as SkipNextIcon, SkipPrevious as SkipPreviousIcon} from '@mui/icons-material';
/*
function Arrow({children, disabled, onClick}) {
  return (<Box onClick={onClick} sx={{
    p: 1,
    display: disabled ? "none" : "flex",
    flexDirection: "column",
    justifyContent: "center",
    userSelect: "none",
    position: 'relative',
    cursor: "pointer"
  }}>
    <Box sx={{
      opacity: "0.35",
      backgroundColor: 'black',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: '0px',
      left: '0px',
    }}>
    </Box>
    {children}
  </Box>);
}
*/
function Arrow({children, disabled, onClick, size, type}) {
  if(type == 'side') {
    return (<Box onClick={onClick} sx={{
      display: disabled ? "none" : "flex",
      height: '100%',
      opacity: 0.65,
      '&:hover': {
        opacity: 0.90,
      }
    }}>
      <Box sx={{
        width: size,
        backgroundColor: 'black',
        cursor: "pointer",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //width: 'inherit',
        height: 'inherit',
        p: 3
      }}>{children}</Box>
    </Box>);
  } else if(type == 'fab') {// button
    return (<Box onClick={onClick} sx={{
      display: disabled ? "none" : "flex",
      height: 'fit-content',
      pl: 1,
      pr: 1,
    }}>
      <Fab sx={{
        width: size,
        height: size,
        backgroundColor: 'black',
        opacity: 0.90,
        '&:hover': {
          backgroundColor: 'black',
          opacity: 0.75,
        }
      }}>{children}</Fab>
    </Box>);
  } else {
    throw new Error('Unknown type(fab or side): '+type);
  }
  /*
  return (<Fab color="inherit" onClick={onClick} sx={{
    p: 1,
    backgroundColor: 'black',
    display: disabled ? "none" : "flex",
    flexDirection: "column",
    justifyContent: "center",
    userSelect: "none",
    position: 'relative',
    cursor: "pointer",
    opacity: 0.90,
    '&:hover': {
      opacity: 0.80,
      backgroundColor: 'black',
    }
  }}>
    {children}
  </Fab>);*/
}

// size, type
export function LeftArrow(props) {
  const {isFirstItemVisible, scrollPrev, visibleElements, initComplete, scrollContainer} = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(!initComplete || (initComplete && isFirstItemVisible));

  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);
  //<SkipPreviousIcon color="warning" sx={{width: 48, height: 48, zIndex: 20}} />

  React.useEffect(() => {
    if(scrollContainer.current) {
      const el = scrollContainer.current.parentNode.getElementsByClassName('react-horizontal-scrolling-menu--arrow-left')[0];
      el.style.top = props.type == 'fab'?'calc(50% - '+props.size*1/2+'px)':'0px';
      el.style.left = '0px';
      el.style.height = props.type == 'fab'?'fit-content':'100%';
      el.style.position = 'absolute';
      el.style.zIndex = '100';
    }
  }, []);

  return (<Arrow disabled={disabled} onClick={() => scrollPrev()} size={props.size} type={props.type}>
    {props.children}
  </Arrow>);
}

export function RightArrow(props) {
  const {isLastItemVisible, scrollNext, visibleElements, scrollContainer} = React.useContext(VisibilityContext);

  // console.log({ isLastItemVisible });
  const [disabled, setDisabled] = React.useState(!visibleElements.length && isLastItemVisible);

  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  React.useEffect(() => {
    if(scrollContainer.current) {
      const el = scrollContainer.current.parentNode.getElementsByClassName('react-horizontal-scrolling-menu--arrow-right')[0];
      el.style.top = props.type == 'fab'?'calc(50% - '+props.size*1/2+'px)':'0px';
      el.style.right = '0px';
      el.style.height = props.type == 'fab'?'fit-content':'100%';
      el.style.position = 'absolute';
      el.style.zIndex = '100';
    }
  }, []);

  //<SkipNextIcon color="warning" sx={{width: 48, height: 48, zIndex: 20}} />
  return (<Arrow disabled={disabled} onClick={() => scrollNext()} size={props.size} type={props.type}>
    {props.children}
  </Arrow>);
}
