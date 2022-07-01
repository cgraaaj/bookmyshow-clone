import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

function ProctedRoute({ isAuth }) {
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProctedRoute;
