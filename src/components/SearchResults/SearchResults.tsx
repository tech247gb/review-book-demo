import React, { useState, useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LoadingSkeleton from '../Skeltons/LoadingSkeleton';
import ReactPaginate from 'react-paginate';
import Modal from '../Modal/Modal';
import BookReviewCard from '../BookReviewCard/BookReviewCard';
import { Book } from '../../types/Book';


const PAGE_SIZE = 6;

const SearchResults: React.FC = () => {
    // const [currentPage, setCurrentPage] = useState(1);
    const { query ,booksSearchedDetails } = useSearch();
    const { handleSearchContext  } = useSearch();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);


    const handlePageChange = (selectedPage: { selected: number }) => {
        handleSearchContext(query ,selectedPage.selected + 1)
    };
    const handleViewMore = (book: Book) => {
        setSelectedBook(book);
    };
    const handleCloseModal = () => {
        setSelectedBook(null);
    };
    if(!query) return <>No data</>
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
