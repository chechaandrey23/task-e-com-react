import {React, useState, useRef, useEffect} from 'react';
import {Grid, Box, Paper, Typography, Alert, AlertTitle, Button,
        InputAdornment, OutlinedInput, FormHelperText, FormControl, InputLabel,
        IconButton} from '@mui/material';
import {Lock as LockIcon, AlternateEmail as AlternateEmailIcon, Save as SaveIcon,
        AppRegistration as AppRegistrationIcon, GitHub as GitHubIcon, Google as GoogleIcon,
        ClearAll as ClearAllIcon, Login as LoginIcon,
        VisibilityOff, Visibility} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';
import {NavLink, useMatches, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSelector, useDispatch} from 'react-redux';

import {errorRegistration} from '../redux/auth.js';
import {sagaRegistration} from '../redux/saga/auth.js';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('E-mail is required')
		                    .min(5, 'E-mail must be at least 5 characters')
		                    .max(255, 'E-mail must not exceed 255 characters')
                        .email('Must be a valid e-mail'),
	password: Yup.string().required('Password is required')
		                    .min(6, 'Password must be at least 6 characters')
		                    .max(255, 'Password must not exceed 255 characters'),
  password2: Yup.string().required('Confirm Password is required')
                      	 .min(6, 'Confirm Password must be at least 6 characters')
                    		 .max(255, 'Confirm Password must not exceed 255 characters')
                      	 .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit, setValue, reset, control, formState: {errors}} = useForm({resolver: yupResolver(validationSchema)});

  const error = useSelector((state) => state.auth.errorRegistration);
	const registration = useSelector((state) => state.auth.registration);
  const loadRegistration = useSelector((state) => state.auth.loadRegistration);

  const [showPassword, setShowPassword] = useState(false);
  const [iconEmailDisabled, setIconEmailDisabled] = useState(false);
  const [iconPasswordDisabled, setIconPasswordDisabled] = useState(false);
  const [iconPassword2Disabled, setIconPassword2Disabled] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {e.preventDefault();};

  const formRef = useRef(null);

  useEffect(() => {
		if(registration) {
			navigate('/account');
		}
	}, [registration]);

  useEffect(() => () => {dispatch(errorRegistration(false))}, [registration]);

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        formRef.current.requestSubmit();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (<Paper sx={{height: '100%', maxWidth: '450px', p: 2}}>
    <Grid container>
      <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="h4">Registration</Typography>
      </Grid>
      <Grid item xs={12} sx={{pt: 1, pb: 1}}>
        <Box component="form" ref={formRef} onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(sagaRegistration(data));
              })}>
          <Grid container>
            {error?<Grid item xs={12} sx={{pt: 1, pb: 1}}>
              <Alert severity="error" onClose={() => dispatch(errorRegistration(false))}>
                <AlertTitle>{'Server Error Registration'}</AlertTitle>
                <Box>
                  <Typography variant="body">{error.reason || error.message}</Typography>
                </Box>
              </Alert>
            </Grid>:null}
            <Grid item xs={12} sx={{pt: 1}}>
              <Controller control={control}
                          name="email"
                          render={({ field, fieldState: {error}}) => (
                            <FormControl sx={{}} variant="outlined" fullWidth={true} disabled={loadRegistration?true:false}>
                              <InputLabel htmlFor="adornment-email"
                                          sx={{backgroundColor: 'white', borderRadius: '4px', pl: 1, pr: 1}}
                                          error={!!errors.email}>
                                <Box sx={{display: 'flex'}}>
                                  <AlternateEmailIcon sx={{display: iconEmailDisabled?'none':'inline'}} />
                                  <Typography sx={{pl: 1}}>{'E-mail'}</Typography>
                                </Box>
                              </InputLabel>
                              <OutlinedInput
                                {...field}
                                id="adornment-email"
                                autoComplete="off"
                                error={!!errors.email}
                                onFocus={(e) => {setIconEmailDisabled(true)}}
                                onBlur={(e) => {setIconEmailDisabled(e.target.value.length>0?true:false);}}
                                aria-describedby="email-helper-text"
                              />
                              <FormHelperText id="email-helper-text" error={!!errors.email}>
                                <Typography sx={{fontWeight: 'bold'}}>{errors.email?.message}</Typography>
                              </FormHelperText>
                            </FormControl>
                          )}/>
            </Grid>
            <Grid item xs={12} sx={{pt: 1}}>
              <Controller control={control}
                          name="password"
                          render={({ field, fieldState: {error}}) => (
                            <FormControl sx={{}} variant="outlined" fullWidth={true} disabled={loadRegistration?true:false}>
                              <InputLabel htmlFor="adornment-password"
                                          sx={{backgroundColor: 'white', borderRadius: '4px', pl: 1, pr: 1}}
                                          error={!!errors.password}>
                                <Box sx={{display: 'flex'}}>
                                  <LockIcon sx={{display: iconPasswordDisabled?'none':'inline'}} />
                                  <Typography sx={{pl: 1}}>{'Password'}</Typography>
                                </Box>
                              </InputLabel>
                              <OutlinedInput
                                {...field}
                                id="adornment-password"
                                autoComplete="new-password"
                                type={showPassword?'text':'password'}
                                error={!!errors.password}
                                onFocus={(e) => {setIconPasswordDisabled(true)}}
                                onBlur={(e) => {setIconPasswordDisabled(e.target.value.length>0?true:false);}}
                                aria-describedby="password-helper-text"
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                color={!!errors.password?'error':'inherit'}
                                                edge="end">
                                      {showPassword?<VisibilityOff />:<Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText id="password-helper-text" error={!!errors.password}>
                                <Typography sx={{fontWeight: 'bold'}}>{errors.password?.message}</Typography>
                              </FormHelperText>
                            </FormControl>
                          )}/>
            </Grid>
            <Grid item xs={12} sx={{pt: 1}}>
              <Controller control={control}
                          name="password2"
                          render={({ field, fieldState: {error}}) => (
                            <FormControl sx={{}} variant="outlined" fullWidth={true} disabled={loadRegistration?true:false}>
                              <InputLabel htmlFor="adornment-password2"
                                          sx={{backgroundColor: 'white', borderRadius: '4px', pl: 1, pr: 1}}
                                          error={!!errors.password2}>
                                <Box sx={{display: 'flex'}}>
                                  <LockIcon sx={{display: iconPasswordDisabled?'none':'inline'}} />
                                  <Typography sx={{pl: 1}}>{'Confirm Password'}</Typography>
                                </Box>
                              </InputLabel>
                              <OutlinedInput
                                {...field}
                                id="adornment-password2"
                                autoComplete="new-password"
                                type={showPassword?'text':'password'}
                                error={!!errors.password2}
                                onFocus={(e) => {setIconPasswordDisabled(true)}}
                                onBlur={(e) => {setIconPasswordDisabled(e.target.value.length>0?true:false);}}
                                aria-describedby="password2-helper-text"
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                color={!!errors.password2?'error':'inherit'}
                                                edge="end">
                                      {showPassword?<VisibilityOff />:<Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText id="password2-helper-text" error={!!errors.password2}>
                                <Typography sx={{fontWeight: 'bold'}}>{errors.password2?.message}</Typography>
                              </FormHelperText>
                            </FormControl>
                          )}/>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
            <Button component={NavLink} to='/authorization'
                    variant="outlined"
                    color="info"
                    disabled={loadRegistration?true:false}
                    startIcon={<LoginIcon color="inherit" sx={{width: 24, height: 24}} />}>
              <Box><Typography sx={{fontWeight: 'bold'}}>{'Sign in'}</Typography></Box>
            </Button>
          </Grid>
          <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="outlined" color="secondary" size="large"
                    startIcon={<ClearAllIcon color="inherit" sx={{width: 24, height: 24}} />}
                    onClick={() => {
                      reset({
                        email: '',
                        password: '',
                        password2: ''
                      });
                      dispatch(errorRegistration(false));
                    }} disabled={loadRegistration?true:false}>
              <Typography sx={{fontWeight: 'bold'}}>
                {'Reset'}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
            {!loadRegistration?<Button variant="contained" color="success" size="large"
                                       startIcon={<AppRegistrationIcon color="inherit" sx={{width: 24, height: 24}} />}
                                       onClick={() => {
                                         dispatch(errorRegistration(false));
                                         formRef.current.requestSubmit();
                                       }}>
              <Typography sx={{fontWeight: 'bold'}}>
                {'Sign up'}
              </Typography>
            </Button>:<LoadingButton loading
                                     xs={{minWidth: '250px'}}
                                     loadingPosition="start"
                                     startIcon={<SaveIcon />}
                                     variant="outlined">
              <Typography sx={{fontWeight: 'bold'}}>
                {'Logining...'}
              </Typography>
            </LoadingButton>}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>);
}
