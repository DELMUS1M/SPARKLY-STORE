import React, { useState, useRef, useEffect } from 'react';
import { Product, Review } from '../types';
import { Page } from '../App';
import PlusIcon from './icons/PlusIcon';
import HeartIcon from './icons/HeartIcon';
import ReviewList from './reviews/ReviewList';
import NewShareIcon from './icons/NewShareIcon';

interface ProductDetailPageProps {
  product: Product;
  reviews: Review[];
  onAddToCart: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (productId: number) => void;
  onNavigate: (page: Page) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  reviews, 
  onAddToCart, 
  wishlist, 
  onToggleWishlist,
  onNavigate
}) => {
  const originalPrice = product.price === 100 ? 120 : Math.round(product.price / 0.8);
  const showDiscount = originalPrice > product.price;
  const isInWishlist = wishlist.includes(product.id);
  const [linkCopied, setLinkCopied] = useState(false);

  // Create a valid, shareable URL for the product.
  const productUrl = `https://sparklydetergents.com/products/${product.id}`;

  const copyLinkAndShowMessage = () => {
    navigator.clipboard.writeText(productUrl).then(() => {
        setLinkCopied(true);
        setTimeout(() => {
            setLinkCopied(false);
        }, 2500);
    });
  };

  const handleShare = async () => {
    const shareData = {
        title: product.name,
        text: `Check out ${product.name} from Sparkly Detergents!`,
        url: productUrl,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        copyLinkAndShowMessage();
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-slate-50 dark:bg-slate-700 rounded-lg p-4 relative">
             {showDiscount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10 animate-pulse">
                -20% OFF
              </div>
            )}
            <img src={product.image} alt={product.name} className="max-h-96 object-contain" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <button 
              onClick={() => onNavigate('products')} 
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-2 text-left"
            >
              &larr; Back to Products
            </button>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100">{product.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">{product.description}</p>
            
            <div className="flex items-center mt-4">
              {/* Star rating display can go here */}
              <span className="text-slate-500 dark:text-slate-400 ml-2">({reviews.length} reviews)</span>
            </div>

            <div className="my-6">
              {showDiscount && (
                <p className="text-lg text-slate-400 dark:text-slate-500 line-through">
                  {originalPrice.toLocaleString()} Ksh
                </p>
              )}
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {product.price.toLocaleString()} Ksh
                <span className="text-lg font-normal text-slate-500 dark:text-slate-400"> / liter</span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-grow bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                aria-label={`Add ${product.name} to cart`}
              >
                <PlusIcon className="h-6 w-6" />
                Add to Cart
              </button>
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className="p-3 border-2 rounded-lg text-red-500 border-slate-200 dark:border-slate-600 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              >
                <HeartIcon className="h-6 w-6" filled={isInWishlist} />
              </button>
              <div className="relative">
                 <button 
                    onClick={handleShare}
                    className="p-3 border-2 rounded-lg text-blue-600 dark:text-blue-400 border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Share this product"
                  >
                    <NewShareIcon className="h-6 w-6" />
                  </button>
                  {linkCopied && (
                    <div className="absolute right-0 bottom-full mb-2 w-auto px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-semibold rounded-md shadow-lg z-10 whitespace-nowrap animate-fade-in-up">
                        Link Copied!
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg mt-8 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Customer Reviews</h2>
        <ReviewList reviews={reviews} />
      </div>

    </div>
  );
};

export default ProductDetailPage;