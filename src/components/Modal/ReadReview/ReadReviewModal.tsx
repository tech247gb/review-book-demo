import React from 'react';
import { Book } from '../../Home/Home';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Book | null;
}

const ReadReviewModal: React.FC<ModalProps> = ({ isOpen, onClose, review }) => {
  if (!isOpen) return null;
  if(!review) return null

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full min-h-10  w-[300px]">
          <div className="bg-primary 100 px-4 py-3 flex justify-between">
            <h3 className="text-lg leading-6 font-medium text-white">{review.title}</h3>
            <button className="modal-close text-white" onClick={onClose}>X</button>
          </div>
          <div className="px-4 py-5 sm:p-6 overflow-auto max-h-[250px] mx-2 my-2">
            <p className="text-sm text-gray-500">{review.review}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadReviewModal;
