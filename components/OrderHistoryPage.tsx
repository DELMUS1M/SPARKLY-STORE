import React from 'react';
import { Page } from '../App';
import { Sale } from '../types';
import ClipboardListIcon from './icons/ClipboardListIcon';

interface OrderHistoryPageProps {
  onNavigate: (page: Page) => void;
  salesHistory: Sale[];
}

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ onNavigate, salesHistory }) => {
  return (
    <div className="container mx-auto p-4 lg:p-8" style={{ minHeight: 'calc(100vh - 250px)' }}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">My Order History</h1>
        
        {salesHistory.length === 0 ? (
           <div className="text-center py-16">
            <ClipboardListIcon className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">You haven't placed any orders yet.</p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {salesHistory.map(sale => (
              <div key={sale.id} className="border dark:border-slate-700 rounded-lg overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-700 p-4 flex flex-col sm:flex-row justify-between sm:items-center border-b dark:border-slate-600">
                  <div>
                    <p className="font-bold text-slate-700 dark:text-slate-200">Order ID: #{sale.id}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Date: {sale.date}</p>
                  </div>
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400 mt-2 sm:mt-0">Total: {sale.total.toLocaleString()} Ksh</p>
                </div>
                <div className="p-4 space-y-3">
                  {sale.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-md bg-slate-100 dark:bg-slate-600 p-1" />
                      <div className="flex-grow">
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{item.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.quantity} L &times; {item.price.toLocaleString()} Ksh</p>
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{(item.quantity * item.price).toLocaleString()} Ksh</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
         <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('account')}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              &larr; Back to Account
            </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
