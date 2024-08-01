import React from 'react';
import './Footer.css';
import { COPYRIGHT_TEXT } from "../../constants/ConstantTexts";

const Footer: React.FC = () => {
    return (
      <footer className="bg-primary text-white py-4 mt-auto">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">
            © 2024 Book Review Platform
          </div>
          <div className="space-x-4">
            <a href="#" className="text-sm hover:underline">About Us</a>
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;
