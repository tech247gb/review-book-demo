import React from 'react';
import './Footer.css';
import { COPYRIGHT_TEXT } from "../../constants/ConstantTexts";

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-white py-4 mt-auto px-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="text-sm">
                    {COPYRIGHT_TEXT}
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <a href="#" className="text-sm hover:underline">Home</a>
                    <a href="#" className="text-sm hover:underline">About Us</a>
                    <a href="#" className="text-sm hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
