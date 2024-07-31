import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

interface Review {
    id: number;
    title: string;
    content: string;
    coverImage: string;
    author: string;
    rating: number;
}

const SingleReview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [review, setReview] = useState<Review | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_URL}/api/review/get-review/${id}`);
                response.data.review.coverImage = `https://via.placeholder.com/400x600?text=${encodeURIComponent(response.data.review.title)}`;
                setReview(response.data.review);
            } catch (error) {
                setError('Failed to fetch the review.');
                console.error(error);
            }
        };

        fetchReview();
    }, [id]);

    if (error) {
        return <p className="text-red-500 text-center mt-4">{error}</p>;
    }

    if (!review) {
        return <p className="text-center mt-4">Loading...</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="w-full h-96 mb-6 overflow-hidden rounded-lg">
                    <img src={review.coverImage} alt={review.title} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-4xl font-bold mb-4">{review.title}</h1>
                <h2 className="text-2xl text-gray-700 mb-4">by {review.author}</h2>
                <p className="text-gray-600 mb-6 whitespace-pre-line">{review.content}</p>
            </div>
        </div>
    );
};

export default SingleReview;
