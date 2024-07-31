import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BookReview</h2>
                <p className="text-lg md:text-xl mb-8">Your number one source for book reviews.</p>
                <a href="#reviews" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg">Get Started</a>
            </div>
        </section>
    );
};

export default Hero;
