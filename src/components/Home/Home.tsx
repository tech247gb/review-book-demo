import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReadReviewModal from '../Modal/ReadReview/ReadReviewModal';
import { WELCOME_MESSAGE, WELCOME_TEXT, EXPLORE_BUTTON_TEXT } from '../../constants/ConstantTexts'
import ReviewSkeleton from '../Skeltons/ReviewSkelton';
import LoadingSkeleton from '../Skeltons/LoadingSkeleton';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;


interface Book {
    id: number;
    title: string;
    author: string;
    review: string;
    coverImage: string;
    rating: number;
}
const PAGE_SIZE = 5
const RECENT_REVIEWS_LENGTH =2

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [recentReviews, setRecentReviews] = useState<Book[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_URL}/api/review/get-all-reviews`, {
                    params: {
                        page: 1,
                        limit: PAGE_SIZE
                    }
                });

                const fetchedReviews = response.data.reviews.map((review: any) => ({
                    id: review._id,
                    title: review.title,
                    author: review.author,
                    review: review.reviewText,
                    coverImage: `https://via.placeholder.com/400x600?text=${encodeURIComponent(review.title)}`,
                    rating: review.rating,
                }));
                const recent = [...fetchedReviews];
                setLoading(false)
                setBooks(fetchedReviews);
                setRecentReviews(recent.slice(3));
            } catch (error) {
                setLoading(false)
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const openModal = (reviewText: string) => {
        setModalContent(reviewText);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <header className="bg-cover bg-center bg-no-repeat h-[60vh] flex items-center justify-center text-center text-white" style={{ backgroundImage: "url('/images/hero-background.jpg')" }}>
                <div className="bg-black bg-opacity-50 p-8 rounded-lg">
                    <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn">{WELCOME_TEXT}</h1>
                    <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">{WELCOME_MESSAGE}</p>
                    <Link to="/books" className="bg-primary text-primaryText py-2 px-4 rounded hover:bg-opacity-80 animate__animated animate__bounceIn">
                        {EXPLORE_BUTTON_TEXT}
                    </Link>
                </div>
            </header>

            <section className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center animate__animated animate__fadeIn">Featured Books</h2>
                <div className="flex flex-wrap gap-8 justify-center">
                    {
                        loading ? (<LoadingSkeleton size={PAGE_SIZE} width={80} />) : (
                            books.map((book) => (
                                <Link to={`/reviews/${book.id}`} className="text-blue-600">
                                    <div className="bg-white p-4 rounded-lg shadow-lg w-80 h-[300px] transform transition-transform duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-1s">
                                        <div className="w-full h-32 mb-4 overflow-hidden rounded-t-lg">
                                            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                                        <p className="text-gray-700 mb-4 line-clamp-3">{book.review}</p>

                                    </div>
                                </Link>
                            ))
                        )
                    }
                </div>
            </section>

            {/* Recent Reviews */}
            <section className="bg-gray-200 p-8 my-8">
                <h2 className="text-3xl font-bold mb-6 text-center animate__animated animate__fadeIn">Recent Reviews</h2>
                <div className="flex flex-wrap gap-8 justify-center">
                    {/* Repeat similar blocks for other recent reviews */}
                    {
                        loading ? (<ReviewSkeleton size={RECENT_REVIEWS_LENGTH} width={64} height={150} />) : (
                            recentReviews.map((book) => (
                                <div className="bg-white p-4 rounded-lg shadow-lg w-64 h-[150px] transform transition-transform duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-2s">
                                    <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                                    <p className="text-gray-700 mb-4 line-clamp-3">{book.review}</p>
                                    <button className="text-blue-600 hover:underline" onClick={() => openModal(book.review)}>Read full review</button>
                                </div>
                            ))
                        )
                    }


                    {/* Add more review cards as needed */}
                </div>
            </section>
            <ReadReviewModal
                isOpen={isModalOpen}
                onClose={closeModal}
                content={modalContent}
            />
        </div>
    );
};

export default Home;
