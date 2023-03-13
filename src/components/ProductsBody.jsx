import {useEffect, useCallback, useRef, useState, useLayoutEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Grid, Box, Paper} from '@mui/material';
import {NavLink, useMatches, useNavigate, useSearchParams, useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {useSnackBarError} from '../hooks/useSnackBarError.jsx';

import {sagaProducts, sagaMoreProducts} from '../redux/saga/products.js';

import {useFirst} from '../hooks/useFirst.js';

import {ProductsBodyItem} from './ProductsBodyItem';
import {ProductsMore} from './ProductsMore';
import {ProductsBodyEmpty} from './ProductsBodyEmpty';
import {ProductsBodyItemSkeleton} from './ProductsBodyItemSkeleton';

export function ProductsBody() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const paginator = useSelector((state) => state.products.paginator);
  const loadProducts = useSelector((state) => state.products.loadProducts);
  const errorProducts = useSelector((state) => state.products.errorProducts);
	const loadMoreProducts = useSelector((state) => state.products.loadMoreProducts);
  const errorMoreProducts = useSelector((state) => state.products.errorMoreProducts);

  const errorAddProduct = useSelector((state) => state.cart.errorAddProduct);

  const [searchParams] = useSearchParams();
  const {category} = useParams();

  const {snackBarError} = useSnackBarError();

  useEffect(() => {
    snackBarError(errorProducts);
  }, [errorProducts]);

  useEffect(() => {
    snackBarError(errorMoreProducts);
  }, [errorMoreProducts]);

  useEffect(() => {
    snackBarError(errorAddProduct);
  }, [errorAddProduct]);

  useEffect(() => {
    const page = 1;
    dispatch(sagaProducts({
      ...(page?{page}:{}),
      ...(category?{category}:{}),
      ...query
    }));
  }, [category, searchParams]);

  const moreFn = useCallback(() => {
		dispatch(sagaMoreProducts({
      page: paginator.getPageForQuery(),
      ...(category?{category}:{}),
      ...query
    }));
	}, [category, searchParams]);

  const refFirst = useFirst();

  useLayoutEffect(() => {
    document.getElementsByClassName('infinite-scroll-component')[0].style.overflow = 'inherit';
  }, []);

  const defaultCats = searchParams.getAll('categories[]');
  const defaultPricies = searchParams.getAll('pricies[]');
  const defaultSorting = searchParams.getAll('sorting[]');

  const query = {};
  if(defaultCats.length > 0) query.categories = defaultCats;
  if(defaultPricies.length > 0) query.pricies = defaultPricies;
  if(defaultSorting.length > 0) query.sorting = defaultSorting;

  return (<Box>
    <InfiniteScroll dataLength={products.length}
    								next={moreFn}
    								scrollThreshold={0.99}
    								loader={<ProductsMore moreLoading={loadMoreProducts || loadProducts}
                                          moreFn={moreFn}
                                          title="More Products"/>}
    								endMessage={<ProductsMore moreLoading={loadMoreProducts || loadProducts}
                                              moreFn={moreFn}
                                              title="More Products"/>}
    								hasMore={() => {
                      if(loadProducts || !refFirst.current) return false;
                      return paginator.hasMore();
    								}}>
      {(loadProducts || refFirst.current)?null:products.map((item) => {
        return (<Grid item className="card-item" key={item.id} xs={6} sm={4} md={4} lg={3} xl={2}
                      sx={{
                        position: 'relative',
                        '&:hover': {
                          boxShadow: '15px 15px 15px orange, -15px -15px 15px orange, 15px -15px 15px orange, -15px 15px 15px orange',
                          zIndex: '5',
                          transform: 'scale(1.07)',
                          '.appendix': {
                            display: 'block',
                            boxShadow: '15px 15px 15px orange, -15px 15px 15px orange',
                          }
                        }
                      }}>
          <ProductsBodyItem id={item.id}
                            title={item.title}
                            description={item.description}
                            brand={item.brand}
                            category={item.category}
                            price={item.price}
                            rating={item.rating}
                            thumbnail={item.thumbnail}
                            discountPercentage={item.discountPercentage}
                            stock={item.stock}/>
        </Grid>);
      })}
      {(loadProducts || refFirst.current)?([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]).map((item) => {
        return <ProductsBodyItemSkeleton key={item} />
      }):null}
      {products.length == 0 && !loadMoreProducts && !loadProducts && !refFirst.current?<ProductsBodyEmpty />:null}
    </InfiniteScroll>
  </Box>);
}
