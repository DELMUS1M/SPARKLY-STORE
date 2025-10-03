import React, { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import SearchIcon from './icons/SearchIcon';

interface ProductsPageProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    wishlist: number[];
    onToggleWishlist: (productId: number) => void;
    onSelectProduct: (productId: number) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onAddToCart, wishlist, onToggleWishlist, onSelectProduct }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 lg:p-8">
            <section aria-labelledby="products-heading">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <h1 id="products-heading" className="text-3xl font-bold text-slate-800">Our Products</h1>
                    <div className="relative sm:w-72">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-blue-500" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search for a product..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            aria-label="Search for a product"
                        />
                    </div>
                </div>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
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
                ) : (
                    <div className="text-center py-16 px-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-slate-700">No Products Found</h3>
                        <p className="text-slate-500 mt-2">
                            Sorry, we couldn't find any products matching your search for "{searchQuery}".
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProductsPage;