import {React, useState, useRef, useEffect, useLayoutEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";

export function RedirectGuest(props = {}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useSelector((state) => state.auth.logout);
  const login = useSelector((state) => state.auth.login);

  const firstCheckAuth = useSelector((state) => state.auth.firstCheckAuth);

  useEffect(() => {
    if(firstCheckAuth && ((!login && logout) || !login)) {
      navigate('/authorization');
    }
  }, [login, logout, firstCheckAuth]);

  return (<></>);
}
