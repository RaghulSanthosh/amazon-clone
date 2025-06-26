import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const OrderCard = ({ 
  order, 
  isExpanded, 
  onToggleExpansion, 
  getStatusColor, 
  getStatusIcon 
}) => {
  const handleReorder = (item) => {
    console.log('Reordering item:', item.name);
    // Add to cart logic would go here
  };

  const handleTrackOrder = () => {
    console.log('Tracking order:', order.trackingNumber);
    // Open tracking page logic would go here
  };

  const handleDownloadInvoice = () => {
    console.log('Downloading invoice for order:', order.orderNumber);
    // Download invoice logic would go here
  };

  const handleReturnItem = (item) => {
    console.log('Initiating return for item:', item.name);
    // Return process logic would go here
  };

  const handleLeaveReview = (item) => {
    console.log('Leaving review for item:', item.name);
    // Review process logic would go here
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-product-card transition-smooth">
      {/* Order Header */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="mb-2 sm:mb-0">
            <h3 className="font-semibold text-text-primary mb-1">
              Order #{order.orderNumber}
            </h3>
            <p className="text-sm text-text-secondary">
              Placed on {order.date.toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              <Icon name={getStatusIcon(order.status)} size={14} className="mr-1.5" />
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <span className="font-semibold text-text-primary">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Order Items Preview */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {order.items.slice(0, 3).map((item, index) => (
                <div key={index} className="w-10 h-10 rounded-lg border-2 border-surface overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="w-10 h-10 rounded-lg border-2 border-surface bg-secondary-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-text-secondary">
                    +{order.items.length - 3}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-text-secondary">
                {order.items[0].name}
                {order.items.length > 1 && ` and ${order.items.length - 1} more`}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleExpansion}
            className="flex items-center space-x-1 text-primary hover:text-primary-700 font-medium text-sm transition-smooth"
          >
            <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Order Items */}
          <div className="p-4 sm:p-6">
            <h4 className="font-medium text-text-primary mb-4">Order Items</h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-text-primary mb-1 truncate">
                      {item.name}
                    </h5>
                    <p className="text-sm text-text-secondary mb-2">
                      Sold by {item.seller}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-text-secondary">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-medium text-text-primary">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Item Actions */}
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleReorder(item)}
                      className="text-xs text-primary hover:text-primary-700 font-medium transition-smooth"
                    >
                      Buy Again
                    </button>
                    {order.status === 'delivered' && (
                      <>
                        <button
                          onClick={() => handleLeaveReview(item)}
                          className="text-xs text-text-secondary hover:text-text-primary transition-smooth"
                        >
                          Write Review
                        </button>
                        <button
                          onClick={() => handleReturnItem(item)}
                          className="text-xs text-text-secondary hover:text-text-primary transition-smooth"
                        >
                          Return Item
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Information */}
              <div>
                <h4 className="font-medium text-text-primary mb-3">Shipping Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-text-secondary whitespace-pre-line">
                        {order.shippingAddress}
                      </p>
                    </div>
                  </div>
                  
                  {order.trackingNumber && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Truck" size={16} className="text-text-secondary" />
                      <span className="text-text-secondary">Tracking:</span>
                      <span className="font-medium text-text-primary">{order.trackingNumber}</span>
                    </div>
                  )}

                  {order.deliveryDate && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-text-secondary" />
                      <span className="text-text-secondary">Delivered:</span>
                      <span className="font-medium text-text-primary">
                        {order.deliveryDate.toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {order.estimatedDelivery && order.status !== 'delivered' && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-text-secondary" />
                      <span className="text-text-secondary">Estimated Delivery:</span>
                      <span className="font-medium text-text-primary">
                        {order.estimatedDelivery.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment & Order Summary */}
              <div>
                <h4 className="font-medium text-text-primary mb-3">Payment & Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="CreditCard" size={16} className="text-text-secondary" />
                    <span className="text-text-secondary">{order.paymentMethod}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Subtotal:</span>
                      <span className="text-text-primary">
                        ${(order.total * 0.9).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Shipping:</span>
                      <span className="text-text-primary">
                        ${(order.total * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Tax:</span>
                      <span className="text-text-primary">
                        ${(order.total * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-medium text-text-primary pt-2 border-t border-border">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {order.cancelReason && (
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-start space-x-2">
                        <Icon name="Info" size={16} className="text-error mt-0.5" />
                        <div>
                          <p className="text-error font-medium">Cancelled</p>
                          <p className="text-text-secondary">{order.cancelReason}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {order.returnReason && (
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-start space-x-2">
                        <Icon name="RotateCcw" size={16} className="text-warning mt-0.5" />
                        <div>
                          <p className="text-warning font-medium">Returned</p>
                          <p className="text-text-secondary">{order.returnReason}</p>
                          <p className="text-success font-medium">
                            Refund: ${order.refundAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-border bg-secondary-50">
            <div className="flex flex-wrap gap-3 pt-4">
              {order.trackingNumber && order.status === 'shipped' && (
                <button
                  onClick={handleTrackOrder}
                  className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-smooth font-medium text-sm"
                >
                  <Icon name="Truck" size={16} />
                  <span>Track Package</span>
                </button>
              )}

              <button
                onClick={handleDownloadInvoice}
                className="flex items-center space-x-2 bg-surface text-text-primary border border-border px-4 py-2 rounded-lg hover:bg-secondary-50 transition-smooth font-medium text-sm"
              >
                <Icon name="Download" size={16} />
                <span>Download Invoice</span>
              </button>

              <button className="flex items-center space-x-2 bg-surface text-text-primary border border-border px-4 py-2 rounded-lg hover:bg-secondary-50 transition-smooth font-medium text-sm">
                <Icon name="MessageCircle" size={16} />
                <span>Contact Support</span>
              </button>

              {order.status === 'delivered' && (
                <button className="flex items-center space-x-2 bg-surface text-text-primary border border-border px-4 py-2 rounded-lg hover:bg-secondary-50 transition-smooth font-medium text-sm">
                  <Icon name="RotateCcw" size={16} />
                  <span>Return Items</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;