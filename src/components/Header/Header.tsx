import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../User/components/DropDown/ProfileDropdown';
import { useSearch } from '../../context/SearchContext';
import{ PROJECT_NAME } from '../../constants/ConstantTexts'

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { searchQuery, setSearchQuery } = useSearch();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <header className="header bg-primary text-white p-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/">{PROJECT_NAME}</Link>
                </h1>
                <button
                    className="text-white block lg:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <nav className={`lg:flex ${menuOpen ? 'block' : 'hidden'} lg:items-center lg:space-x-4 w-full lg:w-auto`}>
                    <Link to="/" className="text-white hover:text-secondary block lg:inline-block mx-2 py-2">Home</Link>
                    <Link to="/books" className="text-white hover:text-secondary block lg:inline-block mx-2 py-2">Reviews</Link>
                    {!user ? (
                        <Link to="/login" className="text-white hover:text-secondary block lg:inline-block mx-2 py-2">Login</Link>
                    ) : null}
                    <div className="flex items-center lg:ml-4 mt-2 lg:mt-0 w-full lg:w-auto">
                        <input
                            type="text"
                            placeholder="Search books..."
                            className="px-3 py-1 rounded text-black w-full lg:w-auto"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="relative lg:inline-block ml-3">
                            <ProfileDropdown name={user.name} email={user.email} isAuthenticated={!!user} />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
