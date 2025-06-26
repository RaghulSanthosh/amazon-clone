import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const EmptyCart = () => {
  const categories = [
    { name: 'Electronics', icon: 'Smartphone', path: '/product-catalog' },
    { name: 'Fashion', icon: 'Shirt', path: '/product-catalog' },
    { name: 'Home & Garden', icon: 'Home', path: '/product-catalog' },
    { name: 'Sports', icon: 'Dumbbell', path: '/product-catalog' }
  ];

  const recommendedProducts = [
    {
      id: 1,
      title: "Apple AirPods Pro (2nd Generation)",
      price: 249.99,
      originalPrice: 279.99,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300",
      rating: 4.8,
      reviews: 12453
    },
    {
      id: 2,
      title: "Amazon Echo Dot (5th Gen)",
      price: 49.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300",
      rating: 4.6,
      reviews: 8921
    },
    {
      id: 3,
      title: "Kindle Paperwhite (11th Generation)",
      price: 139.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=300",
      rating: 4.7,
      reviews: 15632
    },
    {
      id: 4,
      title: "Anker Portable Charger",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1609592806596-4d1b5e5e5e5e?w=300",
      rating: 4.5,
      reviews: 6789
    }
  ];

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
      stars.push(<Icon key={i} name="Star" size={12} className="text-accent fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={12} className="text-accent fill-current opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-secondary-300" />);
    }

    return stars;
  };

  return (
    <div className="text-center py-12">
      {/* Empty Cart Illustration */}
      <div className="mb-8">
        <div className="w-32 h-32 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="ShoppingCart" size={64} className="text-secondary-400" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Your cart is empty</h2>
        <p className="text-text-secondary max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <Link
          to="/product-catalog"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-smooth mb-4"
        >
          <Icon name="Store" size={20} />
          <span>Start Shopping</span>
        </Link>
        
        <div className="flex justify-center">
          <Link
            to="/homepage"
            className="inline-flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="p-4 bg-surface border border-border rounded-lg hover:border-primary hover:shadow-product-card transition-smooth group"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-100 transition-smooth">
                <Icon name={category.icon} size={24} className="text-primary" />
              </div>
              <p className="text-sm font-medium text-text-primary">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="text-left">
        <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">You might like these</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-product-card transition-smooth group"
            >
              <div className="aspect-square bg-secondary-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h4 className="text-sm font-medium text-text-primary mb-2 line-clamp-2">
                  {product.title}
                </h4>
                
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-text-secondary">
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <button className="w-full bg-accent hover:bg-accent-600 text-white font-medium py-2 px-4 rounded-lg transition-smooth flex items-center justify-center space-x-2">
                  <Icon name="ShoppingCart" size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;