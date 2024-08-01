import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileDropdown from '../User/components/DropDown/ProfileDropdown';
import { useSearch } from '../../context/SearchContext';
import { PROJECT_NAME } from '../../constants/ConstantTexts';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    // const [search, setSearch] = useState('');

    const { query, setSearchQuery, setCurrentPageContext ,handleSearchContext } = useSearch();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const location = useLocation();
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    // const handleSearchChange = (value: string) => {
    //     // setSearchQuery(value);
    // }


    const handleSearchSubmit = () => {
        handleSearchContext(query ,1)
        navigate(`/search`);
    }

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
                    {isAuthenticated && (<Link to="/user/view-reviews" className="text-white hover:text-secondary block lg:inline-block mx-2 py-2">My Reviews</Link>)}

                    <div className={`flex items-center lg:ml-4 mt-2 lg:mt-0 w-full lg:w-auto ${location.pathname === '/books' ? 'justify-between' : 'justify-end'}`}>
                        <input
                            type="text"
                            placeholder="Search by titles or authors..."
                            className="px-3 py-1 rounded text-black w-full lg:w-auto"
                            value={query}
                            onChange={(e) => setSearchQuery(e.target.value)
                            }
                        />
                        <button
                            onClick={handleSearchSubmit}
                            className="ml-2 px-3 py-1 bg-secondary text-white rounded"
                        >
                            Search
                        </button>
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
