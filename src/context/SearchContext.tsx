import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextProps {
    query: string;
    setSearchQuery: (query: string) => void;
    currentPageContext :number;
     setCurrentPageContext :(page: number) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [query, setSearchQuery] = useState<string>('');
    const [currentPageContext, setCurrentPageContext] = useState<number>(1);

    return (
        <SearchContext.Provider value={{ query, setSearchQuery ,currentPageContext, setCurrentPageContext}}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchContextProps => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
