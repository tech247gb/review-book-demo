import React from 'react';
import { Link } from 'react-router-dom';
import { EXPLORE_BUTTON_TEXT } from '../../constants/ConstantTexts';

interface FullScreenBannerProps {
    backgroundImage: string;
    title: string;
    subtitle?: string;
}

const FullScreenBanner: React.FC<FullScreenBannerProps> = ({ backgroundImage, title, subtitle }) => {
    return (
        <div
            className="relative w-full h-[50vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
                {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
                <Link to="/books" className="bg-primary text-primaryText mt-4 py-2 px-4 rounded hover:bg-opacity-80 animate__animated animate__bounceIn">
                    {EXPLORE_BUTTON_TEXT}
                </Link>
            </div>
        </div>
    );
};

export default FullScreenBanner;