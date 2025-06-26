import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import PromoCodeInput from './components/PromoCodeInput';
import RecommendedProducts from './components/RecommendedProducts';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [removedItem, setRemovedItem] = useState(null);
  const [showUndoTimer, setShowUndoTimer] = useState(false);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      title: "Apple iPhone 15 Pro Max",
      price: 1199.99,
      originalPrice: 1299.99,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      quantity: 1,
      variant: "256GB, Natural Titanium",
      inStock: true,
      seller: "Apple Store",
      shippingTime: "2-3 business days",
      prime: true
    },
    {
      id: 2,
      title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      price: 349.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      quantity: 2,
      variant: "Black",
      inStock: true,
      seller: "Sony Official",
      shippingTime: "1-2 business days",
      prime: true
    },
    {
      id: 3,
      title: "Samsung 65\" QLED 4K Smart TV",
      price: 1299.99,
      originalPrice: 1499.99,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      quantity: 1,
      variant: "65 inch, QLED",
      inStock: false,
      seller: "Samsung Electronics",
      shippingTime: "5-7 business days",
      prime: false
    }
  ];

  const validPromoCodes = {
    'SAVE10': { discount: 0.10, description: '10% off your order' },
    'WELCOME20': { discount: 0.20, description: '20% off for new customers' },
    'FREESHIP': { discount: 0, description: 'Free shipping', freeShipping: true }
  };

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      setCartItems(mockCartItems);
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    setRemovedItem(itemToRemove);
    setCartItems(items => items.filter(item => item.id !== itemId));
    setShowUndoTimer(true);
    
    // Auto-hide undo option after 10 seconds
    setTimeout(() => {
      setShowUndoTimer(false);
      setRemovedItem(null);
    }, 10000);
  };

  const undoRemove = () => {
    if (removedItem) {
      setCartItems(items => [...items, removedItem]);
      setRemovedItem(null);
      setShowUndoTimer(false);
    }
  };

  const saveForLater = (itemId) => {
    // Mock save for later functionality
    console.log('Saved item for later:', itemId);
    removeItem(itemId);
  };

  const applyPromoCode = (code) => {
    const upperCode = code.toUpperCase();
    if (validPromoCodes[upperCode]) {
      setPromoCode(upperCode);
      setPromoDiscount(validPromoCodes[upperCode].discount);
      return { success: true, message: validPromoCodes[upperCode].description };
    }
    return { success: false, message: 'Invalid promo code' };
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    const hasNonPrimeItems = cartItems.some(item => !item.prime);
    const subtotal = calculateSubtotal();
    
    if (promoCode === 'FREESHIP') return 0;
    if (subtotal > 35 || !hasNonPrimeItems) return 0;
    return 9.99;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const shipping = calculateShipping();
    const discount = subtotal * promoDiscount;
    return subtotal + tax + shipping - discount;
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Shopping Cart', path: '/shopping-cart', icon: 'ShoppingCart', isLast: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Shopping Cart</h1>
            <p className="text-text-secondary">
              {cartItems.length === 0 
                ? 'Your cart is empty' 
                : `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
              }
            </p>
          </div>

          {/* Undo Remove Notification */}
          {showUndoTimer && removedItem && (
            <div className="mb-6 p-4 bg-accent-50 border border-accent-100 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="AlertCircle" size={20} className="text-accent" />
                <span className="text-text-primary">
                  "{removedItem.title}" was removed from your cart
                </span>
              </div>
              <button
                onClick={undoRemove}
                className="text-primary hover:text-primary-700 font-medium transition-smooth"
              >
                Undo
              </button>
            </div>
          )}

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-surface rounded-lg border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-text-primary">Cart Items</h2>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                        onSaveForLater={saveForLater}
                      />
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <PromoCodeInput
                  onApplyPromoCode={applyPromoCode}
                  currentPromoCode={promoCode}
                />

                {/* Continue Shopping */}
                <div className="flex justify-start">
                  <Link
                    to="/product-catalog"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-medium transition-smooth"
                  >
                    <Icon name="ArrowLeft" size={16} />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <CartSummary
                  subtotal={calculateSubtotal()}
                  tax={calculateTax(calculateSubtotal())}
                  shipping={calculateShipping()}
                  discount={calculateSubtotal() * promoDiscount}
                  total={calculateTotal()}
                  promoCode={promoCode}
                  itemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
                />
              </div>
            </div>
          )}

          {/* Recommended Products */}
          {cartItems.length > 0 && (
            <div className="mt-12">
              <RecommendedProducts />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;