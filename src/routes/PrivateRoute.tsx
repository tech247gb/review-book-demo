import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const PrivateRoute: React.FC = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const verifyToken = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_URL}/api/auth/verify-jwt`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );
                // Assuming the response indicates a valid token
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                // Token is invalid or expired, redirect to login
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [setIsAuthenticated]);

    // Show a loading spinner or message while verifying
    if (loading) return <Spinner/>

    // Redirect to login page if not authenticated
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    // Render child components if authenticated
    return <Outlet />;
};

export default PrivateRoute;
