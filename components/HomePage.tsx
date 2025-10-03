import React from 'react';
import { Product } from '../types';
import { Page } from '../App';
import PromotionalBanner from './PromotionalBanner';
import ProductCard from './ProductCard';

interface HomePageProps {
    onNavigate: (page: Page) => void;
    onAddToCart: (product: Product) => void;
    products: Product[];
    wishlist: number[];
    onToggleWishlist: (productId: number) => void;
    onSelectProduct: (productId: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onAddToCart, products, wishlist, onToggleWishlist, onSelectProduct }) => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                <div className="container mx-auto text-center px-4 lg:px-8 py-20">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Sparkly Detergents</h1>
                    <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Discover the ultimate clean for your home. Quality you can trust, at prices you'll love.</p>
                    <button 
                        onClick={() => onNavigate('products')}
                        className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-slate-100 transition-transform duration-300 hover:scale-105"
                    >
                        Shop Now
                    </button>
                </div>
            </section>
            
            <PromotionalBanner />

            {/* Featured Products Section */}
            <section className="container mx-auto p-4 lg:p-8" aria-labelledby="featured-products-heading">
                <h2 id="featured-products-heading" className="text-3xl font-bold text-slate-800 text-center mb-8">Featured Products</h2>
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
                 <div className="text-center mt-12">
                     <button 
                        onClick={() => onNavigate('products')}
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        View All Products
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;