/* eslint-disable arrow-body-style */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = true;

  if (!profile) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
