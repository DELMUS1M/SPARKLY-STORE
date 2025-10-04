import React, { useState } from 'react';
import { User, Address } from '../types';
import { Page } from '../App';
import GoogleIcon from './icons/GoogleIcon';
import HomeIcon from './icons/HomeIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import MpesaIcon from './icons/MpesaIcon';
import PaypalIcon from './icons/PaypalIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import StarIcon from './icons/StarIcon';
import AddAddressForm from './AddAddressForm';
import MapPinIcon from './icons/MapPinIcon';

interface AccountPageProps {
  user: User | null;
  onLogin: (user: User) => void;
  onSignup: (user: User) => void;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
  addresses: Address[];
  onAddAddress: (address: Omit<Address, 'id' | 'isDefault'>) => void;
  onUpdateAddress: (address: Address) => void;
  onSetDefaultAddress: (addressId: string) => void;
  onRemoveAddress: (addressId: string) => void;
}

type FormType = 'login' | 'signup';

const AccountPage: React.FC<AccountPageProps> = ({ 
    user, 
    onLogin, 
    onSignup, 
    onLogout, 
    onNavigate, 
    addresses, 
    onAddAddress,
    onUpdateAddress,
    onSetDefaultAddress,
    onRemoveAddress 
}) => {
  const [formType, setFormType] = useState<FormType>('signup');
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Forgot Password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  
  // Profile page state
  const [showAddresses, setShowAddresses] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const mockPaymentMethods = [
    { 
        id: 1, 
        type: 'M-Pesa', 
        details: '0712 345 678', 
        isDefault: true, 
        icon: <MpesaIcon className="h-6 w-6 text-green-600" /> 
    },
    { 
        id: 2, 
        type: 'Visa', 
        details: '**** **** **** 1234', 
        isDefault: false, 
        icon: <CreditCardIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" /> 
    },
    { 
        id: 3, 
        type: 'PayPal', 
        details: user ? user.email : 'user@example.com',
        isDefault: false, 
        icon: <PaypalIcon className="h-5 w-5 text-indigo-600" /> 
    },
  ];

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setError('');
    onSignup({ name, email });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        setError('Email and password are required.');
        return;
    }
    setError('');
    const mockName = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    onLogin({ name: mockName, email });
  };

  const handleGoogleLogin = () => {
    const mockGoogleUser: User = {
        name: 'Sparkler',
        email: 'user@google.com',
    };
    onLogin(mockGoogleUser);
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      setResetSent(true);
    }
  };
  
  const handleRemoveClick = (addressId: string) => {
    if (window.confirm('Are you sure you want to remove this address?')) {
      onRemoveAddress(addressId);
    }
  };
  
  const handleCloseForm = () => {
    setIsAddingAddress(false);
    setEditingAddress(null);
  };

  const handleSaveAddress = (addressData: Omit<Address, 'isDefault'> & { id?: string }) => {
    if (addressData.id && editingAddress) {
      const updatedAddress: Address = {
        ...editingAddress,
        ...addressData,
      };
      onUpdateAddress(updatedAddress);
    } else {
      onAddAddress(addressData);
    }
    handleCloseForm();
  };


  if (user) {
    return (
      <>
        <div className="container mx-auto p-4 lg:p-8 flex justify-center" style={{minHeight: 'calc(100vh - 250px)'}}>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-2xl">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Welcome back, <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">{user.name}!</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Manage your account details below.</p>
            </div>

            <div className="space-y-4">
              {/* Order History */}
              <button
                onClick={() => onNavigate('orderHistory')}
                className="w-full flex justify-between items-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-4 px-5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <ClipboardListIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  <span>Order History</span>
                </div>
                <span className="text-slate-400">&rarr;</span>
              </button>

              {/* My Reviews */}
              <button
                onClick={() => onNavigate('myReviews')}
                className="w-full flex justify-between items-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-4 px-5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <StarIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  <span>My Reviews</span>
                </div>
                <span className="text-slate-400">&rarr;</span>
              </button>

              {/* Manage Addresses */}
              <div>
                <button
                  onClick={() => setShowAddresses(!showAddresses)}
                  className="w-full flex justify-between items-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-4 px-5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-left"
                  aria-expanded={showAddresses}
                >
                  Manage Addresses
                  <ChevronDownIcon className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform ${showAddresses ? 'rotate-180' : ''}`} />
                </button>
                {showAddresses && (
                  <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-700/50 border dark:border-slate-700 rounded-b-lg text-left">
                    <div className="space-y-3">
                      {addresses.length > 0 ? addresses.map(address => (
                        <div key={address.id} className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                      <HomeIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                      <h3 className="font-bold text-slate-700 dark:text-slate-200">Shipping Address</h3>
                                      {address.isDefault && (
                                        <span className="text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Default</span>
                                      )}
                                    </div>
                                    <address className="text-slate-600 dark:text-slate-400 mt-2 not-italic">
                                      <strong className="block">{address.name}</strong>
                                      {address.street}<br/>
                                      {address.city}, {address.country}
                                    </address>
                                    {address.googleMapsLink && (
                                      <a href={address.googleMapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
                                          <MapPinIcon className="h-4 w-4" />
                                          View on Google Maps
                                      </a>
                                    )}
                                </div>
                                <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-4">
                                  <div className="flex gap-2">
                                    <button onClick={() => setEditingAddress(address)} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                                    <button onClick={() => handleRemoveClick(address.id)} className="text-sm font-semibold text-red-500 hover:underline">Remove</button>
                                  </div>
                                   {!address.isDefault && (
                                      <button 
                                        onClick={() => onSetDefaultAddress(address.id)}
                                        className="text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900 px-2 py-1 rounded-md transition-colors"
                                      >
                                        Set as Default
                                      </button>
                                    )}
                                </div>
                            </div>
                        </div>
                      )) : (
                        <p className="text-slate-500 dark:text-slate-400 text-center py-4">No addresses saved.</p>
                      )}
                    </div>
                     <button 
                        onClick={() => setIsAddingAddress(true)}
                        className="w-full mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        + Add New Address
                    </button>
                  </div>
                )}
              </div>
              
               {/* Payment Methods */}
              <div>
                <button
                  onClick={() => setShowPayments(!showPayments)}
                  className="w-full flex justify-between items-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-4 px-5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-left"
                  aria-expanded={showPayments}
                >
                  Payment Methods
                  <ChevronDownIcon className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform ${showPayments ? 'rotate-180' : ''}`} />
                </button>
                {showPayments && (
                  <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-700/50 border dark:border-slate-700 rounded-b-lg text-left">
                    <div className="space-y-3">
                      {mockPaymentMethods.map(method => (
                        <div key={method.id} className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 rounded-md shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-3">
                                {method.icon}
                                <h3 className="font-bold text-slate-700 dark:text-slate-200">{method.type}</h3>
                                {method.isDefault && (
                                  <span className="text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Default</span>
                                )}
                              </div>
                              <p className="text-slate-600 dark:text-slate-400 mt-2">{method.details}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                              <button className="text-sm font-semibold text-red-500 hover:underline">Remove</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        + Add New Payment Method
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={onLogout}
                className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors mt-6"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        {(isAddingAddress || editingAddress) && (
          <AddAddressForm 
            onSave={handleSaveAddress}
            onCancel={handleCloseForm}
            addressToEdit={editingAddress}
          />
        )}
      </>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="container mx-auto p-4 lg:p-8 flex items-center justify-center" style={{minHeight: 'calc(100vh - 250px)'}}>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-8">
          {resetSent ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Check Your Email</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                If an account exists for <span className="font-semibold">{resetEmail}</span>, you will receive an email with instructions on how to reset your password.
              </p>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetSent(false);
                  setResetEmail('');
                }}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handlePasswordResetSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-1">Forgot Password?</h2>
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-4">No problem. Enter your email address below and we'll send you a link to reset it.</p>
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <input
                  type="email"
                  id="reset-email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Send Reset Link</button>
              <button
                type="button"
                onClick={() => {
                    setShowForgotPassword(false);
                    setResetSent(false);
                }}
                className="w-full text-center text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                &larr; Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 flex items-center justify-center" style={{minHeight: 'calc(100vh - 250px)'}}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex">
          <button
            onClick={() => setFormType('signup')}
            className={`w-1/2 py-4 font-bold text-lg transition-colors ${formType === 'signup' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setFormType('login')}
            className={`w-1/2 py-4 font-bold text-lg transition-colors ${formType === 'login' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
          >
            Login
          </button>
        </div>
        
        {formType === 'signup' ? (
          <form onSubmit={handleSignupSubmit} className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-4">Create Your Account</h2>
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input type="text" id="signup-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <input type="email" id="signup-email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="signup-password"className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <input type="password" id="signup-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
            </div>
             <div>
              <label htmlFor="confirm-password"className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
              <input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Create Account</button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-4">Welcome Back!</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <input type="email" id="login-email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="login-password"className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input type="password" id="login-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
              </div>
               <div className="text-right -mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setError('');
                  }}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Login</button>
            </div>
            <div className="flex items-center">
                <hr className="flex-grow border-slate-200 dark:border-slate-600" />
                <span className="px-3 text-sm font-semibold text-slate-400">OR</span>
                <hr className="flex-grow border-slate-200 dark:border-slate-600" />
            </div>
            <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            >
                <GoogleIcon className="h-5 w-5" />
                Sign in with Google
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountPage;