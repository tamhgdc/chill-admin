import { ACCESS_TOKEN } from 'constants';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
  const isLoggedIn = true || Boolean(localStorage.getItem(ACCESS_TOKEN));

  if (!isLoggedIn) return <Redirect to="/auth/login" />;
  return <Route {...props} />;
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
