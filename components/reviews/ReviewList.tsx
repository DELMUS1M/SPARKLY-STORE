import React from 'react';
import { Review } from '../../types';
import StarRating from './StarRating';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-700 border dark:border-slate-600 rounded-lg p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">There are no reviews for this product yet.</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <article key={index} className="p-4 border-b dark:border-slate-700 last:border-b-0">
          <div className="flex items-center mb-2">
            <StarRating rating={review.rating} />
            <p className="ml-4 font-bold text-slate-800 dark:text-slate-100">{review.name}</p>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">{review.date}</p>
          <p className="text-slate-600 dark:text-slate-300">{review.comment}</p>
        </article>
      ))}
    </div>
  );
};

export default ReviewList;