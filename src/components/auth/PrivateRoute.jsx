// src/components/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useAuth } from '../context/authContext';
import { useAuth } from '../../context/authContext';

import { CircularProgress, Box } from '@mui/material';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;