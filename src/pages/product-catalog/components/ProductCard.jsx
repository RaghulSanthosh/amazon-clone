import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickAdd(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-secondary-300" />
      );
    }

    return stars;
  };

  return (
    <>
      <Link
        to="/product-detail"
        className="group bg-surface rounded-lg border border-border hover:shadow-product-card transition-all duration-200 overflow-hidden hover-lift"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary-50">
          <Image
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount > 0 && (
              <span className="bg-error text-white text-xs px-2 py-1 rounded font-medium">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-success text-white text-xs px-2 py-1 rounded font-medium">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded font-medium">
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Icon 
              name="Heart" 
              size={16} 
              className={`transition-colors ${isWishlisted ? 'text-error fill-current' : 'text-text-secondary'}`}
            />
          </button>

          {/* Quick Add Button - Desktop Only */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2 left-2 right-2 bg-primary text-white py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 hidden sm:block"
          >
            Quick Add
          </button>

          {/* Stock Status */}
          {product.availability === 'low-stock' && (
            <div className="absolute bottom-2 right-2 bg-warning text-white text-xs px-2 py-1 rounded">
              Low Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4">
          {/* Brand */}
          <p className="text-xs text-text-secondary mb-1 uppercase tracking-wide">
            {product.brand}
          </p>

          {/* Title */}
          <h3 className="font-medium text-text-primary mb-2 line-clamp-2 text-sm sm:text-base group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-text-secondary ml-1">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Features - Desktop Only */}
          <div className="hidden sm:block mb-3">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-text-secondary line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-smooth sm:hidden"
          >
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Quick Add</h3>
              <button
                onClick={() => setShowQuickAdd(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary mb-1">{product.title}</h4>
                <p className="text-text-secondary text-sm mb-2">{product.brand}</p>
                <p className="text-lg font-bold text-text-primary">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>

            {/* Size/Variant Selection (Mock) */}
            {(product.category === 'Fashion') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Size
                </label>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-smooth"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-secondary-100 transition-smooth">
                  <Icon name="Minus" size={16} />
                </button>
                <span className="text-text-primary font-medium">1</span>
                <button className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-secondary-100 transition-smooth">
                  <Icon name="Plus" size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowQuickAdd(false)}
                className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-700 transition-smooth font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setShowQuickAdd(false)}
                className="px-4 py-3 border border-border rounded-lg hover:bg-secondary-100 transition-smooth"
              >
                <Icon name="Heart" size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;