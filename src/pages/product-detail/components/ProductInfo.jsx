import React from 'react';
import Icon from 'components/AppIcon';

const ProductInfo = ({ product, selectedVariant, onVariantChange }) => {
  const selectedVariantData = product.variants.find(v => v.id === selectedVariant);
  const currentPrice = selectedVariantData?.price || product.price;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-secondary-300" />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Brand & Title */}
      <div>
        <div className="text-sm text-text-secondary mb-1">{product.brand}</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          {product.title}
        </h1>
        <div className="text-sm text-text-secondary">SKU: {product.sku}</div>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product.rating)}
          <span className="text-sm font-medium text-text-primary ml-1">
            {product.rating}
          </span>
        </div>
        <div className="text-sm text-text-secondary">
          ({product.reviewCount.toLocaleString()} reviews)
        </div>
        <div className="text-sm text-primary hover:underline cursor-pointer">
          See all reviews
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-text-primary">
            ${currentPrice.toFixed(2)}
          </span>
          {product.originalPrice > currentPrice && (
            <>
              <span className="text-lg text-text-secondary line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="bg-error-100 text-error-600 px-2 py-1 rounded text-sm font-medium">
                Save {product.discount}%
              </span>
            </>
          )}
        </div>
        <div className="text-sm text-text-secondary">
          Price includes VAT. Free shipping on orders over $50.
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Icon 
          name="CheckCircle" 
          size={16} 
          className="text-success-500" 
        />
        <span className="text-success-600 font-medium">{product.availability}</span>
        <span className="text-text-secondary">- Ready to ship</span>
      </div>

      {/* Color Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-text-primary">
            Color: {selectedVariantData?.name}
          </div>
          <div className="flex items-center space-x-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => onVariantChange(variant.id)}
                disabled={!variant.available}
                className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                  selectedVariant === variant.id
                    ? 'border-primary shadow-md scale-110'
                    : 'border-secondary-300 hover:border-secondary-400'
                } ${!variant.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ backgroundColor: variant.color }}
                title={variant.name}
              >
                {selectedVariant === variant.id && (
                  <Icon 
                    name="Check" 
                    size={16} 
                    className="absolute inset-0 m-auto text-white" 
                  />
                )}
                {!variant.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-0.5 bg-text-secondary rotate-45"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Key Specifications */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Key Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.specifications.map((spec, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-border">
              <span className="text-text-secondary text-sm">{spec.label}</span>
              <span className="text-text-primary text-sm font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Key Features</h3>
        <ul className="space-y-2">
          {product.features.slice(0, 5).map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span className="text-text-secondary text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping Info */}
      <div className="bg-secondary-50 rounded-lg p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Icon name="Truck" size={16} className="text-primary" />
          <span className="text-sm font-medium text-text-primary">
            {product.shipping.freeShipping ? 'Free Shipping' : 'Shipping Available'}
          </span>
        </div>
        <div className="text-sm text-text-secondary">
          Estimated delivery: {product.shipping.estimatedDelivery}
        </div>
        <div className="text-sm text-text-secondary">
          {product.shipping.returnPolicy} • {product.shipping.warranty}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;