import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageThumb from '../../../ImageThumb/ImageThumb';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const UpdateReviewForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const review = location.state?.review;

    const [title, setBookTitle] = useState(review?.title || '');
    const [author, setAuthor] = useState(review?.author || '');
    const [reviewText, setReviewText] = useState(review?.reviewText || '');
    const [rating, setRating] = useState(review?.rating || 1);
    const [successMessage, setSuccessMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(review?.imageUrl || '');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            await axios.put(
                `${BACKEND_API_URL}/api/review/edit-review/${review._id}`,
                {updateObject:{
                    title,
                    author,
                    reviewText,
                    rating,
                    imageUrl
                }},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token if authentication is required
                    },
                }
            );

            // Show success message
            setSuccessMessage('Review updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/user/view-reviews');
            }, 3000);
        } catch (err) {
            console.error('Failed to update review', err);
        }
    };
    // const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //     e.currentTarget.src = 'https://via.placeholder.com/400x600.png?text=No+Image'; // Fallback image URL
    // };

    return (
        <div className='form-container flex justify-center items-center bg-slate-200'>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mx-auto">
            {successMessage && (
                <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">
                    {successMessage}
                </div>
            )}
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Update Review</h2>
            <div className="mb-6">
                <label htmlFor="bookTitle" className="block text-gray-700 text-sm font-medium mb-2">Book Title</label>
                <input
                    type="text"
                    id="bookTitle"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={title}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="author" className="block text-gray-700 text-sm font-medium mb-2">Author</label>
                <input
                    type="text"
                    id="author"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="reviewText" className="block text-gray-700 text-sm font-medium mb-2">Review Text</label>
                <textarea
                    id="reviewText"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="mb-6">
                <label htmlFor="rating" className="block text-gray-700 text-sm font-medium mb-2">Rating</label>
                <select
                    id="rating"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                >
                    {[1, 2, 3, 4, 5].map(star => (
                        <option key={star} value={star}>{star} Star{star > 1 && 's'}</option>
                    ))}
                </select>
            </div>
            <div className="mb-6">
                    <label htmlFor="imageUrl" className="block text-gray-700 mb-2">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                {imageUrl && (
                    <ImageThumb imageUrl={imageUrl} title={title}/>
                )}

            <button
                type="submit"
                className="w-full bg-primary text-white p-4 rounded-lg shadow-md hover:bg-primary-dark transition duration-300"
            >
                Update Review
            </button>
        </form>
        </div>
    );
};

export default UpdateReviewForm;
