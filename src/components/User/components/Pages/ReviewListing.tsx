import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const ReviewListing: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${BACKEND_API_URL}/api/review/get-all-reviews-by-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: currentPage,
                        limit: 5,
                    },
                });
                setReviews(response.data.reviews);
                setTotalPages(Math.ceil(response.data.total / 5));
            } catch (err) {
                setError('Failed to load reviews.');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [currentPage]);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${BACKEND_API_URL}/api/review/delete-review/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setReviews(reviews.filter(review => review._id !== id));
            } catch (err) {
                setError('Failed to delete review. Please try again.');
            }
        }
    };

    const handleUpdate = (review: any) => {
        navigate(`/user/update-review/${review._id}`, { state: { review } });
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <div className="w-full h-full p-6 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="w-full h-full p-6 text-center text-red-500">{error}</div>;
    }

    return (
        <div className='h-screen flex flex-col'>
            <div className="w-full p-6 bg-gray-100 flex flex-col flex-grow">
                <div className='flex justify-between mb-5'>
                    <h2 className="text-3xl font-bold">Your Reviews</h2>
                    <button
                        onClick={() => handleNavigation('/user/review-book')}
                        className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-80"
                    >
                        Add Review
                    </button>
                </div>

                {reviews.length > 0 ? (
                    <div className="flex-1 overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-4 border-b">Book Title</th>
                                    <th className="py-3 px-4 border-b">Author</th>
                                    <th className="py-3 px-4 border-b">Review</th>
                                    <th className="py-3 px-4 border-b">Rating</th>
                                    <th className="py-3 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map(review => (
                                    <tr key={review._id} className="hover:bg-gray-50">
                                        <td className="py-4 px-4 border-b">{review.title}</td>
                                        <td className="py-4 px-4 border-b">{review.author}</td>
                                        <td className="py-4 px-4 border-b">{review.review}</td>
                                        <td className="py-4 px-4 border-b">{review.rating} Star{review.rating > 1 ? 's' : ''}</td>
                                        <td className="py-4 px-4 border-b flex flex-col items-center">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleUpdate(review)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(review._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-600">
                        <p>No records found.</p>
                    </div>
                )}

                {/* Pagination Controls */}
                {reviews.length > 0 && (
                    <div className='relative bottom-60'>
                    <div className="flex justify-between">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewListing;
