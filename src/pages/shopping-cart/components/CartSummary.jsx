import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const CartSummary = ({ subtotal, tax, shipping, discount, total, promoCode, itemCount }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal ({itemCount} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount ({promoCode})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between text-text-secondary">
          <div className="flex items-center space-x-1">
            <span>Shipping</span>
            {shipping === 0 && (
              <Icon name="Zap" size={14} className="text-primary" />
            )}
          </div>
          <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-text-secondary">
          <span>Estimated tax</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <hr className="border-border" />

        {/* Total */}
        <div className="flex justify-between text-lg font-bold text-text-primary">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Shipping Benefits */}
      <div className="mb-6 p-3 bg-primary-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Truck" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="text-text-primary font-medium">Free shipping on orders over $35</p>
            {subtotal < 35 && shipping > 0 && (
              <p className="text-text-secondary mt-1">
                Add {formatPrice(35 - subtotal)} more to qualify for free shipping
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full bg-accent hover:bg-accent-600 text-white font-semibold py-3 px-4 rounded-lg transition-smooth mb-3 flex items-center justify-center space-x-2">
        <Icon name="CreditCard" size={20} />
        <span>Proceed to Checkout</span>
      </button>

      {/* Continue Shopping */}
      <Link
        to="/product-catalog"
        className="block w-full text-center text-primary hover:text-primary-700 font-medium py-2 transition-smooth"
      >
        Continue Shopping
      </Link>

      {/* Security Notice */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure checkout with SSL encryption</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-4">
        <p className="text-sm text-text-secondary mb-2">We accept:</p>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-5 bg-secondary-200 rounded flex items-center justify-center">
            <Icon name="CreditCard" size={12} className="text-text-secondary" />
          </div>
          <div className="w-8 h-5 bg-secondary-200 rounded flex items-center justify-center">
            <Icon name="Smartphone" size={12} className="text-text-secondary" />
          </div>
          <div className="w-8 h-5 bg-secondary-200 rounded flex items-center justify-center">
            <Icon name="Wallet" size={12} className="text-text-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;