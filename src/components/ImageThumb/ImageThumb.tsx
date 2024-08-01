import React, { useState } from 'react';

interface ImageThumbProps {
    imageUrl: string;
}

const ImageThumb: React.FC<ImageThumbProps> = ({ imageUrl }) => {

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/400x600.png?text=No+Image'; // Fallback image URL
    };

    return (
        <div>
                <div className="mb-6">
                    <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover" onError={handleImageError} />
                </div>
        </div>
    );
}

export default ImageThumb;
