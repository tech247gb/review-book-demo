import React, { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

interface LayoutProps {
  children: ReactNode; // Explicitly type the children prop
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
