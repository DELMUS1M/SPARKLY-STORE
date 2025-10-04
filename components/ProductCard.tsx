import React from 'react';
import { Product } from '../types';
import PlusIcon from './icons/PlusIcon';
import HeartIcon from './icons/HeartIcon';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInWishlist: boolean;
  onToggleWishlist: (productId: number) => void;
  onSelectProduct: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isInWishlist, onToggleWishlist, onSelectProduct }) => {
  const originalPrice = product.price === 100 ? 120 : Math.round(product.price / 0.8);
  const showDiscount = originalPrice > product.price;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent navigation when clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onSelectProduct(product.id);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-none dark:border dark:border-slate-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:border-blue-500 flex flex-col relative group">
       <button 
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-2 left-2 z-10 p-2 bg-white/70 dark:bg-slate-800/70 rounded-full text-red-500 hover:bg-white dark:hover:bg-slate-700 transition-colors"
        aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      >
        <HeartIcon className="h-6 w-6" filled={isInWishlist} />
      </button>
      {showDiscount && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 animate-pulse">
          -20% OFF
        </div>
      )}
      <div 
        className="cursor-pointer"
        onClick={() => onSelectProduct(product.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') onSelectProduct(product.id)}}
        aria-label={`View details for ${product.name}`}
      >
        <div className="w-full h-48 bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex-grow">{product.description}</p>
        </div>
      </div>
       <div className="p-4 pt-0 flex justify-between items-center mt-auto">
        <div>
          {showDiscount && (
            <p className="text-sm text-slate-400 dark:text-slate-500 line-through">
              {originalPrice.toLocaleString()} Ksh
            </p>
          )}
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {product.price.toLocaleString()} Ksh
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400"> / liter</span>
          </p>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          aria-label={`Add ${product.name} to cart`}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;