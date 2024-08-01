import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const ManageProfile: React.FC = () => {
    // Initial values from localStorage or default values
    const initialUser = JSON.parse(localStorage.getItem('user') || '{"name": "", "email": ""}');

    const [name, setName] = useState(initialUser.name);
    const [email, setEmail] = useState(initialUser.email);
    const [errors, setErrors] = useState<{ name?: string, email?: string }>({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const timer = setTimeout(() => setErrors({}), 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { name?: string, email?: string } = {};

        if (!name) {
            newErrors.name = 'Name is required';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                let token: any = localStorage.getItem('token');
                const response = await axios.put(`${BACKEND_API_URL}/api/user/update-user`, { updateObject: { username: name, email } }, {
                    headers: {
                        Authorization: `Bearer ${token}` // Attach the token if authentication is required
                    }
                });
                token = response.data.token;
                const userDetails: any = jwtDecode(token);
                localStorage.setItem('user', JSON.stringify(userDetails.data));
                localStorage.setItem('token', token);

                // Set success message
                setSuccessMessage('Profile updated successfully!');
            } catch (error: any) {
                console.error('Failed to update profile:', error);

                if (error.response) {
                    const responseMessage = error.response.data.message || 'An error occurred';
                    setErrors({ email: `Failed: ${responseMessage}` });
                } else {
                    setErrors({ email: 'Failed: An error occurred' });
                }
            }
        }
    };

    return (
        <div className='h-screen flex items-center bg-slate-100'>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto w-96">
                {successMessage && (
                    <p className="text-green-500 text-lg mb-4">{successMessage}</p>
                )}
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-primaryText p-3 rounded hover:bg-opacity-80"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageProfile;
