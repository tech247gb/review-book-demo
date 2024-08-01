import React from 'react';

interface PopupModalPropos {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?:string
}

const PopupModal: React.FC<PopupModalPropos> = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="w-80 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-primary px-4 py-3">
          <h3 className="text-lg leading-6 font-medium text-white">{title}</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="px-4 py-3 bg-white sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={onConfirm}
            className="bg-red-700 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
