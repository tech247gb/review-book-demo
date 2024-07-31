import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // Ensure to create this CSS file for modal styling

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

const ReadReviewModal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>
                <div className="modal-body">
                    {content}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ReadReviewModal;
