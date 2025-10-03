import React from 'react';
import { Page } from '../App';
import Logo from './Logo';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-12">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
                <Logo className="h-10 w-10 text-blue-400" />
                <h3 className="text-xl font-bold text-white ml-3">Sparkly Detergents</h3>
            </div>
            <p className="text-sm">Your trusted partner for a sparkling clean home. High-quality detergents at affordable prices.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-blue-400 transition-colors">Products</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-white mb-4">Follow Us</h4>
             <p className="text-sm mb-4">Stay up to date with our latest offers and news.</p>
             {/* Social media icons would go here */}
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Sparkly Detergents. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;