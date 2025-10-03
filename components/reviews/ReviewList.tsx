import React from 'react';
import { Review } from '../../types';
import StarRating from './StarRating';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-slate-50 border rounded-lg p-8 text-center">
        <p className="text-slate-500">There are no reviews for this product yet.</p>
        <p className="text-slate-500 mt-2">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <article key={index} className="p-4 border-b last:border-b-0">
          <div className="flex items-center mb-2">
            <StarRating rating={review.rating} />
            <p className="ml-4 font-bold text-slate-800">{review.name}</p>
          </div>
          <p className="text-slate-500 text-sm mb-3">{review.date}</p>
          <p className="text-slate-600">{review.comment}</p>
        </article>
      ))}
    </div>
  );
};

export default ReviewList;