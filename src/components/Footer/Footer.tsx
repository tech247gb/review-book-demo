import React from 'react';
import './Footer.css';
import { COPYRIGHT_TEXT } from "../../constants/ConstantTexts";

const Footer: React.FC = () => {
    return (
        <footer className='footer bg-primary'>
            <div className='footer-container'>
                <p>{ COPYRIGHT_TEXT }</p>
            </div>
        </footer>
    );
};

export default Footer;
