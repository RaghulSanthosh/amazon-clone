import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RelatedProducts = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, products.length - itemsPerView.desktop) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= products.length - itemsPerView.desktop ? 0 : prev + 1
    );
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
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Related Products</h2>
          <p className="text-text-secondary mt-1">You might also like these items</p>
        </div>
        
        {/* Navigation Controls */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= products.length - itemsPerView.desktop}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary-100 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)` 
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
            >
              <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-product-card transition-all duration-300 group">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${
                      product.badge === 'Best Seller' ? 'bg-accent text-white' :
                      product.badge === 'Popular' ? 'bg-primary text-white' :
                      product.badge === 'New'? 'bg-success-500 text-white' : 'bg-secondary-200 text-text-primary'
                    }`}>
                      {product.badge}
                    </div>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                    <button className="w-8 h-8 bg-surface/90 rounded-full flex items-center justify-center hover:bg-surface transition-smooth">
                      <Icon name="Heart" size={14} />
                    </button>
                    <button className="w-8 h-8 bg-surface/90 rounded-full flex items-center justify-center hover:bg-surface transition-smooth">
                      <Icon name="Eye" size={14} />
                    </button>
                  </div>
                  
                  {/* Quick Add to Cart */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full bg-primary text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary-700 transition-smooth flex items-center justify-center space-x-1">
                      <Icon name="ShoppingCart" size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <Link 
                    to="/product-detail"
                    className="block"
                  >
                    <h3 className="font-medium text-text-primary hover:text-primary transition-smooth line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-text-secondary">
                      ({product.reviewCount})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-text-secondary line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center space-x-2 md:hidden">
        {Array.from({ length: Math.ceil(products.length / itemsPerView.mobile) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              currentIndex === index ? 'bg-primary' : 'bg-secondary-300'
            }`}
          />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-4">
        <Link
          to="/product-catalog"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-medium transition-smooth"
        >
          <span>View All Products</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;