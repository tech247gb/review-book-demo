import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageThumbnail from '../../../ImageThumbnail/ImageThumbnail';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const ReviewForm: React.FC = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!bookTitle || !author || !reviewText) {
            setError('All fields are required.');
            return;
        }
        
        try {
            const token = localStorage.getItem('token'); 
            
            await axios.post(
                `${BACKEND_API_URL}/api/review/add-review`,
                {
                    title: bookTitle,
                    author,
                    reviewText,
                    rating,
                    imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Handle success
            setSuccess('Review added successfully!');
            setError('');

            // Reset form fields
            setBookTitle('');
            setAuthor('');
            setReviewText('');
            setRating(1);
            setImageUrl('');

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
                navigate('/user/view-reviews');
            }, 1000);
        } catch (err) {
            // Handle error
            setError('Failed to add review. Please try again.');
            setSuccess('');
        }
    };
    // const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //     e.currentTarget.src = 'https://via.placeholder.com/400x600.png?text=No+Image'; // Fallback image URL
    // };
    return (
        <div className='flex items-center bg-slate-200 min-h-screen'>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-auto">
                {success && (
                    <p className="text-green-500 text-lg mb-4">{success}</p>
                )}
                {error && (
                    <p className="text-red-500 text-lg mb-4">{error}</p>
                )}
                <h2 className="text-3xl font-bold mb-6">Review a Book</h2>
                <div className="mb-6">
                    <label htmlFor="bookTitle" className="block text-gray-700 mb-2">Book Title</label>
                    <input
                        type="text"
                        id="bookTitle"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="author" className="block text-gray-700 mb-2">Author</label>
                    <input
                        type="text"
                        id="author"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="reviewText" className="block text-gray-700 mb-2">Review Text</label>
                    <textarea
                        id="reviewText"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="rating" className="block text-gray-700 mb-2">Rating</label>
                    <select
                        id="rating"
                        className="w-full p-2 border border-gray-300 rounded"
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
                    <ImageThumbnail imageUrl={imageUrl} title={bookTitle}/>
                )}
                <button
                    type="submit"
                    className="w-full bg-primary text-primaryText p-4 rounded hover:bg-opacity-80"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
