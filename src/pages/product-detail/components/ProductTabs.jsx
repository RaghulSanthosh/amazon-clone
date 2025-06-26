import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductTabs = ({ product, reviews, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'specifications', label: 'Specifications', icon: 'List' },
    { id: 'reviews', label: `Reviews (${reviews.length})`, icon: 'Star' },
    { id: 'shipping', label: 'Shipping & Returns', icon: 'Truck' }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={14} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-secondary-300" />
      );
    }

    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p className="mb-4">{product.description}</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-text-primary">Key Features</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-text-primary">Technical Specifications</h4>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-border">
                      <span className="text-text-secondary font-medium">{spec.label}</span>
                      <span className="text-text-primary">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-text-primary">Additional Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-text-secondary font-medium">Brand</span>
                    <span className="text-text-primary">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-text-secondary font-medium">SKU</span>
                    <span className="text-text-primary">{product.sku}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-text-secondary font-medium">Category</span>
                    <span className="text-text-primary">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-text-secondary font-medium">Availability</span>
                    <span className="text-success-600 font-medium">{product.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-secondary-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-text-primary mb-2">
                    {product.rating}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {renderStars(product.rating)}
                  </div>
                  <div className="text-text-secondary">
                    Based on {product.reviewCount.toLocaleString()} reviews
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percentage = Math.random() * 100; // Mock data
                    return (
                      <div key={star} className="flex items-center space-x-2">
                        <span className="text-sm text-text-secondary w-8">{star}★</span>
                        <div className="flex-1 bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-text-secondary w-10">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={review.avatar}
                      alt={review.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-text-primary">{review.user}</h5>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-text-secondary">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h6 className="font-medium text-text-primary mb-2">{review.title}</h6>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {review.content}
                        </p>
                      </div>
                      
                      {review.images && review.images.length > 0 && (
                        <div className="flex space-x-2">
                          {review.images.map((image, index) => (
                            <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                              <Image
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth">
                          <Icon name="ThumbsUp" size={14} />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                        <button className="text-text-secondary hover:text-primary transition-smooth text-sm">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <div className="text-center pt-6">
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-smooth font-medium">
                Write a Review
              </button>
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                  <Icon name="Truck" size={20} className="text-primary" />
                  <span>Shipping Information</span>
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success-500" />
                    <span className="text-text-secondary">Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <span className="text-text-secondary">Estimated delivery: {product.shipping.estimatedDelivery}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-text-secondary">Ships to all 50 states</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Package" size={16} className="text-primary" />
                    <span className="text-text-secondary">Secure packaging guaranteed</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                  <Icon name="RefreshCw" size={20} className="text-primary" />
                  <span>Returns & Exchanges</span>
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success-500" />
                    <span className="text-text-secondary">{product.shipping.returnPolicy}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-primary" />
                    <span className="text-text-secondary">{product.shipping.warranty}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CreditCard" size={16} className="text-primary" />
                    <span className="text-text-secondary">Full refund if not satisfied</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Headphones" size={16} className="text-primary" />
                    <span className="text-text-secondary">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-6">
              <h5 className="font-semibold text-text-primary mb-3">Return Process</h5>
              <ol className="space-y-2 text-text-secondary text-sm">
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</span>
                  <span>Contact our customer service team to initiate a return</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</span>
                  <span>Receive a prepaid return shipping label via email</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</span>
                  <span>Package the item in its original packaging</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">4</span>
                  <span>Drop off at any authorized shipping location</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">5</span>
                  <span>Receive your refund within 5-7 business days</span>
                </li>
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary-50' :'border-transparent text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;