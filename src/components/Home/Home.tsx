import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WELCOME_MESSAGE, WELCOME_TEXT, FEATURED_REVIEWS } from '../../constants/ConstantTexts'
import LoadingSkeleton from '../Skeltons/LoadingSkeleton';
import BookReviewCard from '../BookReviewCard/BookReviewCard';
import Modal from '../Modal/Modal';
import FullScreenBanner from '../FullScreenBanner/FullScreenBanner';
import { Book } from '../../types/Book';
import { Link } from 'react-router-dom';

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

const PAGE_SIZE = 12
const RECENT_REVIEWS_LENGTH = 8

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [recentReviews, setRecentReviews] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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
                    coverImage: review.imageUrl,
                    rating: review.rating,
                }));
                const recent = [...fetchedReviews];
                setLoading(false)
                setBooks(fetchedReviews.slice(RECENT_REVIEWS_LENGTH));
                setRecentReviews(recent.slice(0, RECENT_REVIEWS_LENGTH));
            } catch (error) {
                setLoading(false)
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);


    const handleCloseModal = () => {
        setSelectedBook(null);
    };


    const handleViewMore = (book: Book) => {
        setSelectedBook(book);
    };
    return (
        <div className="bg-gray-100">
            {/* Hero Section */}

            <FullScreenBanner backgroundImage={`/images/hero-background.jpg`} title={WELCOME_TEXT} subtitle={WELCOME_MESSAGE} />

            <section className="container mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center animate__animated animate__fadeIn mt-6">{'Recent Reviews'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        loading ? (<LoadingSkeleton size={RECENT_REVIEWS_LENGTH} />) : (
                            recentReviews.map((book) => (
                                <BookReviewCard
                                    key={book.id}
                                    book={book}
                                    onViewMore={handleViewMore}
                                />
                            ))
                        )
                    }
                </div>
            </section>

            {/* Recent Reviews */}
            <section className="container mx-auto my-8">
                <h2 className="text-3xl font-bold mb-6 text-center animate__animated animate__fadeIn">{FEATURED_REVIEWS}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
                    {/* Repeat similar blocks for other recent reviews */}
                    {
                        loading ? (<LoadingSkeleton size={2} />) : (
                            books.map((book) => (
                                <BookReviewCard
                                    key={book.id}
                                    book={{ ...book, featured: true }}
                                    onViewMore={handleViewMore}
                                />
                            ))
                        )
                    }


                    {/* Add more review cards as needed */}
                </div>
            </section>
            {selectedBook && (
                <Modal show={Boolean(selectedBook)} onClose={handleCloseModal} book={selectedBook} />
            )}
        </div>
    );
};

export default Home;
