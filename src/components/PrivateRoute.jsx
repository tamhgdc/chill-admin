import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
  const isLoggedIn = Boolean(useSelector((state) => state.auth.current?._id));

  if (!isLoggedIn) return <Redirect to="/auth/login" />;
  return <Route {...props} />;
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
