import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Product, CartItem, Review, User, Sale, Address } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AccountPage from './components/AccountPage';
import Cart from './components/Cart';
import WishlistPage from './components/WishlistPage';
import SaleConfirmationModal from './components/SaleConfirmationModal';
import PaymentModal from './components/PaymentModal';
import ProductDetailPage from './components/ProductDetailPage';
import Toast from './components/Toast';
import FloatingCartButton from './components/FloatingCartButton';
import OrderHistoryPage from './components/OrderHistoryPage';
import MyReviewsPage from './components/MyReviewsPage';

export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart' | 'wishlist' | 'productDetail' | 'account' | 'orderHistory' | 'myReviews';
export type Theme = 'light' | 'dark';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Record<number, Review[]>>({});
  const [toastMessage, setToastMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<Page | null>(null);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'mock-address-1',
      name: 'Jane Doe',
      street: '123 Sparkle Ave',
      city: 'Nairobi',
      country: 'Kenya',
      isDefault: true,
      googleMapsLink: 'https://maps.app.goo.gl/h2s3n2k3m4n5o6p7',
    }
  ]);

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as Theme;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [lastSale, setLastSale] = useState<CartItem[]>([]);
  const completeSaleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const savedReviews = localStorage.getItem('productReviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    } catch (error) {
      console.error("Failed to load reviews from localStorage:", error);
    }
  }, []);
  
  const handleThemeToggle = useCallback(() => {
    setTheme(prevTheme => {
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return newTheme;
    });
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    if (page !== 'productDetail') {
      setSelectedProductId(null);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleSelectProduct = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage('productDetail');
    window.scrollTo(0, 0);
  }

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 0.5 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 0.5 }];
    });
    setToastMessage(`${product.name} added to cart`);
  }, []);
  
  const handleCloseToast = useCallback(() => {
    setToastMessage('');
  }, []);

  const handleUpdateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleToggleWishlist = useCallback((productId: number) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId);
      }
      return [...prevWishlist, productId];
    });
  }, []);
  
  const handleAddReview = useCallback((productId: number, review: Review) => {
    setReviews(prevReviews => {
      const newReviews = { ...prevReviews };
      const productReviews = newReviews[productId] || [];
      newReviews[productId] = [review, ...productReviews];
      try {
        localStorage.setItem('productReviews', JSON.stringify(newReviews));
      } catch (error) {
        console.error("Failed to save reviews to localStorage:", error);
      }
      return newReviews;
    });
  }, []);

  const handleInitiatePayment = useCallback(() => {
    if (!user) {
      setToastMessage('Please log in or create an account to check out.');
      setRedirectAfterLogin('cart');
      handleNavigate('account');
      return;
    }
    if (cart.length > 0) {
      setIsPaymentModalOpen(true);
    }
  }, [cart, user, handleNavigate]);

  const handleClosePaymentModal = useCallback(() => {
    setIsPaymentModalOpen(false);
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newSale: Sale = {
      id: Date.now().toString(),
      items: [...cart],
      date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      total,
    };
    
    setSalesHistory(prev => [newSale, ...prev]);

    setIsPaymentModalOpen(false);
    setLastSale([...cart]); // Keep for confirmation modal
    setIsConfirmationModalOpen(true);
    setCurrentPage('home');
    setCart([]);
  }, [cart]);

  const closeConfirmationModal = useCallback(() => {
    setIsConfirmationModalOpen(false);
    setLastSale([]);
  }, []);

  const handleLogin = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
    setToastMessage(`Welcome back, ${loggedInUser.name}!`);
    if (redirectAfterLogin) {
        handleNavigate(redirectAfterLogin);
        setRedirectAfterLogin(null);
    } else {
        handleNavigate('account');
    }
  }, [redirectAfterLogin, handleNavigate]);

  const handleSignup = useCallback((newUser: User) => {
    setUser(newUser);
    setToastMessage(`Account created! Welcome, ${newUser.name}!`);
    if (redirectAfterLogin) {
        handleNavigate(redirectAfterLogin);
        setRedirectAfterLogin(null);
    } else {
        handleNavigate('account');
    }
  }, [redirectAfterLogin, handleNavigate]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setToastMessage('You have been successfully logged out.');
    handleNavigate('home');
  }, [handleNavigate]);
  
  const handleAddAddress = useCallback((addressData: Omit<Address, 'id' | 'isDefault'>) => {
    setAddresses(prev => {
        const updatedAddresses = prev.map(addr => ({ ...addr, isDefault: false }));
        const newAddress: Address = {
            ...addressData,
            id: `addr-${Date.now()}`,
            isDefault: true,
        };
        setToastMessage('Address added successfully!');
        return [newAddress, ...updatedAddresses];
    });
  }, []);
  
  const handleUpdateAddress = useCallback((updatedAddress: Address) => {
    setAddresses(prev => 
      prev.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr)
    );
    setToastMessage('Address updated successfully!');
  }, []);

  const handleSetDefaultAddress = useCallback((addressId: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
    setToastMessage('Default address has been updated.');
  }, []);

  const handleRemoveAddress = useCallback((addressId: string) => {
    setAddresses(prev => {
        const remaining = prev.filter(addr => addr.id !== addressId);
        const wasDefaultRemoved = prev.find(addr => addr.id === addressId)?.isDefault;
        if (wasDefaultRemoved && remaining.length > 0 && !remaining.some(addr => addr.isDefault)) {
            remaining[0].isDefault = true;
        }
        setToastMessage('Address removed successfully.');
        return remaining;
    });
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} products={PRODUCTS.slice(0, 4)} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onSelectProduct={handleSelectProduct} />;
      case 'products':
        return <ProductsPage products={PRODUCTS} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onSelectProduct={handleSelectProduct} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'account':
        return <AccountPage 
                  user={user} 
                  onLogin={handleLogin} 
                  onSignup={handleSignup} 
                  onLogout={handleLogout} 
                  onNavigate={handleNavigate} 
                  addresses={addresses}
                  onAddAddress={handleAddAddress}
                  onUpdateAddress={handleUpdateAddress}
                  onSetDefaultAddress={handleSetDefaultAddress}
                  onRemoveAddress={handleRemoveAddress}
                />;
      case 'cart':
        return <Cart
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
                onCompleteSale={handleInitiatePayment}
                onNavigate={handleNavigate}
                ref={completeSaleBtnRef}
                user={user}
              />;
      case 'wishlist':
        return <WishlistPage 
                  products={PRODUCTS} 
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist} 
                  onAddToCart={handleAddToCart}
                  onNavigate={handleNavigate}
                  onSelectProduct={handleSelectProduct}
                />;
      case 'productDetail':
        const product = PRODUCTS.find(p => p.id === selectedProductId);
        if (!product) {
            handleNavigate('products'); // Or show a not found page
            return null;
        }
        return <ProductDetailPage 
                  product={product}
                  reviews={reviews[product.id] || []}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                  onNavigate={handleNavigate}
                />
      case 'orderHistory':
        if (!user) {
          handleNavigate('account');
          return null;
        }
        return <OrderHistoryPage onNavigate={handleNavigate} salesHistory={salesHistory} />;
      case 'myReviews':
        if (!user) {
          handleNavigate('account');
          return null;
        }
        return <MyReviewsPage
                  onNavigate={handleNavigate}
                  salesHistory={salesHistory}
                  reviews={reviews}
                  onAddReview={handleAddReview}
                  user={user}
                  onSelectProduct={handleSelectProduct}
                />;
      default:
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} products={PRODUCTS.slice(0, 4)} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onSelectProduct={handleSelectProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans flex flex-col">
      <Header 
        onNavigate={handleNavigate} 
        cartItemCount={cartItemCount} 
        wishlistItemCount={wishlist.length} 
        user={user} 
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
      
      <FloatingCartButton 
        cartItemCount={cartItemCount}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {toastMessage && <Toast message={toastMessage} onClose={handleCloseToast} />}

      {isPaymentModalOpen && (
        <PaymentModal
          total={cartTotal}
          onClose={handleClosePaymentModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      {isConfirmationModalOpen && <SaleConfirmationModal saleItems={lastSale} onClose={closeConfirmationModal} />}
    </div>
  );
}

export default App;
