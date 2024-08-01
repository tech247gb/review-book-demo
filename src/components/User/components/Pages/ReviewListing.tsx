import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../Spinner/Spinner';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PopupModal from '../Modal/PopupModal';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const ReviewListing: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
    const [selectedReviewTitle, setSelectedReviewTitle] = useState<string | null>(null);
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

    const openDeleteModal = (reviewId: number, reviewTitle: string) => {
        setSelectedReviewId(reviewId);
        setSelectedReviewTitle(reviewTitle);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (selectedReviewId !== null) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${BACKEND_API_URL}/api/review/delete-review/${selectedReviewId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setReviews(reviews.filter(review => review._id !== selectedReviewId));
                setIsModalOpen(false);
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

    if (error) {
        return <div className="w-full h-full p-6 text-center text-red-500 min-h-screen flex items-center justify-center">{error}</div>;
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col min-h-screen'>
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
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="py-3 px-4 border-b text-left">Book Title</th>
                                            <th className="py-3 px-4 border-b text-left">Author</th>
                                            <th className="py-3 px-4 border-b text-left">Review</th>
                                            <th className="py-3 px-4 border-b text-left">Rating</th>
                                            <th className="py-3 px-4 border-b text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reviews.map(review => (
                                            <tr key={review._id} className="hover:bg-gray-50">
                                                <td className="py-4 px-4 border-b">{review.title}</td>
                                                <td className="py-4 px-4 border-b">{review.author}</td>
                                                <td className="py-4 px-4 border-b"><p className='mb-6 whitespace-pre-line'>{review.reviewText}</p></td>
                                                <td className="py-4 px-4 border-b">{review.rating} Star{review.rating > 1 ? 's' : ''}</td>
                                                <td className="py-4 px-4 border-b">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleUpdate(review)}
                                                            className="bg-primary text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteModal(review._id, review.title)}
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
                            <div className='relative p-3'>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="text-gray-700 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                                    >
                                        <FaArrowLeft />
                                    </button>
                                    <span className="text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="text-gray-700 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                                    >
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <PopupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description={`Are you sure you want to delete "${selectedReviewTitle ||''}"? This action cannot be undone.`}
            />
        </>
    );
};

export default ReviewListing;
