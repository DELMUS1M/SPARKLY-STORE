import React from 'react';
import { Product } from '../types';
import { Page } from '../App';
import PromotionalBanner from './PromotionalBanner';
import ProductCard from './ProductCard';
import QualityIcon from './icons/QualityIcon';
import PriceTagIcon from './icons/PriceTagIcon';
import LeafIcon from './icons/LeafIcon';
import QuoteIcon from './icons/QuoteIcon';

interface HomePageProps {
    onNavigate: (page: Page) => void;
    onAddToCart: (product: Product) => void;
    products: Product[];
    wishlist: number[];
    onToggleWishlist: (productId: number) => void;
    onSelectProduct: (productId: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onAddToCart, products, wishlist, onToggleWishlist, onSelectProduct }) => {
    const testimonials = [
        {
            quote: "I've never seen my dishes so clean! Sparkly Dish Soap cuts through grease effortlessly and smells amazing. I'm a customer for life!",
            author: "Sarah K.",
        },
        {
            quote: "The Perfumed Laundry Soap is a game-changer. My clothes have never felt softer or smelled fresher. The scent lasts for days!",
            author: "David M.",
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 text-white">
                <div className="container mx-auto text-center px-4 lg:px-8 py-24">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tighter" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                        Unleash a Symphony of Sparkle.
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto font-light">
                        Experience pure radiance in every drop. Elevate your clean.
                    </p>
                    <button 
                        onClick={() => onNavigate('products')}
                        className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-slate-100 transition-transform duration-300 hover:scale-105"
                    >
                        Shop the Collection
                    </button>
                </div>
            </section>
            
            <PromotionalBanner />

            {/* Featured Products Section */}
            <section className="container mx-auto p-4 lg:p-8" aria-labelledby="featured-products-heading">
                <h2 id="featured-products-heading" className="text-3xl font-bold text-slate-800 dark:text-slate-100 text-center mb-10">Bestsellers of the Week</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={onAddToCart}
                            isInWishlist={wishlist.includes(product.id)}
                            onToggleWishlist={onToggleWishlist} 
                            onSelectProduct={onSelectProduct}
                        />
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-slate-50 dark:bg-slate-800 py-16">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-12">The Sparkly Difference</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center">
                            <div className="bg-blue-100 dark:bg-blue-900/50 p-5 rounded-full mb-4">
                                <QualityIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Unmatched Quality</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs">Our formulas are crafted with premium ingredients for a powerful, effective clean every time.</p>
                        </div>
                        <div className="flex flex-col items-center">
                             <div className="bg-green-100 dark:bg-green-900/50 p-5 rounded-full mb-4">
                                <PriceTagIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Affordable Prices</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs">Get a luxurious clean that doesn’t break the bank. High quality shouldn't mean high cost.</p>
                        </div>
                        <div className="flex flex-col items-center">
                             <div className="bg-teal-100 dark:bg-teal-900/50 p-5 rounded-full mb-4">
                                <LeafIcon className="h-10 w-10 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Eco-Conscious</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xs">We are committed to sustainability, using biodegradable ingredients and recyclable packaging.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Testimonials Section */}
            <section className="bg-white dark:bg-slate-900 py-16">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-12">Hear from Our Happy Customers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
                                <QuoteIcon className="h-8 w-8 text-blue-300 dark:text-blue-600 mb-4 mx-auto" />
                                <p className="text-slate-600 dark:text-slate-300 italic mb-6">"{testimonial.quote}"</p>
                                <p className="font-bold text-slate-700 dark:text-slate-200">- {testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Final CTA Section */}
            <section className="bg-gradient-to-br from-blue-600 via-teal-500 to-green-500">
                <div className="container mx-auto px-4 lg:px-8 py-20 text-center text-white">
                    <h2 className="text-4xl font-extrabold mb-6">Ready to Make Your Home Sparkle?</h2>
                    <button 
                        onClick={() => onNavigate('products')}
                        className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-slate-100 transition-transform duration-300 hover:scale-105"
                    >
                        Shop All Products
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;