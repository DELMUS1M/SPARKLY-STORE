import React, { forwardRef } from 'react';
import { CartItem, User } from '../types';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import TrashIcon from './icons/TrashIcon';
import { Page } from '../App';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onClearCart: () => void;
  onCompleteSale: () => void;
  onNavigate: (page: Page) => void;
  user: User | null;
}

const Cart: React.ForwardRefRenderFunction<HTMLButtonElement, CartProps> = ({ items, onUpdateQuantity, onClearCart, onCompleteSale, onNavigate, user }, ref) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (itemId: number, value: string) => {
    const newQuantity = parseFloat(value);
    if (!isNaN(newQuantity)) {
        onUpdateQuantity(itemId, Math.max(0, newQuantity));
    } else if (value === '') {
        onUpdateQuantity(itemId, 0);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <section className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 sm:p-8" aria-labelledby="cart-heading">
        <h1 id="cart-heading" className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">Your cart is empty.</p>
            <button 
              onClick={() => onNavigate('products')}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4 pb-2 border-b dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Product</h2>
                <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-300">Total</h2>
              </div>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="flex items-center justify-between gap-4 p-4 border dark:border-slate-700 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md bg-slate-50 dark:bg-slate-700" />
                    <div className="flex-grow">
                      <p className="font-bold text-slate-800 dark:text-slate-100">{item.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.price.toLocaleString()} Ksh / L</p>
                      <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 0.5)}
                            className="p-1 rounded-full bg-blue-100 dark:bg-slate-600 hover:bg-blue-200 dark:hover:bg-slate-500"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <MinusIcon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                          </button>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            className="w-16 text-center font-bold text-slate-800 dark:text-white bg-transparent border border-slate-300 dark:border-slate-600 rounded-md py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            aria-label={`Quantity for ${item.name} in L`}
                          />
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 0.5)}
                            className="p-1 rounded-full bg-blue-100 dark:bg-slate-600 hover:bg-blue-200 dark:hover:bg-slate-500"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <PlusIcon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                          </button>
                      </div>
                    </div>
                     <div className="flex flex-col items-end">
                      <p className="font-bold text-lg text-slate-800 dark:text-slate-100">{(item.price * item.quantity).toLocaleString()} Ksh</p>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="p-1 text-red-500 hover:text-red-700 mt-2"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 sticky top-28">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Order Summary</h2>
                  <div className="flex justify-between items-center text-xl font-bold border-t dark:border-slate-600 pt-4">
                    <span className="text-slate-800 dark:text-slate-100">Total</span>
                    <span className="text-blue-600 dark:text-blue-400">{total.toLocaleString()} Ksh</span>
                  </div>
                  <button
                    ref={ref}
                    onClick={onCompleteSale}
                    disabled={items.length === 0}
                    className={`w-full font-bold py-3 px-4 rounded-lg mt-6 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                      items.length === 0
                        ? 'bg-blue-300 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {user ? 'Proceed to Checkout' : 'Login to Continue'}
                  </button>
                   <button 
                      onClick={onClearCart}
                      className="w-full text-sm text-red-500 hover:text-red-700 font-semibold mt-4"
                      aria-label="Clear all items from cart"
                    >
                      Clear Cart
                    </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default forwardRef(Cart);
