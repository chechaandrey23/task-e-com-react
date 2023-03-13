import {useEffect, useState, useContext} from 'react';
import {Grid, Box, Paper, Typography, Rating,
        Card, CardActions, CardActionArea, CardContent, CardHeader, CardMedia, Tooltip} from '@mui/material';
import {CloudDownload as CloudDownloadIcon} from '@mui/icons-material';
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import {useNavigate, NavLink} from "react-router-dom";
import {Discount} from './Discount';
import {MarqueeCustom} from './MarqueeCustom';
import Image from 'mui-image';

export function ShortItem({entry, itemId}) {
  const visibility = useContext(VisibilityContext);
  const navigate = useNavigate();

  const visible = visibility.isItemVisible(itemId);

  return (<>
    <Box sx={{
      height: '300px',
      width: '200px',
      p: 1,
    }}>
      <Card sx={{
        height: '100%',
        width: '100%',
        borderRadius: '0px',
        '&:hover': {
          boxShadow: '10px 10px 10px orange, -10px -10px 10px orange, 10px -10px 10px orange, -10px 10px 10px orange',
        }
      }}>
        <CardActionArea component={NavLink} to={'/product/'+entry.id}
                        sx={{height: '100%', position: 'relative'}}>
          <CardMedia sx={{height: '150px', width: '100%', overflow: 'hidden'}}>
            <Image src={entry.thumbnail}
                   width="inherit"
                   height="inherit"
                   duration={0}
                   errorIcon={<div>ERROR!</div>}
                   showLoading={<CloudDownloadIcon sx={{color: 'text.disabled', width: 'inherit', height: 'inherit'}} />} />
          </CardMedia>
          <CardContent>
            <Grid contaner>
              <Grid item xs={12} sx={{height: '1rem'}}>
                <MarqueeCustom>
                  <Typography variant="subtitle2">
                    {entry.title}
                  </Typography>
                </MarqueeCustom>
              </Grid>
              <Grid item xs={12}>
                <Tooltip title={<Typography variant="h6" sx={{fontWeight: 'bold'}}>{entry.rating}</Typography>} arrow={true}>
                <Rating value={entry.rating}
                        precision={1}
                        />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} sx={{pl: 1}}>
                    <Typography color="secondary" sx={{textDecorationLine: 'line-through'}} variant="h6">{entry.price}{'$'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="error" variant="h4">{(entry.price*(100-entry.discountPercentage)/100).toFixed(2)}{'$'}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent sx={{position: 'absolute', zIndex: '2', top: '1px', left: '1px'}}>
            <Discount>
              <Typography variant="h6" sx={{fontWeight: 'bold'}}>{'-'+entry.discountPercentage+'%'}</Typography>
            </Discount>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  </>);
}
