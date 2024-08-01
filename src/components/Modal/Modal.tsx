import React from 'react';
import { FaTimes, FaUser } from 'react-icons/fa';
import StarRating from '../StarRating/StarRating';
import { Book } from '../../types/Book';
import ImageThumb from '../ImageThumb/ImageThumb';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    book: Book;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, book }) => {
    React.useEffect(() => {
        // Disable body scroll when modal is open
        document.body.style.overflow = show ? 'hidden' : 'auto';
        
        return () => {
            document.body.style.overflow = 'auto'; // Re-enable body scroll when modal is closed
        };
    }, [show]);

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                >
                    <FaTimes size={20} />
                </button>
                <div className="modal-header">
                    <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
                    <ImageThumb imageUrl={book.coverImage || 'No image'} title={book.title} />
                    <div className="flex items-center mb-4">
                        <FaUser className="text-gray-600 mr-2" />
                        <p className="text-gray-600">{book.author}</p>
                        <div className="ml-auto">
                            <StarRating rating={book.rating} />
                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    <p className="text-gray-700">{book.review}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
