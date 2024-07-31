import React, { useState, useEffect } from 'react';
import StarRating from '../StarRating/StarRating';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

interface Book {
    id: number;
    title: string;
    author: string;
    review: string;
    coverImage: string;
    rating: number;
}

const PAGE_SIZE = 6;

const SearchResults: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_API_URL}/api/review/get-all-reviews`, {
                    params: { searchKey: query }
                });
                const fetchedBooks = response.data.reviews.map((review: any) => ({
                    id: review.id,
                    title: review.title,
                    author: review.author,
                    review: review.review,
                    coverImage: `https://via.placeholder.com/400x600?text=${encodeURIComponent(review.title)}`,
                    rating: review.rating,
                }));
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Error fetching reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [query]);

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };

    const paginatedBooks = books.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">Book Reviews</h2>
            {loading ? (
                <p className="text-center"><Spinner/></p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedBooks.map((book) => (
                            <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                                <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold mb-2 text-gray-800">{book.title}</h3>
                                    <p className="text-gray-600 mb-1"><strong>Author:</strong> {book.author}</p>
                                    <StarRating rating={book.rating} />
                                    <p className="text-gray-800 mt-2">{book.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(books.length / PAGE_SIZE)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchResults;
