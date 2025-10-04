import React from 'react';
import Logo from './Logo';
import CartIcon from './icons/CartIcon';
import HeartIcon from './icons/HeartIcon';
import UserIcon from './icons/UserIcon';
import { Page, Theme } from '../App';
import { User } from '../types';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    cartItemCount: number;
    wishlistItemCount: number;
    user: User | null;
    theme: Theme;
    onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount, wishlistItemCount, user, theme, onThemeToggle }) => {
  const navLinks: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'products', label: 'Products' },
    { page: 'about', label: 'About Us' },
    { page: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-40 dark:border-b dark:border-slate-700">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
            <button onClick={() => onNavigate('home')} className="flex items-center" aria-label="Go to homepage">
                <Logo className="h-12 w-12 text-blue-600" />
                <h1 className="hidden sm:block text-2xl md:text-3xl font-extrabold ml-4 dark:text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-400 to-green-400">
                    Sparkly Detergents
                  </span>
                </h1>
            </button>
            <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map(link => (
                    <button 
                        key={link.page} 
                        onClick={() => onNavigate(link.page)}
                        className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
            <div className="flex items-center gap-1 sm:gap-2">
                 <button onClick={() => onNavigate('wishlist')} className="relative p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors" aria-label={`View wishlist with ${wishlistItemCount} items`}>
                    <HeartIcon className="h-8 w-8" />
                    {wishlistItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                            {wishlistItemCount}
                        </span>
                    )}
                </button>
                 <button onClick={() => onNavigate('cart')} className="relative p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors" aria-label={`View cart with ${cartItemCount} items`}>
                    <CartIcon className="h-8 w-8" />
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold animate-pulse">
                            {cartItemCount}
                        </span>
                    )}
                </button>
                <button onClick={() => onNavigate('account')} className="relative p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors" aria-label="View account">
                    <UserIcon className="h-8 w-8" />
                    {user && (
                         <span className="absolute bottom-1 right-1 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                </button>
                <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;