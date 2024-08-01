import React, { useState, useEffect } from 'react';
import StarRating from '../StarRating/StarRating';
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';
import Spinner from '../Spinner/Spinner';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import LoadingSkeleton from '../Skeltons/LoadingSkeleton';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

interface Book {
    _id: number;
    title: string;
    author: string;
    review: string;
    coverImage: string;
    rating: number;
}

const PAGE_SIZE = 6;

const BookList: React.FC = () => {
    const { searchQuery } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState<Book[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {

        setLoading(true)
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_URL}/api/review/get-all-reviews`, {
                    params: {
                        searchKey: searchQuery,
                        page: currentPage,
                        limit: PAGE_SIZE
                    }
                });

                const fetchedReviews = response.data.reviews.map((review: any) => ({
                    id: review.id,
                    title: review.title,
                    author: review.author,
                    review: review.review,
                    coverImage: `https://via.placeholder.com/400x600?text=${encodeURIComponent(review.title)}`,
                    rating: review.rating,
                }));

                setBooks(fetchedReviews);
                setLoading(false)
                setTotalPages(Math.ceil(response.data.total / PAGE_SIZE));
            } catch (error) {
                setLoading(false)
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [currentPage, searchQuery]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 mb-20 mt-10">
                <h2 className="text-4xl font-bold mb-6 text-center text-primary">Reviews</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        loading ? (<LoadingSkeleton size={PAGE_SIZE} />) : (
                            <>
                                {books.length > 0 ? (
                                    books.map((book, index) => (
                                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                                            <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover" />
                                            <div className="p-6">
                                                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{book.title}</h3>
                                                <p className="text-gray-600 mb-1"><strong>Author:</strong> {book.author}</p>
                                                <StarRating rating={book.rating} />
                                                <p className="text-gray-800 mt-2 mb-6 whitespace-pre-line">{book.review}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-600">No reviews available.</p>
                                )}
                            </>
                        )
                    }

                </div>
                <div className="mt-8 flex justify-around p-12">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        <FaArrowLeft />
                    </button>
                    <span className="text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>

        </>
    );
};

export default BookList;
