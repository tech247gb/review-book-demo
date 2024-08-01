import React, { useState, useEffect } from 'react';
import StarRating from '../StarRating/StarRating';
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';
// import Spinner from '../Spinner/Spinner';
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSkeleton from '../Skeltons/LoadingSkeleton';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { bookRandomCoverThemePicker } from '../../helpers/bookThemePicker.helper';
import Modal from '../Modal/Modal';
import BookReviewCard from '../BookReviewCard/BookReviewCard';
import { Book } from '../../types/Book';

// import useDebounce from '../../hooks/useDebounce';


const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;

// interface Book {
//     id: number;
//     title: string;
//     author: string;
//     review: string;
//     coverImage: string;
//     rating: number;
// }

const PAGE_SIZE = 6;

const SearchResults: React.FC = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    const { query ,booksSearchedDetails } = useSearch();
    const { currentPageContext, setCurrentPageContext, handleSearchContext ,setSearchQuery } = useSearch();
    // const debouncedSearch = useDebounce(searchQuery, 1000);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const location = useLocation();
    const [books, setBooks] = useState<Book[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true)
    // useEffect(()=>{
    //     console.log("----------------",booksSearchedDetails ,"query" ,query)
    // },[booksSearchedDetails ,query])
    // useEffect(() => {
    //     // const searchParams = new URLSearchParams(location.search);
    //     // const searchQuery = searchParams.get('query') || query;
    //     setLoading(true)
    //     const fetchReviews = async () => {
    //         try {
    //             const response = await axios.get(`${BACKEND_API_URL}/api/review/get-all-reviews`, {
    //                 params: {
    //                     searchKey: query,
    //                     page: currentPageContext,
    //                     limit: PAGE_SIZE
    //                 }
    //             });

    //             const fetchedReviews = response.data.reviews.map((review: any) => ({
    //                 id: review._id,
    //                 title: review.title,
    //                 author: review.author,
    //                 review: review.reviewText,
    //                 coverImage: `https://via.placeholder.com/${bookRandomCoverThemePicker()}?text=${encodeURIComponent(review.title)}`,
    //                 rating: review.rating,
    //             }));

    //             setBooks(fetchedReviews);
    //             setLoading(false)
    //             setTotalPages(Math.ceil(response.data.total / PAGE_SIZE));
    //         } catch (error) {
    //             setLoading(false)
    //             console.error('Error fetching reviews:', error);
    //         }
    //     };

    //     fetchReviews();
    // }, [currentPageContext, query]);

    React.useEffect(() => {
        if (location.pathname !== '/search') {
            setSearchQuery('');
        }
    }, [location.pathname, setSearchQuery]);

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPageContext(selectedPage.selected + 1);
        handleSearchContext(query ,selectedPage.selected + 1)
    };
    const handleViewMore = (book: Book) => {
        setSelectedBook(book);
    };
    const handleCloseModal = () => {
        setSelectedBook(null);
    };
    if(!query) return <>No data</>
    console.log("========================",booksSearchedDetails ,query)
    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">Book Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                   booksSearchedDetails.loading  ? (<LoadingSkeleton size={PAGE_SIZE} />) :

                   booksSearchedDetails.booksSearched.map((book) => (
                            <BookReviewCard
                                key={book.id}
                                book={book}
                                onViewMore={handleViewMore}
                            />
                        ))}
            </div>
            <div className="mt-8 flex justify-center">
                {booksSearchedDetails.booksSearched.length > 0 && <ReactPaginate
                    previousLabel={<FaChevronLeft className='w-6 h-6' />}
                    nextLabel={<FaChevronRight className='w-6 h-6' />}
                    breakLabel={'...'}
                    pageCount={Math.ceil((booksSearchedDetails.totalPages || 0) / PAGE_SIZE)}
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

export default SearchResults;
