import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const Registration: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ name?: string, email?: string, password?: string }>({});
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: { name?: string, email?: string, password?: string } = {};

        if (!name) {
            newErrors.name = 'Name is required';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post(`${BACKEND_API_URL}/api/auth/signup`, { username: name, email, password });
                console.log('Registration successful:', response.data);

                setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });

                setTimeout(() => {
                    setMessage(null);
                    navigate('/login');
                }, 3000);
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
                setMessage({ type: 'error', text: errorMessage });
                console.error('Error during registration:', error);

                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        switch (id) {
            case 'name':
                setName(value);
                setErrors((prev) => ({ ...prev, name: value ? undefined : 'Name is required' }));
                break;
            case 'email':
                setEmail(value);
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setErrors((prev) => ({
                    ...prev,
                    email: value ? (emailPattern.test(value) ? undefined : 'Email is invalid') : 'Email is required',
                }));
                break;
            case 'password':
                setPassword(value);
                setErrors((prev) => ({
                    ...prev,
                    password: value ? (value.length >= 6 ? undefined : 'Password must be at least 6 characters') : 'Password is required',
                }));
                break;
        }
    };

    return (
        <div className="flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-[83vh]" style={{ backgroundImage: "url('/images/books-backgroung.jpg')" }}>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                {message && (
                    <div className={`border px-4 py-3 rounded relative mb-4 ${message.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
                        <strong className="font-bold">{message.type === 'success' ? 'Success!' : 'Error!'}</strong>
                        <span className="block sm:inline">{message.text}</span>
                    </div>
                )}
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-primaryText p-2 rounded hover:bg-opacity-80"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
