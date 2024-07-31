import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { AuthContextType, useAuthContext } from '../../context/AuthContext';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }; 
    const { setIsAuthenticated }:AuthContextType = useAuthContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string, password?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post(`${BACKEND_API_URL}/api/auth/login`, { email, password });
                const token = response.data.token;
                const userDetails:any = jwtDecode(token);
                localStorage.setItem('user', JSON.stringify(userDetails.data));
                localStorage.setItem('token', token);
                setIsAuthenticated(true)
                navigate('/user/books');
            } catch (error) {
                setLoginError('Invalid email or password');
                setTimeout(() => {
                    setLoginError('');
                }, 2000);
            }

        }
    };

    return (
        <div className="flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-[83vh]" style={{ backgroundImage: "url('/images/books-backgroung.jpg')" }}>
            <div className='bg-white p-10 rounded-lg shadow-lg min-w-[30vh] min-h-[40vh]'>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
                {loginError && (
                    <div className="bg-red-500 text-white text-center p-2 mb-4 rounded">
                        {loginError}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-primaryText p-2 rounded hover:bg-opacity-80"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
