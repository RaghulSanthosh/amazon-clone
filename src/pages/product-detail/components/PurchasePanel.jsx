import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PurchasePanel = ({ 
  product, 
  selectedVariant, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  onBuyNow 
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const selectedVariantData = product.variants.find(v => v.id === selectedVariant);
  const currentPrice = selectedVariantData?.price || product.price;
  const totalPrice = currentPrice * quantity;
  const isVariantAvailable = selectedVariantData?.available !== false;

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < 10) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!isVariantAvailable) return;
    
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onAddToCart();
    setIsAddingToCart(false);
  };

  const handleBuyNow = async () => {
    if (!isVariantAvailable) return;
    
    setIsBuying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onBuyNow();
    setIsBuying(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-6 sticky top-24">
      {/* Price Summary */}
      <div className="space-y-2">
        <div className="text-2xl font-bold text-text-primary">
          ${totalPrice.toFixed(2)}
        </div>
        {quantity > 1 && (
          <div className="text-sm text-text-secondary">
            ${currentPrice.toFixed(2)} each
          </div>
        )}
        {product.shipping.freeShipping && (
          <div className="flex items-center space-x-1 text-success-600">
            <Icon name="Truck" size={14} />
            <span className="text-sm font-medium">Free Shipping</span>
          </div>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Quantity</label>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="Minus" size={16} />
          </button>
          <span className="w-12 text-center font-medium text-text-primary">
            {quantity}
          </span>
          <button
            onClick={handleQuantityIncrease}
            disabled={quantity >= 10}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="Plus" size={16} />
          </button>
        </div>
        <div className="text-xs text-text-secondary">
          Maximum quantity: 10
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!isVariantAvailable || isAddingToCart}
          className="w-full bg-accent hover:bg-accent-600 disabled:bg-secondary-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-smooth flex items-center justify-center space-x-2"
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <Icon name="ShoppingCart" size={18} />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={!isVariantAvailable || isBuying}
          className="w-full bg-primary hover:bg-primary-700 disabled:bg-secondary-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-smooth flex items-center justify-center space-x-2"
        >
          {isBuying ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Icon name="Zap" size={18} />
              <span>Buy Now</span>
            </>
          )}
        </button>
      </div>

      {!isVariantAvailable && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error-600" />
            <span className="text-sm text-error-600 font-medium">
              Selected variant is out of stock
            </span>
          </div>
        </div>
      )}

      {/* Additional Options */}
      <div className="space-y-3 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 text-text-secondary hover:text-primary transition-smooth py-2">
          <Icon name="Heart" size={16} />
          <span className="text-sm font-medium">Add to Wishlist</span>
        </button>

        <button className="w-full flex items-center justify-center space-x-2 text-text-secondary hover:text-primary transition-smooth py-2">
          <Icon name="BarChart3" size={16} />
          <span className="text-sm font-medium">Compare</span>
        </button>

        <button className="w-full flex items-center justify-center space-x-2 text-text-secondary hover:text-primary transition-smooth py-2">
          <Icon name="Share2" size={16} />
          <span className="text-sm font-medium">Share Product</span>
        </button>
      </div>

      {/* Security Badges */}
      <div className="pt-4 border-t border-border space-y-2">
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Shield" size={14} />
          <span className="text-xs">Secure Payment</span>
        </div>
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="RefreshCw" size={14} />
          <span className="text-xs">30-Day Returns</span>
        </div>
        <div className="flex items-center space-x-2 text-text-secondary">
          <Icon name="Award" size={14} />
          <span className="text-xs">1-Year Warranty</span>
        </div>
      </div>
    </div>
  );
};

export default PurchasePanel;