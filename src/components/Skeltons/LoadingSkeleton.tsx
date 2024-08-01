// LoadingSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
interface LoadingSkeletonProps {
    size?: number;
    width?: number;
    minHeight?: string;
}
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ size = 1, width, minHeight }) => {
    return (
        <>
            {
                Array(size).fill('').map((_,index) => {
                    return (
                        <React.Fragment key={index}>
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                                <div className="relative">
                                    <h3 className="text-2xl font-semibold mb-2 p-4 bg-white bg-opacity-75"> <Skeleton width={100} /></h3>
                                    <div className="bg-gray-200 h-48 flex items-center justify-center">
                                        <Skeleton width={100} height={32} />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center mb-2">
                                    <Skeleton width={100} />
                                        <p className="text-gray-600"> </p>
                                        <div className="ml-auto">
                                        <Skeleton width={100} />
                                        </div>
                                    </div>
                                    <p className="text-gray-800 mt-2 mb-4"> <Skeleton width={100} /></p>
                                    <div className="flex justify-center">
                                    <Skeleton width={100} height={35} />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </>
    );
}

export default LoadingSkeleton;
