import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="bg-primary text-primaryText py-2 px-4 rounded hover:bg-opacity-80">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;
