import React from "react";
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
                            <div className={`bg-white p-4 rounded-lg shadow-lg w-${width} h-[${height}px] transform transition-transform duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-2s`}>
                                <div role="status" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
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
