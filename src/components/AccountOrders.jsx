import {useEffect, useCallback, useRef, useState, useLayoutEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Grid, Box, Paper, Typography} from '@mui/material';
import {ListAlt as ListAltIcon} from '@mui/icons-material';
import {NavLink, useMatches, useNavigate, useSearchParams, useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {useFirst} from '../hooks/useFirst.js';
import {useSnackBarError} from '../hooks/useSnackBarError.jsx';

import {sagaOrders, sagaMoreOrders} from '../redux/saga/orders.js';

import {ProductsMore} from './ProductsMore';
import {AccountOrderItem} from './AccountOrderItem';
import {OrdersEmpty} from './OrdersEmpty';
import {OrdersItemSkeleton} from './OrdersItemSkeleton';

export function AccountOrders() {
  const dispatch = useDispatch();

  const logout = useSelector((state) => state.auth.logout);
  const login = useSelector((state) => state.auth.login);

  const orders = useSelector((state) => state.orders.orders);
  const paginator = useSelector((state) => state.orders.paginator);
  const loadOrders = useSelector((state) => state.orders.loadOrders);
	const loadMoreOrders = useSelector((state) => state.orders.loadMoreOrders);
  const errorMoreOrders = useSelector((state) => state.orders.errorMoreOrders);
  const errorOrders = useSelector((state) => state.orders.errorOrders);

  useEffect(() => {
    const page = 1;
    if(login && !logout) {
      dispatch(sagaOrders({
        ...(page?{page}:{}),
      }));
    }
  }, []);

  const moreFn = useCallback(() => {
		dispatch(sagaMoreOrders({
      page: paginator.getPageForQuery(),
    }));
	}, []);

  const {snackBarError} = useSnackBarError();

  useEffect(() => {
    snackBarError(errorOrders);
  }, [errorOrders]);

  useEffect(() => {
    snackBarError(errorMoreOrders);
  }, [errorMoreOrders]);

  useLayoutEffect(() => {
    document.getElementsByClassName('infinite-scroll-component')[0].style.overflow = 'inherit';
  }, []);

  const refFirst = useFirst();

  return (<Paper sx={{mt: 1}}>
    <Grid container sx={{maxWidth: 'lg'}}>
      <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2, pb: 2}}>
        <ListAltIcon color="inherit" sx={{width: 32, height: 32}} />
        <Typography variant="h4" sx={{fontWeight: 'bold'}}>Orders</Typography>
      </Grid>
      <Grid item>

      </Grid>
    </Grid>
    <Box>
      <InfiniteScroll dataLength={orders.length}
      								next={moreFn}
      								scrollThreshold={0.99}
      								loader={<ProductsMore moreLoading={loadMoreOrders || loadOrders}
                                            moreFn={moreFn}
                                            title="More Orders"
                                            disabled={refFirst.current} />}
      								endMessage={<ProductsMore moreLoading={loadMoreOrders || loadOrders}
                                                moreFn={moreFn}
                                                title="More Orders"
                                                disabled={refFirst.current} />}
      								hasMore={() => {
                        if(loadOrders || !refFirst.current) return false;
                        return paginator.hasMore();
      								}}>
        {orders.map((entry) => {
          return (
            <AccountOrderItem key={entry.id}
                              id={entry.id+'-'+entry.userId}
                              discountedTotal={entry.discountedTotal}
                              total={entry.total}
                              totalProducts={entry.totalProducts}
                              totalQuantity={entry.totalQuantity}
                              products={entry.products}/>
          );
        })}
        {(loadOrders || refFirst.current)?([1,2,3,4,5,6,7,8,9,10]).map((item) => {
          return <OrdersItemSkeleton key={item} />
        }):null}
        {orders.length == 0 && !loadMoreOrders && !loadOrders && !refFirst.current?<OrdersEmpty />:null}
      </InfiniteScroll>
    </Box>
  </Paper>);
}
