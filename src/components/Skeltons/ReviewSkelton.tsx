import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
interface ReviewSkeletonProps {
    size: number;
    width: number;
    height: number;
}
const ReviewSkeleton: React.FC<ReviewSkeletonProps> = ({ size = 4, width = 64, height = 150 }) => {
    return (
        <>
            <div className="flex flex-wrap gap-8 justify-center">
                {
                    Array(size).fill('size').map((_) => {
                        return (
                            <div className={`bg-white w-${width}  h-[${height}px] max-w-sm rounded overflow-hidden shadow-lg`}>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">
                                        <Skeleton width={150} height={26} />
                                    </div>
                                    <p className="text-gray-700 text-base">
                                        <Skeleton width={100} />
                                    </p>

                                    <div className="flex items-center">
                                        <Skeleton width={100} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

export default ReviewSkeleton;
