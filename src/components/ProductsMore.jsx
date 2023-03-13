import * as React from 'react';
import {Box, Typography, Grid, Paper, Skeleton, Fab, Button} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Add as AddIcon, Save as SaveIcon} from '@mui/icons-material';

export function ProductsMore(props) {
  return (<Grid item key={'more-loader'} xs={12} sx={{display: 'flex', justifyContent: 'center', height: '100%'}}>
    <Paper sx={{display: 'flex', justifyContent: 'center', borderRadius: '0px', width: '100%', height: '100%', pb: 3, pt: 3, mt: 1}}>
      {props.moreLoading?<LoadingButton loading
                                        size="large"
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        sx={{minWidth: '75%'}}
                                        variant="outlined">
        {'Loading...'}
      </LoadingButton>:<Button variant="contained"
                               size="large"
                               onClick={props.moreFn}
                               disabled={props.disabled || false}
                               sx={{minWidth: '75%'}}>
        {props.title?props.title:'More'}
      </Button>}
    </Paper>
  </Grid>);
}
