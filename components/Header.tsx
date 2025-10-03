import React from 'react';
import Logo from './Logo';
import CartIcon from './icons/CartIcon';
import HeartIcon from './icons/HeartIcon';
import { Page } from '../App';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    cartItemCount: number;
    wishlistItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount, wishlistItemCount }) => {
  const navLinks: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'products', label: 'Products' },
    { page: 'about', label: 'About Us' },
    { page: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
            <button onClick={() => onNavigate('home')} className="flex items-center" aria-label="Go to homepage">
                <Logo className="h-12 w-12 text-blue-600" />
                <h1 className="hidden sm:block text-2xl md:text-3xl font-bold text-slate-800 ml-4">
                Sparkly Detergents
                </h1>
            </button>
            <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map(link => (
                    <button 
                        key={link.page} 
                        onClick={() => onNavigate(link.page)}
                        className="text-lg font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
            <div className="flex items-center gap-2">
                 <button onClick={() => onNavigate('wishlist')} className="relative p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors" aria-label={`View wishlist with ${wishlistItemCount} items`}>
                    <HeartIcon className="h-8 w-8" />
                    {wishlistItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                            {wishlistItemCount}
                        </span>
                    )}
                </button>
                 <button onClick={() => onNavigate('cart')} className="relative p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors" aria-label={`View cart with ${cartItemCount} items`}>
                    <CartIcon className="h-8 w-8" />
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold animate-pulse">
                            {cartItemCount}
                        </span>
                    )}
                </button>
                {/* Mobile menu button can be added here */}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;