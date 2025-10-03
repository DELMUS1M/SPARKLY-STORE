import React, { useState, useEffect, useRef } from 'react';
import MpesaIcon from './icons/MpesaIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import PaypalIcon from './icons/PaypalIcon';
import CryptoIcon from './icons/CryptoIcon';
import Spinner from './Spinner';
import CopyIcon from './icons/CopyIcon';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

type PaymentMethod = 'mpesa' | 'card' | 'paypal' | 'crypto';

const CRYPTO_ADDRESS = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

const PaymentModal: React.FC<PaymentModalProps> = ({ total, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [stkPushSent, setStkPushSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Reset M-Pesa state when payment method changes
    setStkPushSent(false);
    setPhoneNumber('');
  }, [paymentMethod]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      // Basic focus trapping
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handlePayment = () => {
    if (paymentMethod === 'mpesa') {
      // Step 1: Send STK Push
      if (!stkPushSent) {
        if (!/^(07|01)\d{8}$/.test(phoneNumber)) {
          alert('Please enter a valid Kenyan phone number (e.g., 0712345678 or 0112345678).');
          return;
        }
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setStkPushSent(true);
        }, 1500); // Simulate sending request
      } else {
        // Step 2: Finalize Payment
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          onPaymentSuccess();
        }, 2000); // Simulate user entering PIN and confirmation
      }
    } else {
      // Handling for other payment methods
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess();
      }, 2500);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CRYPTO_ADDRESS).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };
  
  const paymentOptions: { id: PaymentMethod; name: string; icon: React.ReactNode }[] = [
    { id: 'mpesa', name: 'M-Pesa', icon: <MpesaIcon className="h-6 w-6" /> },
    { id: 'card', name: 'Card', icon: <CreditCardIcon className="h-6 w-6" /> },
    { id: 'paypal', name: 'PayPal', icon: <PaypalIcon className="h-6 w-6" /> },
    { id: 'crypto', name: 'Crypto', icon: <CryptoIcon className="h-6 w-6" /> },
  ];
  
  const getButtonText = () => {
    if (paymentMethod === 'mpesa') {
      return stkPushSent ? 'Complete Payment' : 'Send Payment Request';
    }
    return `Pay ${total.toLocaleString()} Ksh`;
  };

  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'mpesa':
        if (stkPushSent) {
          return (
             <div className="mt-6 text-center bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-800">Request Sent!</p>
                <p className="text-green-700 text-sm mt-1">
                  A prompt has been sent to <span className="font-bold">{phoneNumber}</span>. Please enter your M-PESA PIN to authorize the payment.
                </p>
            </div>
          );
        }
        return (
          <div className="mt-6">
            <label htmlFor="phone-number" className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 0712345678"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        );
      case 'card':
        return <p className="text-slate-600 mt-6 text-center">Card payment is currently unavailable. Please select another method.</p>;
      case 'paypal':
        return <p className="text-slate-600 mt-6 text-center">You will be redirected to PayPal to complete your payment.</p>;
      case 'crypto':
        return (
          <div className="mt-6 text-center">
            <h3 className="font-semibold text-slate-700">Pay with Crypto</h3>
            <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">Scan the QR code or copy the address below to send <span className="font-bold">BTC</span>.</p>
                <div className="flex justify-center">
                    <div className="bg-white p-2 rounded-lg shadow-inner">
                        <svg className="w-32 h-32" viewBox="0 0 256 256"><path fill="#4A4A4A" d="M128 0h-32v32h32V0ZM96 32V0H64v32h32ZM64 64V32H32v32h32ZM32 96V64H0v32h32ZM0 128v-32h32v32H0Zm32 32v-32H0v32h32Zm32-32H32v32h32v-32Zm-32 32v32h32v-32H32Zm32 0h32v-32H64v32Zm0 0v32h32v-32H64Zm32 32V160h32v32H96Zm32-32h-32v-32h32v32Zm32 0v-32h32v32h-32Zm-32-32V96h32v32h-32Zm0-32V64h32v32h-32Zm32 0V64h32v32h-32Zm32-32h-32V32h32v32Zm-32-32V0h32v32h-32Zm32 32h32V32h-32v32Zm-32 0h-32v32h32V64Zm32 0V32h32v32h-32ZM64 128v-32H32v32h32Zm128 32v32h-32v-32h32Zm0 32v32h32v-32h-32Zm-32-32v-32h-32v32h32Zm-32 0h-32v-32h32v32Zm0-32v-32H96v32h32Zm32 0V96h32v32h-32Zm-96 64h32v32H96v-32Zm-32 0v32h32v-32H64Zm32 32h32v32H96v-32Zm32 0h32v32h-32v-32Zm-64-64h32v32H64v-32Zm128 32h32v-32h-32v32Z M256 32h-32V0h32v32ZM64 224v-32H32v32h32Zm-32 32v-32H0v32h32Zm160-32h-32v32h32v-32Zm-32 0h-32v32h32v-32Zm-32 0h-32v32h32v-32Zm-32 0H64v32h32v-32Zm96 32v-32h32v32h-32Zm-32 0v-32h-32v32h32Zm-32-32h-32v32h32v-32Z"/></svg>
                    </div>
                </div>
                <div className="relative mt-4">
                  <input type="text" readOnly value={CRYPTO_ADDRESS} className="w-full bg-slate-200 p-2 pr-10 rounded-lg text-xs font-mono break-all text-slate-700 border border-slate-300"/>
                   <button onClick={copyToClipboard} className="absolute inset-y-0 right-0 p-2 rounded-r-lg hover:bg-slate-300" aria-label="Copy crypto address">
                     <CopyIcon className="h-5 w-5 text-slate-600"/>
                   </button>
                </div>
                {showCopied && <p className="text-green-600 text-sm mt-2 font-semibold">Address Copied!</p>}
                <p className="text-xs text-slate-500 mt-4">After sending, please click the "Pay" button to confirm.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
      onClick={onClose}
      ref={modalRef}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 sm:p-8 m-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {isProcessing && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
            <Spinner className={`h-12 w-12 ${paymentMethod === 'mpesa' ? 'text-green-600' : 'text-blue-600'}`} />
            <p className="mt-4 text-slate-700 font-semibold text-lg">{stkPushSent ? 'Confirming Payment...' : 'Processing...'}</p>
          </div>
        )}

        <div className="flex justify-between items-start">
          <div>
            <h2 id="payment-modal-title" className="text-2xl font-bold text-slate-800">Complete Payment</h2>
            <p className="text-slate-500 mt-1">
              Total Amount: <span className="font-bold text-blue-600 text-lg">{total.toLocaleString()} Ksh</span>
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Close payment modal"
          >
            <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-slate-700">Select a payment method:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {paymentOptions.map(option => {
              const isMpesa = option.id === 'mpesa';
              const isSelected = paymentMethod === option.id;
              
              return (
              <button
                key={option.id}
                onClick={() => setPaymentMethod(option.id)}
                className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSelected
                    ? isMpesa
                      ? 'bg-green-50 border-green-500 text-green-600 ring-2 ring-green-500'
                      : 'bg-blue-50 border-blue-500 text-blue-600 ring-2 ring-blue-500'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400'
                }`}
              >
                {option.icon}
                <span className="text-sm font-semibold mt-1.5">{option.name}</span>
              </button>
            )})}
          </div>
        </div>

        <div>
          {renderPaymentDetails()}
        </div>
        
        <div className="mt-8">
          <button
            onClick={handlePayment}
            disabled={paymentMethod === 'card'} // Disable for unavailable methods
            className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 ${
              paymentMethod === 'card' 
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : paymentMethod === 'mpesa'
                  ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300'
            }`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;