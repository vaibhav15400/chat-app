/* eslint-disable arrow-body-style */
import React from 'react';
import { Container, Loader } from 'rsuite';
import { Route, Redirect } from 'react-router-dom';
import { useProfile } from '../Context/ProfileContext';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="LOADING" speed="slow" />
      </Container>
    );
  }

  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
