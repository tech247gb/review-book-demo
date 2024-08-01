import axios from 'axios';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { bookRandomCoverThemePicker } from '../helpers/bookThemePicker.helper';
import { Book } from '../types/Book';

interface SearchContextProps {
    query: string;
    setSearchQuery: (query: string) => void;
    currentPageContext: number;
    setCurrentPageContext: (page: number) => void;
    handleSearchContext: (query: string ,page:number) => void;
    booksSearchedDetails: SearchBookContext
}
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const PAGE_SIZE = 6;

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

interface SearchBookContext {
    booksSearched: Book[];
    loading?: boolean;
    totalPages?: number;
}

export const SearchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [query, setSearchQuery] = useState<string>('');
    const [currentPageContext, setCurrentPageContext] = useState<number>(1);
    const [booksSearchedDetails, setBookSearchedDetails] = useState<SearchBookContext>({
        booksSearched: [],
        loading: false,
        totalPages: 0
    })
    const handleSearchContext = async (query: string ,page:number) => {
        try {
            setBookSearchedDetails((prev) => {
                return {
                    ...prev,
                    loading: true
                }
            })
            const response = await axios.get(`${BACKEND_API_URL}/api/review/get-all-reviews`, {
                params: {
                    searchKey: query,
                    page: page,
                    limit: PAGE_SIZE
                }
            });

            const fetchedReviews = response.data.reviews.map((review: any) => ({
                id: review._id,
                title: review.title,
                author: review.author,
                review: review.reviewText,
                coverImage: `https://via.placeholder.com/${bookRandomCoverThemePicker()}?text=${encodeURIComponent(review.title)}`,
                rating: review.rating,
            }));

            // setBooks(fetchedReviews);
            // setLoading(false)
            // setTotalPages(Math.ceil(response.data.total / PAGE_SIZE));
            setBookSearchedDetails({ booksSearched: fetchedReviews, loading: false, totalPages: response.data.total ?? 0 })
        } catch (error) {
            // setLoading(false)
            setBookSearchedDetails((prev) => {
                return {
                    ...prev,
                    loading: false
                }
            })

            console.error('Error fetching reviews:', error);
        }
    }

    return (
        <SearchContext.Provider value={{ query, setSearchQuery, currentPageContext, setCurrentPageContext, handleSearchContext, booksSearchedDetails }}>
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
