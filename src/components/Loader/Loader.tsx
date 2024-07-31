import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full animate-blink delay-0"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-blink delay-200"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-blink delay-400"></div>
        </div>
    );
};

export default Loader;
