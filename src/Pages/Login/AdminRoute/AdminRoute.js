import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const AdminRoute = ({ children }) => {
     const { user, isLoading, admin } = useAuth();
     const location = useLocation()
     if (isLoading) {
          return <CircularProgress></CircularProgress>
     }
     if (user.email && admin) {
          return children;
     }
     return <Navigate to="/login" state={{ from: location }} />;

};

export default AdminRoute;