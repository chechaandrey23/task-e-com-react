import {React} from 'react';
import {Grid, Box, Paper} from '@mui/material';
import {LocalFireDepartment as LocalFireDepartmentIcon} from '@mui/icons-material';

export function Discount(props) {
  return (<Box sx={{
    backgroundColor: 'red',
    borderRadius: '20px',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    pl: 1,
    pr: 1,
  }}>
    <LocalFireDepartmentIcon color="inherit" width="32px" height="32" />
    {props.children}
  </Box>);
}
