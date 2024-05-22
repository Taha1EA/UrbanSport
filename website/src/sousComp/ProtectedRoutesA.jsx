import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children, ...rest }) => {
  const [cookies] = useCookies(['userA']);

  return(
    cookies.userA ? <Outlet/> : <Navigate to="/LogAdmin"/>

  );
};

export default ProtectedRoute;
