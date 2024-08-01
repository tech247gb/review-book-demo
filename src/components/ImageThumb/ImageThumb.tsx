import React, { useRef } from 'react';
import { bookRandomCoverThemePicker } from '../../helpers/bookThemePicker.helper';

interface ImageThumbProps {
    imageUrl: string;
    title?: string;
}

const ImageThumb: React.FC<ImageThumbProps> = ({ imageUrl, title }) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const handleImageError = () => {
        if (imgRef.current) {
            imgRef.current.src = `https://via.placeholder.com/${bookRandomCoverThemePicker()}?text=${encodeURI(title || '')}`; // Fallback image URL
        }
    };

    return (
        <div>
            <div className="mb-6">
                <img ref={imgRef} src={imageUrl} className="w-full h-48 object-cover" onError={handleImageError} />
            </div>
        </div>
    );
};

export default ImageThumb;
