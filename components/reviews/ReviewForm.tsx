import React, { useState } from 'react';
import { Review } from '../../types';
import StarRating from './StarRating';

interface ReviewFormProps {
  productId: number;
  onAddReview: (productId: number, review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onAddReview }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || rating === 0 || !comment) {
      setError('Please fill out all fields and select a rating.');
      return;
    }
    
    const newReview: Review = {
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    onAddReview(productId, newReview);
    
    // Reset form
    setName('');
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-600 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Jane Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Rating</label>
        <div className="mt-1">
            <StarRating rating={rating} onRatingChange={setRating} interactive />
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Comment</label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-600 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="What did you think?"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;