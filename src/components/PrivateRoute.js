// src/components/PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// This HOC checks if the user is authenticated and has the required permission level to access the route.
const PrivateRoute = ({ component: Component, isAllowed, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAllowed ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;