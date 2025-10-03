import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4 lg:p-8">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">About Sparkly Detergents</h1>
                <div className="prose prose-lg max-w-4xl mx-auto text-slate-600">
                    <p>
                        Welcome to Sparkly Detergents, where our passion for clean living shines through in every bottle. Founded on the simple principle that everyone deserves a safe and sparkling clean home, we have dedicated ourselves to creating high-quality, effective, and affordable cleaning solutions for your family.
                    </p>
                    <p>
                        Our journey began in a small workshop with a single formula for dish soap. Today, we are proud to offer a diverse range of products, from powerful bleaches and disinfectants to gentle hand soaps and luxurious shampoos. Each product is carefully crafted with the best ingredients to ensure superior performance and safety.
                    </p>
                    <h2 className="text-2xl font-bold text-slate-700 mt-8">Our Mission</h2>
                    <p>
                        Our mission is to make cleaning less of a chore and more of a joy. We believe that a clean environment contributes to a happy and healthy life. That’s why we are committed to continuous innovation, sustainability, and, most importantly, our customers' satisfaction.
                    </p>
                    <p>
                        Thank you for choosing Sparkly Detergents. We're honored to be a part of your home.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;