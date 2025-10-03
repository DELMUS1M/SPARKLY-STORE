import React, { forwardRef } from 'react';
import { CartItem } from '../types';
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
}

const Cart: React.ForwardRefRenderFunction<HTMLButtonElement, CartProps> = ({ items, onUpdateQuantity, onClearCart, onCompleteSale, onNavigate }, ref) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (itemId: number, value: string) => {
    if (value === '') {
      onUpdateQuantity(itemId, 0);
      return;
    }

    if (/^\d*$/.test(value)) {
        const newQuantity = parseInt(value, 10);
        if (!isNaN(newQuantity)) {
            onUpdateQuantity(itemId, newQuantity < 0 ? 0 : newQuantity);
        } else if (value === '') {
            onUpdateQuantity(itemId, 0);
        }
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8" aria-labelledby="cart-heading">
        <h1 id="cart-heading" className="text-3xl font-bold text-slate-800 mb-6">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-slate-500 mb-6">Your cart is empty.</p>
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
              <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <h2 className="text-lg font-semibold text-slate-600">Product</h2>
                <h2 className="text-lg font-semibold text-slate-600">Total</h2>
              </div>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.id} className="flex items-center justify-between gap-4 p-4 border rounded-lg">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md bg-slate-50" />
                    <div className="flex-grow">
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.price.toLocaleString()} Ksh / liter</p>
                      <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full bg-blue-100 hover:bg-blue-200"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <MinusIcon className="h-4 w-4 text-blue-600" />
                          </button>
                          <input
                            type="text"
                            pattern="\d*"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            className="w-12 text-center font-bold text-slate-800 border border-slate-300 rounded-md py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            aria-label={`Quantity for ${item.name} in liters`}
                          />
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full bg-blue-100 hover:bg-blue-200"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <PlusIcon className="h-4 w-4 text-blue-600" />
                          </button>
                      </div>
                    </div>
                     <div className="flex flex-col items-end">
                      <p className="font-bold text-lg text-slate-800">{(item.price * item.quantity).toLocaleString()} Ksh</p>
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
              <div className="bg-slate-50 rounded-lg p-6 sticky top-28">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">Order Summary</h2>
                  <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                    <span className="text-slate-800">Total</span>
                    <span className="text-blue-600">{total.toLocaleString()} Ksh</span>
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
                    Proceed to Checkout
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