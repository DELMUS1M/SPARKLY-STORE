import React from 'react';
import { Product } from '../types';
import { Page } from '../App';
import ProductCard from './ProductCard';
import HeartIcon from './icons/HeartIcon';

interface WishlistPageProps {
    products: Product[];
    wishlist: number[];
    onToggleWishlist: (productId: number) => void;
    onAddToCart: (product: Product) => void;
    onNavigate: (page: Page) => void;
    onSelectProduct: (productId: number) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ products, wishlist, onToggleWishlist, onAddToCart, onNavigate, onSelectProduct }) => {
    const wishlistedProducts = products.filter(product => wishlist.includes(product.id));

    return (
        <div className="container mx-auto p-4 lg:p-8">
            <section className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8" aria-labelledby="wishlist-heading">
                <h1 id="wishlist-heading" className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">My Wishlist</h1>
                
                {wishlistedProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <HeartIcon className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">Your wishlist is empty.</p>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">Click the heart on any product to save it here for later.</p>
                        <button 
                            onClick={() => onNavigate('products')}
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                        >
                            Find Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistedProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onAddToCart={onAddToCart}
                                isInWishlist={true} // Always true on this page
                                onToggleWishlist={onToggleWishlist}
                                onSelectProduct={onSelectProduct}
                             />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default WishlistPage;