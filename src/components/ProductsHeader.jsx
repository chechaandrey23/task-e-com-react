import {React, useState, useEffect, useRef, useLayoutEffect} from 'react';
import {Grid, Box, Paper, Slider, Typography, Button, Collapse, CircularProgress, Autocomplete,
        TextField, Select, MenuItem, Switch, InputLabel, FormControl, Checkbox, FormControlLabel,
        Badge, Chip} from '@mui/material';
import {KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon,
        FilterAlt as FilterAltIcon, List as ListIcon, Remove as RemoveIcon,
        CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon,
        ClearAll as ClearAllIcon} from '@mui/icons-material';
import {useSelector, useDispatch} from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import * as Yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import queryString from 'query-string';
import {NavLink, useMatches, useNavigate, useSearchParams, useParams} from "react-router-dom";

import {RightBarDrawer} from './RightBarDrawer';

import {sagaCategories} from '../redux/saga/products.js';

import {saveCategories, saveSwitchCategories, savePricies, saveSwitchPricies,
        saveSorting, saveSwitchSorting, toDefault} from '../redux/filter.js';

import {unique} from '../helpers/unique.js';

const minDistance = 1;

const marks = [
  {value: 0, label: '0$'},
  {value: 250, label: '250$'},
  {value: 500, label: '500$'},
  {value: 1000, label: '1000$'},
  {value: 1500, label: '1500$'},
  {value: 2000, label: '2000$'},
];

const maxWidth = 485;

const validationSchema = Yup.object().shape({});

export function ProductsHeader() {
  const {register, handleSubmit, setValue, reset, control, formState: {errors}} = useForm({resolver: yupResolver(validationSchema)});

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const [checked, setChecked] = useState(false);
  const [openAuthcompleteCats, setOpenAuthcompleteCats] = useState(false);

  const categories = useSelector((state) => state.products.categories);
  const loadCategories = useSelector((state) => state.products.loadCategories);

  const dispatch = useDispatch();

  const ref = useRef(false);
  useEffect(() => {
    if(openAuthcompleteCats && !ref.current) {
      dispatch(sagaCategories());
      ref.current = true;
    }
  }, [openAuthcompleteCats]);

  const formRef = useRef(null);

  const {category} = useParams();
  const [searchParams] = useSearchParams();

  const defaultQueryCats = searchParams.getAll('categories[]');
  const defaultQueryPricies = searchParams.getAll('pricies[]');
  const defaultQuerySorting = searchParams.getAll('sorting[]');

  const cats = useSelector((state) => state.filter.categories);
  const switchCategories = useSelector((state) => state.filter.switchCategories);
  const pricies = useSelector((state) => state.filter.pricies);
  const switchPricies = useSelector((state) => state.filter.switchPricies);
  const sorting = useSelector((state) => state.filter.sorting);
  const switchSorting = useSelector((state) => state.filter.switchSorting);
  const defaultFilter = useSelector((state) => state.filter.defaultFilter);

  const defaultCats = defaultQueryCats.length==0?cats:unique([...defaultQueryCats, ...cats]);
  const defaultPricies = defaultQueryPricies.length==0?pricies:defaultQueryPricies;
  const defaultSorting = defaultQuerySorting.length==0?sorting:defaultQuerySorting;

  const defaultSwitchCategories = (defaultQueryCats.length > 0)?true:false;
  const defaultSwitchPricies = (defaultQueryPricies.length > 0)?true:false;
  const defaultSwitchSorting = (defaultQuerySorting.length > 0)?true:false;

  const fd = {};
  if(searchParams.keys().next().done) {// empty
    fd.cats = cats;
    fd.switchCategories = switchCategories;
    fd.pricies = pricies;
    fd.switchPricies = switchPricies;
    fd.sorting = sorting;
    fd.switchSorting = switchSorting;
  } else {
    fd.cats = defaultCats;
    fd.switchCategories = defaultSwitchCategories;
    fd.pricies = defaultPricies;
    fd.switchPricies = defaultSwitchPricies;
    fd.sorting = defaultSorting;
    fd.switchSorting = defaultSwitchSorting;
  }

  useLayoutEffect(() => {
    if(!searchParams.keys().next().done) {
      dispatch(saveCategories(defaultCats));
      dispatch(savePricies(defaultPricies));
      dispatch(saveSorting(defaultSorting));
      dispatch(saveSwitchCategories(defaultSwitchCategories));
      dispatch(saveSwitchPricies(defaultSwitchPricies));
      dispatch(saveSwitchSorting(defaultSwitchSorting));
    }
  }, [searchParams]);

  const notEmpty = !searchParams.keys().next().done;

  let countFiltres = 0;
  if(fd.switchCategories) countFiltres++;
  if(fd.switchPricies) countFiltres++;
  if(fd.switchSorting) countFiltres++;

  return (<Box>
    <Grid container>
      <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
        {isSmall?<RightBarDrawer />:null}
      </Grid>
      <Grid item xs={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', p: 1}}>
        <Badge anchorOrigin={{vertical: 'top', horizontal: 'right'}}
               color={!notEmpty?"warning":"primary"}
               badgeContent={countFiltres}>
        <Button variant="contained" color={notEmpty?"warning":"primary"} size="large"
                onClick={() => {setChecked(!checked);}}
                startIcon={checked?<KeyboardArrowUpIcon sx={{width: 32, height: 32}} color="inherit" />:
                                   <KeyboardArrowDownIcon sx={{width: 32, height: 32}} color="inherit" />}>
          <Typography variant={notEmpty?"h6":"subtitle1"}>{checked?'Filter':'Filter'}</Typography>
        </Button>
        </Badge>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={checked}>
          <Paper sx={{width: '100%', height: '100%', borderRadius: '0px', boxSizing: 'border-box', p: 1}}>
            <Box component="form" ref={formRef} onSubmit={handleSubmit((data) => {console.log(data);
              const query = Object.keys(data).reduce((acc, key) => {
                if(data[key]) {
                  if(key == 'switchCats') {
                    acc['categories'] = data['categories'];
                    //acc[key] = data[key];
                  } else if(key == 'switchPricies') {
                    acc['pricies'] = data['pricies'];
                    //acc[key] = data[key];
                  } else if(key == 'switchSorting') {
                    acc['sorting'] = data['sorting'];
                    //acc[key] = data[key];
                  }
                } else {
                  //acc[key] = '';
                }
                return acc;
              }, {});
              navigate(('/products')+'?'+queryString.stringify(query, {arrayFormat: 'bracket'}));
            })} sx={{display: 'flex', flexFlow: 'wrap', flexDirection: 'row'}}>
            <Grid container sx={{maxWidth: maxWidth+'px'}}>
              <Grid item xs={2} sx={{display: 'flex', alignItems: 'start', justifyContent: 'center', pt: 2}}>
                <Controller control={control}
                            name="switchCats"
                            defaultValue={fd.switchCategories}
                            render={({ field, fieldState: {error}}) => (
                              <FormControlLabel control={<Switch {...field} onChange={(e, value) => {
                                dispatch(saveSwitchCategories(value));
                                field.onChange(value);
                              }} checked={field.value} color="primary" />} />
                            )}/>
              </Grid>
              <Grid item xs={10} sx={{pt: 1, pb: 1}}>
                <Controller control={control}
                            name="categories"
                            defaultValue={fd.cats}
                            render={({ field, fieldState: {error}}) => (
                              <FormControl fullWidth={true}>
                                <Autocomplete disablePortal={true}
                                              multiple={true}
                                              {...field}
                                              onChange={(e, values) => {
                                                dispatch(saveCategories(values));
                                                field.onChange(values);
                                              }}
                                              open={openAuthcompleteCats}
                                              onOpen={() => {setOpenAuthcompleteCats(true);}}
                                              onClose={() => {setOpenAuthcompleteCats(false);}}
                                              isOptionEqualToValue={(option, value) => {return option == value}}
                                              getOptionLabel={(option) => option}
                                              options={categories}
                                              loading={loadCategories}
                                              disabled={!switchCategories}
                                              renderOption={(props, option, {selected}) => (
                                                <li {...props}>
                                                  <Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}/>
                                                  {option}
                                                </li>
                                              )}
                                              renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                  <Chip variant="filled"
                                                        label={option}
                                                        color="primary"
                                                        {...getTagProps({ index })} />
                                                ))
                                              }
                                              renderInput={(params) => {
                                                return(<TextField {...params}
                                                                  label="Categories"
                                                                  InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: (<>
                                                                      {loadCategories?<CircularProgress color="inherit" size={20} />:null}
                                                                      {params.InputProps.endAdornment}
                                                                    </>),
                                                                  }}
                                                        />);
                                                }
                                              }
                                />
                              </FormControl>
                            )}/>
              </Grid>
            </Grid>

            <Grid container sx={{maxWidth: maxWidth+'px'}}>
              <Grid item xs={2} sx={{display: 'flex', alignItems: 'start', justifyContent: 'center', pt: 2}}>
                <Controller control={control}
                            name="switchPricies"
                            defaultValue={fd.switchPricies}
                            render={({ field, fieldState: {error}}) => (
                              <FormControlLabel control={<Switch {...field} onChange={(e, value) => {
                                dispatch(saveSwitchPricies(value));
                                field.onChange(value);
                              }} checked={field.value} color="primary" />} />
                            )}/>
              </Grid>
              <Grid item xs={10}>
                <Controller control={control}
                            name="pricies"
                            defaultValue={[fd.pricies[0]*1, fd.pricies[1]*1]}
                            render={({ field, fieldState: {error}}) => (
                              <FormControl fullWidth={true}>
                                <Grid container sx={{pt: 1, pb: 1}}>
                                  <Grid item xs={5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                                    <TextField id="min-price" label="min-price" variant="outlined"
                                               onChange={(e) => {
                                                 const value = e.target.value * 1;
                                                 if(Number.isInteger(value) && value >= 0 && value <= 2000) {
                                                   dispatch(savePricies([value, field.value[1]]));
                                                   field.onChange([value, field.value[1]]);
                                                 } else {
                                                   dispatch(savePricies([...field.value]));
                                                   field.onChange([...field.value]);
                                                 }
                                               }}
                                               disabled={!switchPricies}
                                               sx={{width: '80px'}}
                                               value={field.value[0]} />
                                  </Grid>
                                  <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <RemoveIcon color='inherit' sx={{color: !switchPricies?'gray':'inherit'}} />
                                  </Grid>
                                  <Grid item xs={5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                    <TextField id="max-price" label="max-price" variant="outlined"
                                               onChange={(e) => {
                                                 const value = e.target.value * 1;
                                                 if(Number.isInteger(value) && value >= 0 && value <= 2000) {
                                                   dispatch(savePricies([field.value[0], value]));
                                                   field.onChange([field.value[0], value]);
                                                 } else {
                                                   dispatch(savePricies([...field.value]));
                                                   field.onChange([...field.value]);
                                                 }
                                               }}
                                               disabled={!switchPricies}
                                               sx={{width: '80px'}}
                                               value={field.value[1]} />
                                  </Grid>
                                  <Grid item xs={12} sx={{pt: 5, pr: 1.5, pl: 1.5}}>
                                    <Slider getAriaLabel={() => 'Double price slider'}
                                            value={field.value}
                                            min={0}
                                            step={1}
                                            max={2000}
                                            size="medium"
                                            disabled={!switchPricies}
                                            onChange={(event, newValue, activeThumb) => {
                                              if(!Array.isArray(newValue)) {
                                                return;
                                              }

                                              if(newValue[1] - newValue[0] < minDistance) {
                                                if(activeThumb === 0) {
                                                  const clamped = Math.min(newValue[0], 100 - minDistance);
                                                  dispatch(savePricies([clamped, clamped + minDistance]));
                                                  field.onChange([clamped, clamped + minDistance]);
                                                } else {
                                                  const clamped = Math.max(newValue[1], minDistance);
                                                  dispatch(savePricies([clamped - minDistance, clamped]));
                                                  field.onChange([clamped - minDistance, clamped]);
                                                }
                                              } else {
                                                dispatch(savePricies(newValue));
                                                field.onChange(newValue);
                                              }
                                            }}
                                            valueLabelDisplay="auto"
                                            valueLabelDisplay="on"
                                            getAriaValueText={(value) => {return value;}}
                                            disableSwap={false}
                                            color="primary"
                                            marks={marks}
                                          />
                                  </Grid>
                                </Grid>
                              </FormControl>
                            )}/>

              </Grid>
            </Grid>

            <Grid container sx={{maxWidth: maxWidth+'px'}}>
              <Grid item xs={2} sx={{display: 'flex', alignItems: 'start', justifyContent: 'center', pt: 2}}>
                <Controller control={control}
                            name="switchSorting"
                            defaultValue={fd.switchSorting}
                            render={({ field, fieldState: {error}}) => (
                              <FormControlLabel control={<Switch {...field} onChange={(e, value) => {
                                dispatch(saveSwitchSorting(value));
                                field.onChange(value);
                              }} checked={field.value} color="primary" />} />
                            )}/>
              </Grid>
              <Grid item xs={10} sx={{pt: 1, pb: 1}}>
                <Controller control={control}
                            name="sorting"
                            defaultValue={fd.sorting}
                            render={({ field, fieldState: {error}}) => (
                              <FormControl fullWidth={true}>
                                <Grid container>
                                  <Grid item xs={7} sx={{pr: 1}}>
                                    <TextField id="field-sorting"
                                               label="Sort Field"
                                               value={field.value[0]}
                                               select={true}
                                               fullWidth={true}
                                               disabled={!switchSorting}
                                               onChange={(e) => {
                                                 dispatch(saveSorting([e.target.value, field.value[1]]));
                                                 field.onChange([e.target.value, field.value[1]]);
                                               }}>
                                      {['price', 'rating', 'title', 'category', 'brand'].map((item) => {
                                        return (<MenuItem value={item}>{item}</MenuItem>);
                                      })}
                                    </TextField>
                                  </Grid>
                                  <Grid item xs={5} sx={{pl: 1}}>
                                    <TextField id="type-sorting"
                                               label="Sort Type"
                                               value={field.value[1]}
                                               select={true}
                                               fullWidth={true}
                                               disabled={!switchSorting}
                                               onChange={(e) => {
                                                 dispatch(saveSorting([field.value[0], e.target.value]));
                                                 field.onChange([field.value[0], e.target.value]);
                                               }}>
                                      {[{value: 'ASC', label: 'ascending'}, {value: 'DESC', label: 'descending'}].map((entry) => {
                                        return (<MenuItem value={entry.value}>{entry.label}</MenuItem>);
                                      })}
                                    </TextField>
                                  </Grid>
                                </Grid>
                              </FormControl>
                            )}/>
              </Grid>
            </Grid>

            </Box>
            <Grid container>
              <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', pt: 1, pb: 1}}>
                <Box sx={{pr: 2}}>
                  <Button variant="contained" color="warning" size="large"
                          onClick={() => {
                            setValue('switchCats', defaultFilter.switchCategories);
                            setValue('categories', defaultFilter.categories);
                            setValue('switchPricies', defaultFilter.switchPricies);
                            setValue('pricies', defaultFilter.pricies);
                            setValue('switchSorting', defaultFilter.switchSorting);
                            setValue('sorting', defaultFilter.sorting);

                            dispatch(toDefault());
                          }}
                          startIcon={<ClearAllIcon sx={{width: 24, height: 24}} color="inherit" />}>
                    <Typography variant="h6">{'Default'}</Typography>
                  </Button>
                </Box>
                <Box sx={{pr: 1}}>
                  <Button variant="contained" color="success" size="large"
                          onClick={() => {
                            formRef.current.requestSubmit();
                          }}
                          startIcon={<FilterAltIcon sx={{width: 24, height: 24}} color="inherit" />}>
                    <Typography variant="h6">{'Filter'}</Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
      </Grid>
    </Grid>
  </Box>);
}
