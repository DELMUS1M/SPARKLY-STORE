import React, { useEffect, useState } from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in right after mount
    const enterTimer = setTimeout(() => setVisible(true), 10);
    
    // Start timer to animate out
    const exitTimer = setTimeout(() => {
      setVisible(false);
      // Unmount after animation
      const unmountTimer = setTimeout(onClose, 300);
      return () => clearTimeout(unmountTimer);
    }, 3000);
    
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-24 right-5 z-50 flex items-center w-full max-w-xs p-4 text-slate-600 dark:text-slate-200 bg-white dark:bg-slate-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
        <CheckCircleIcon className="w-5 h-5" />
      </div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-500 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
        onClick={handleClose}
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  );
};

export default Toast;