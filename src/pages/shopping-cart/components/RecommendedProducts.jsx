import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecommendedProducts = () => {
  const recommendedProducts = [
    {
      id: 1,
      title: "Apple MacBook Air M2",
      price: 1199.99,
      originalPrice: 1299.99,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      rating: 4.8,
      reviews: 2341,
      badge: "Best Seller"
    },
    {
      id: 2,
      title: "Samsung Galaxy Watch 6",
      price: 329.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      rating: 4.6,
      reviews: 1876,
      badge: "New"
    },
    {
      id: 3,
      title: "Bose QuietComfort Earbuds",
      price: 279.99,
      originalPrice: 329.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
      rating: 4.7,
      reviews: 3421,
      badge: "Limited Deal"
    },
    {
      id: 4,
      title: "iPad Pro 12.9-inch",
      price: 1099.99,
      originalPrice: 1199.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      rating: 4.9,
      reviews: 1654,
      badge: "Editor\'s Choice"
    },
    {
      id: 5,
      title: "Nintendo Switch OLED",
      price: 349.99,
      originalPrice: 379.99,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
      rating: 4.8,
      reviews: 5432,
      badge: "Popular"
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

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-accent text-white';
      case 'New':
        return 'bg-success text-white';
      case 'Limited Deal':
        return 'bg-error text-white';
      case 'Editor\'s Choice':
        return 'bg-primary text-white';
      case 'Popular':
        return 'bg-secondary-600 text-white';
      default:
        return 'bg-secondary-200 text-text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">Frequently bought together</h2>
        <Link
          to="/product-catalog"
          className="text-primary hover:text-primary-700 font-medium transition-smooth flex items-center space-x-1"
        >
          <span>View all</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
          >
            <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-product-card transition-smooth">
              {/* Product Image */}
              <div className="relative aspect-square bg-secondary-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${getBadgeColor(product.badge)}`}>
                    {product.badge}
                  </div>
                )}

                {/* Quick Add Button */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 bg-white text-text-primary px-4 py-2 rounded-lg font-medium transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center space-x-2">
                    <Icon name="Plus" size={16} />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-text-secondary">
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-base font-bold text-text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-text-secondary line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-accent hover:bg-accent-600 text-white font-medium py-2 px-3 rounded-lg transition-smooth flex items-center justify-center space-x-2 text-sm">
                  <Icon name="ShoppingCart" size={14} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bundle Offer */}
      <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Gift" size={24} className="text-primary" />
          <div>
            <h3 className="font-semibold text-text-primary">Bundle & Save</h3>
            <p className="text-sm text-text-secondary">
              Buy any 2 items together and save 15% on your total order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;