import React, { useEffect, useRef } from 'react';
import { CartItem } from '../types';

interface SaleConfirmationModalProps {
  saleItems: CartItem[];
  onClose: () => void;
}

const SaleConfirmationModal: React.FC<SaleConfirmationModalProps> = ({ saleItems, onClose }) => {
  const total = saleItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { // Shift+Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Set initial focus
    closeButtonRef.current?.focus();
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-2xl font-bold text-center text-blue-600 mb-2">Sale Completed!</h2>
        <p className="text-center text-slate-600 mb-6">Here is a summary of the transaction.</p>
        
        <div className="bg-slate-50 rounded-lg p-4 max-h-60 overflow-y-auto border">
          {saleItems.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div className="text-slate-700">
                <span className="font-semibold">{item.name}</span>
                <span className="text-sm"> (x{item.quantity})</span>
              </div>
              <div className="font-semibold text-slate-800">
                {(item.quantity * item.price).toLocaleString()} Ksh
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-xl font-bold mt-6 pt-4 border-t">
          <span className="text-slate-800">Grand Total</span>
          <span className="text-blue-600">{total.toLocaleString()} Ksh</span>
        </div>

        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg mt-8 hover:bg-blue-700 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Start New Sale
        </button>
      </div>
    </div>
  );
};

export default SaleConfirmationModal;