import React from 'react';
import TagIcon from './icons/TagIcon';

const PromotionalBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-center text-center">
        <TagIcon className="h-8 w-8 mr-4 hidden sm:block flex-shrink-0" />
        <div>
          <p className="font-bold text-lg sm:text-xl">
            LIMITED TIME OFFER!
          </p>
          <p className="text-sm sm:text-base">
            Get a sparkling <span className="font-extrabold">20% OFF</span> on our bestsellers. 
            WAS <span className="line-through opacity-80">120 Ksh</span> NOW <span className="font-extrabold text-yellow-300">100 Ksh</span>.
            Hurry, limited stock!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;