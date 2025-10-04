import React from 'react';
import CartIcon from './icons/CartIcon';
import { Page } from '../App';

interface FloatingCartButtonProps {
    cartItemCount: number;
    onNavigate: (page: Page) => void;
    currentPage: Page;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ cartItemCount, onNavigate, currentPage }) => {
    const isButtonVisible = currentPage !== 'cart' && cartItemCount > 0;

    return (
        <button
            onClick={() => onNavigate('cart')}
            className={`fixed bottom-8 right-8 z-30 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300
                ${isButtonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`
            }
            aria-label={`View cart with ${cartItemCount} items`}
            tabIndex={isButtonVisible ? 0 : -1}
        >
            <CartIcon className="h-8 w-8" />
            <span className="absolute -top-1 -right-1 block h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold border-2 border-white">
                {cartItemCount}
            </span>
        </button>
    );
};

export default FloatingCartButton;
