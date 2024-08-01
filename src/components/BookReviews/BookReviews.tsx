import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSkeleton from '../Skeltons/LoadingSkeleton';
import BookReviewCard from '../BookReviewCard/BookReviewCard';
import Modal from '../Modal/Modal';
import ReactPaginate from 'react-paginate';
import { Book } from '../../types/Book';


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;


const PAGE_SIZE = 8;

const BookReviews: React.FC = () => {

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const { currentPageContext, setCurrentPageContext } = useSearch();

    const [books, setBooks] = useState<Book[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {

        setLoading(true)
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_URL}/api/review/get-all-reviews`, {
                    params: {
                        page: currentPageContext,
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

                setBooks(fetchedReviews);
                setLoading(false)
                setTotalPages(response.data.total);
            } catch (error) {
                setLoading(false)
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [currentPageContext]);

    useEffect(() => {
        return () => {
            setCurrentPageContext(1)
        }
    })

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPageContext(selectedPage.selected + 1);
    };
    const handleViewMore = (book: Book) => {
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };


    return (
        <div className="min-h-screen container mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">Book Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    loading ? (<LoadingSkeleton size={PAGE_SIZE} />) :

                        books.map((book) => (
                            <BookReviewCard
                                key={book.id}
                                book={book}
                                onViewMore={handleViewMore}
                            />
                        ))}
            </div>
            <div className="mt-8 flex justify-center">
                {books.length > 0 && <ReactPaginate
                    previousLabel={<FaChevronLeft className='w-6 h-6' />}
                    nextLabel={<FaChevronRight className='w-6 h-6' />}
                    breakLabel={'...'}
                    pageCount={Math.ceil(totalPages / PAGE_SIZE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
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
                />}
            </div>
            {selectedBook && (
                <Modal show={Boolean(selectedBook)} onClose={handleCloseModal} book={selectedBook} />
            )}
        </div>
    );
};

export default BookReviews;
