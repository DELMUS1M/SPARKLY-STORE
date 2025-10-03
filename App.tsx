import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Product, CartItem, Review } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Cart from './components/Cart';
import WishlistPage from './components/WishlistPage';
import SaleConfirmationModal from './components/SaleConfirmationModal';
import PaymentModal from './components/PaymentModal';
import ProductDetailPage from './components/ProductDetailPage';

export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart' | 'wishlist' | 'productDetail';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Record<number, Review[]>>({});

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

  const handleNavigate = (page: Page) => {
    if (page !== 'productDetail') {
      setSelectedProductId(null);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

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
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
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
    if (cart.length > 0) {
      setIsPaymentModalOpen(true);
    }
  }, [cart]);

  const handleClosePaymentModal = useCallback(() => {
    setIsPaymentModalOpen(false);
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setIsPaymentModalOpen(false);
    setLastSale([...cart]);
    setIsConfirmationModalOpen(true);
    setCurrentPage('home');
    setCart([]);
  }, [cart]);

  const closeConfirmationModal = useCallback(() => {
    setIsConfirmationModalOpen(false);
    setLastSale([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
      case 'cart':
        return <Cart
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onClearCart={handleClearCart}
                onCompleteSale={handleInitiatePayment}
                onNavigate={handleNavigate}
                ref={completeSaleBtnRef}
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
                  onAddReview={handleAddReview}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                  onNavigate={handleNavigate}
                />
      default:
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} products={PRODUCTS.slice(0, 4)} onToggleWishlist={handleToggleWishlist} wishlist={wishlist} onSelectProduct={handleSelectProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col">
      <Header onNavigate={handleNavigate} cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} wishlistItemCount={wishlist.length} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
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