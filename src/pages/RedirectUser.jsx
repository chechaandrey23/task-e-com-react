import {React, useState, useRef, useEffect, useLayoutEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";

export function RedirectUser(props = {}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useSelector((state) => state.auth.logout);
  const login = useSelector((state) => state.auth.login);

  const firstCheckAuth = useSelector((state) => state.auth.firstCheckAuth);

  useEffect(() => {
    if(firstCheckAuth && (login && !logout)) {
      navigate('/account');
    }
  }, [login, logout, firstCheckAuth]);

  return (<></>);
}
