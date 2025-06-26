import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    // Simulate API call delay
    setTimeout(() => {
      onUpdateQuantity(item.id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="p-4 hover:bg-secondary-50 transition-smooth">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full sm:w-32 h-32 bg-secondary-100 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex-1">
              {/* Product Title */}
              <Link
                to="/product-detail"
                className="text-lg font-medium text-text-primary hover:text-primary transition-smooth line-clamp-2"
              >
                {item.title}
              </Link>

              {/* Variant */}
              {item.variant && (
                <p className="text-sm text-text-secondary mt-1">
                  {item.variant}
                </p>
              )}

              {/* Seller & Shipping */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-text-secondary">
                <span>Sold by {item.seller}</span>
                {item.prime && (
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-text-secondary rounded-full hidden sm:block"></div>
                    <div className="flex items-center space-x-1 text-primary">
                      <Icon name="Zap" size={14} />
                      <span className="font-medium">Prime</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Time */}
              <p className="text-sm text-success mt-1">
                <Icon name="Truck" size={14} className="inline mr-1" />
                Arrives in {item.shippingTime}
              </p>

              {/* Stock Status */}
              {!item.inStock && (
                <p className="text-sm text-error mt-1 flex items-center">
                  <Icon name="AlertCircle" size={14} className="mr-1" />
                  Currently unavailable
                </p>
              )}
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col items-start sm:items-end space-y-3">
              {/* Price */}
              <div className="text-right">
                <div className="text-xl font-bold text-text-primary">
                  {formatPrice(item.price)}
                </div>
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="text-sm text-text-secondary line-through">
                    {formatPrice(item.originalPrice)}
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <label htmlFor={`quantity-${item.id}`} className="text-sm text-text-secondary">
                  Qty:
                </label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || isUpdating}
                    className="p-2 hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                  >
                    <Icon name="Minus" size={14} />
                  </button>
                  
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-12 text-center border-0 focus:outline-none focus:ring-0"
                    disabled={isUpdating}
                  />
                  
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10 || isUpdating}
                    className="p-2 hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                  >
                    <Icon name="Plus" size={14} />
                  </button>
                </div>
                
                {isUpdating && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 text-sm">
                <button
                  onClick={() => onRemove(item.id)}
                  className="flex items-center space-x-1 text-text-secondary hover:text-error transition-smooth"
                >
                  <Icon name="Trash2" size={14} />
                  <span>Remove</span>
                </button>
                
                <button
                  onClick={() => onSaveForLater(item.id)}
                  className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth"
                >
                  <Icon name="Heart" size={14} />
                  <span>Save for later</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;