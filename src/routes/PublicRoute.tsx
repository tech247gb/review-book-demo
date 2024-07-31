import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PublicRoute: React.FC = () => {
    const { isAuthenticated } = useAuthContext();

    // Redirect to home page if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/user/view-reviews" replace />;
    }

    // Render child components if not authenticated
    return <Outlet />;
};

export default PublicRoute;
