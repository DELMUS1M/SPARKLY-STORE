import React, { useState, useRef, useEffect } from 'react';
import { Product, Review } from '../types';
import { Page } from '../App';
import PlusIcon from './icons/PlusIcon';
import HeartIcon from './icons/HeartIcon';
import ReviewList from './reviews/ReviewList';
import ReviewForm from './reviews/ReviewForm';
import ShareIcon from './icons/ShareIcon';

interface ProductDetailPageProps {
  product: Product;
  reviews: Review[];
  onAddReview: (productId: number, review: Review) => void;
  onAddToCart: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (productId: number) => void;
  onNavigate: (page: Page) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  reviews, 
  onAddReview, 
  onAddToCart, 
  wishlist, 
  onToggleWishlist,
  onNavigate
}) => {
  const originalPrice = product.price === 100 ? 120 : Math.round(product.price / 0.8);
  const showDiscount = originalPrice > product.price;
  const isInWishlist = wishlist.includes(product.id);

  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    const shareData = {
        title: product.name,
        text: `Check out ${product.name} from Sparkly Detergents!`,
        url: window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        setIsShareMenuOpen(prev => !prev);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        setLinkCopied(true);
        setTimeout(() => {
            setLinkCopied(false);
            setIsShareMenuOpen(false);
        }, 2000);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
            setIsShareMenuOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-slate-50 rounded-lg p-4 relative">
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
              className="text-sm text-blue-600 hover:underline mb-2 text-left"
            >
              &larr; Back to Products
            </button>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800">{product.name}</h1>
            <p className="text-slate-500 mt-4 text-lg">{product.description}</p>
            
            <div className="flex items-center mt-4">
              {/* Star rating display can go here */}
              <span className="text-slate-500 ml-2">({reviews.length} reviews)</span>
            </div>

            <div className="my-6">
              {showDiscount && (
                <p className="text-lg text-slate-400 line-through">
                  {originalPrice.toLocaleString()} Ksh
                </p>
              )}
              <p className="text-4xl font-bold text-blue-600">
                {product.price.toLocaleString()} Ksh
                <span className="text-lg font-normal text-slate-500"> / liter</span>
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
                className="p-3 border-2 rounded-lg text-red-500 border-slate-200 hover:border-red-500 hover:bg-red-50 transition-colors"
                aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              >
                <HeartIcon className="h-6 w-6" filled={isInWishlist} />
              </button>
              <div className="relative" ref={shareMenuRef}>
                 <button 
                    onClick={handleShare}
                    className="p-3 border-2 rounded-lg text-blue-600 border-slate-200 hover:border-blue-500 hover:bg-blue-100 transition-colors"
                    aria-label="Share this product"
                  >
                    <ShareIcon className="h-6 w-6" />
                  </button>
                  {isShareMenuOpen && (
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border rounded-lg shadow-xl z-10">
                       {linkCopied ? (
                         <div className="p-3 text-center font-semibold text-green-600">Link Copied!</div>
                       ) : (
                         <>
                           <button onClick={handleCopyLink} className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">Copy Link</button>
                           <a href={`mailto:?subject=Check out ${product.name}&body=${product.description} ${window.location.href}`} className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">Share via Email</a>
                           <a href={`https://twitter.com/intent/tweet?text=Check out ${product.name}!&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">Share on X</a>
                           <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">Share on Facebook</a>
                         </>
                       )}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow-lg mt-8 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Leave a Review</h3>
            <ReviewForm productId={product.id} onAddReview={onAddReview} />
          </div>
          <div className="lg:col-span-2">
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductDetailPage;