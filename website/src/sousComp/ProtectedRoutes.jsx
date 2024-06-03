import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children, ...rest }) => {
  const [cookies] = useCookies(['userI']);

  return(
    cookies.userI ? <Outlet/> : <Navigate to="/Log"/>

  );
};

export default ProtectedRoute;
