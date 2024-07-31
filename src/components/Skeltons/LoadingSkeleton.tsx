// LoadingSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
interface LoadingSkeletonProps {
    size?: number;
    width?: number
}
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ size = 1, width }) => {
    return (
        <>
            {
                Array(size).fill('').map((_) => {
                    return (
                        <div className={`${width ? `bg-white w-${width}` : ''} max-w-sm rounded overflow-hidden shadow-lg`}>
                            <div className="bg-gray-200 h-48 flex items-center justify-center">
                                <Skeleton width={100} height={32} />
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">
                                    <Skeleton width={100} />
                                </div>
                                <p className="text-gray-700 text-base">
                                    <Skeleton width={150} height={26} />
                                </p>
                                <div className="flex items-center">
                                    <Skeleton width={20} height={20} />
                                    <span className="ml-2 text-gray-500"><Skeleton width={30} /></span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
}

export default LoadingSkeleton;
