import React from 'react';

interface StarRatingProps {
    rating: number;  // Rating out of 5
    maxRating?: number;  // Maximum rating (default is 5)
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
    const stars = Array.from({ length: maxRating }, (_, index) => (
        <svg
            key={index}
            className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'} fill-current`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
        </svg>
    ));

    return (
        <div className="flex items-center">
            {stars}
        </div>
    );
};

export default StarRating;
