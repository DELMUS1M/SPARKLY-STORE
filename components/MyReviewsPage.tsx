import React, { useState, useMemo } from 'react';
import { Page } from '../App';
import { Sale, Review, User, Product } from '../types';
import ReviewForm from './reviews/ReviewForm';
import StarRating from './reviews/StarRating';
import StarIcon from './icons/StarIcon';

interface MyReviewsPageProps {
  onNavigate: (page: Page) => void;
  salesHistory: Sale[];
  reviews: Record<number, Review[]>;
  onAddReview: (productId: number, review: Review) => void;
  user: User;
  onSelectProduct: (productId: number) => void;
}

const MyReviewsPage: React.FC<MyReviewsPageProps> = ({ 
    onNavigate, 
    salesHistory, 
    reviews, 
    onAddReview, 
    user,
    onSelectProduct
}) => {
  const [reviewingProductId, setReviewingProductId] = useState<number | null>(null);

  const purchasedProducts = useMemo(() => {
    return salesHistory
      .flatMap(sale => sale.items)
      .reduce((acc, current) => {
        if (!acc.find(item => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, [] as Product[]);
  }, [salesHistory]);
  
  const handleAddReviewAndCloseForm = (productId: number, review: Review) => {
    onAddReview(productId, review);
    setReviewingProductId(null);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8" style={{ minHeight: 'calc(100vh - 250px)' }}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">My Reviews</h1>

        {purchasedProducts.length === 0 ? (
          <div className="text-center py-16">
            <StarIcon className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">You haven't purchased any products yet.</p>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Once you buy an item, you can review it here.</p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {purchasedProducts.map(product => {
              const userReview = reviews[product.id]?.find(r => r.name === user.name);
              
              return (
              <div key={product.id} className="border dark:border-slate-700 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-contain rounded-md bg-slate-100 dark:bg-slate-700 p-2 flex-shrink-0" />
                  <div className="flex-grow">
                    <button onClick={() => onSelectProduct(product.id)} className="text-left">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{product.name}</h2>
                    </button>
                    {userReview ? (
                       <div className="mt-2 text-left">
                         <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Your review:</p>
                         <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={userReview.rating} />
                            <span className="text-sm text-slate-500 dark:text-slate-400">({userReview.date})</span>
                         </div>
                         <p className="text-slate-700 dark:text-slate-300 mt-2 italic">"{userReview.comment}"</p>
                       </div>
                    ) : (
                       reviewingProductId !== product.id && (
                        <button 
                            onClick={() => setReviewingProductId(product.id)}
                            className="mt-4 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
                        >
                            Leave a Review
                        </button>
                       )
                    )}
                  </div>
                </div>
                {reviewingProductId === product.id && (
                    <div className="mt-4 border-t dark:border-slate-700 pt-4">
                        <ReviewForm productId={product.id} onAddReview={handleAddReviewAndCloseForm} />
                        <button onClick={() => setReviewingProductId(null)} className="text-sm text-slate-500 dark:text-slate-400 hover:underline mt-2">Cancel</button>
                    </div>
                )}
              </div>
            )})}
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

export default MyReviewsPage;