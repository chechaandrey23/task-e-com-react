import {Grid, Box, Paper, Typography, Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia,
        Tooltip, IconButton, Fab, TextField, Button, Alert} from '@mui/material';
import {GridView as GridViewIcon} from '@mui/icons-material';
import {useNavigate, NavLink} from "react-router-dom";

export function CartEmpty() {
  return (<Box sx={{width: '100%', height: '100%', mr: 0.5, ml: 0.5}}>
    <Alert severity="info" sx={{width: 'inherit', height: 'inherit'}}>
      <Grid container sx={{pr: 1, pl: 1, pt: 5, pb: 5, width: 'inherit', height: 'inherit'}}>
        <Grid item xs={12} sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>Your cart is empty!</Typography>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>Go to the catalog and add items to your cart!</Typography>
        </Grid>
        <Grid item xs={12} sx={{pt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button component={NavLink} to="/products"
                  color="primary" variant="contained" size="large"
                  startIcon={<GridViewIcon color="inherit" sx={{width: 32, height: 32}} />}>
            <Typography color="inherit" variant="h6">catalog</Typography>
          </Button>
        </Grid>
      </Grid>
    </Alert>
  </Box>);
}
