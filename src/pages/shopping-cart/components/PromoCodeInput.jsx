import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PromoCodeInput = ({ onApplyPromoCode, currentPromoCode }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleApplyPromoCode = async (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setIsApplying(true);
    setMessage('');

    // Simulate API call delay
    setTimeout(() => {
      const result = onApplyPromoCode(promoCode.trim());
      setMessage(result.message);
      setMessageType(result.success ? 'success' : 'error');
      
      if (result.success) {
        setPromoCode('');
      }
      
      setIsApplying(false);
    }, 500);
  };

  const handleRemovePromoCode = () => {
    onApplyPromoCode(''); // Remove promo code
    setMessage('');
    setMessageType('');
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Promo Code</h3>
      
      {currentPromoCode ? (
        // Applied Promo Code Display
        <div className="flex items-center justify-between p-3 bg-success-50 border border-success-100 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                Promo code applied: {currentPromoCode}
              </p>
              <p className="text-xs text-text-secondary">
                Discount has been applied to your order
              </p>
            </div>
          </div>
          <button
            onClick={handleRemovePromoCode}
            className="text-text-secondary hover:text-error transition-smooth"
            title="Remove promo code"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      ) : (
        // Promo Code Input Form
        <form onSubmit={handleApplyPromoCode} className="space-y-3">
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter promo code"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                disabled={isApplying}
              />
            </div>
            <button
              type="submit"
              disabled={!promoCode.trim() || isApplying}
              className="px-4 py-2 bg-primary hover:bg-primary-700 disabled:bg-secondary-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-smooth flex items-center space-x-2"
            >
              {isApplying ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Icon name="Tag" size={16} />
                  <span>Apply</span>
                </>
              )}
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`flex items-center space-x-2 text-sm ${
              messageType === 'success' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={messageType === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                size={16} 
              />
              <span>{message}</span>
            </div>
          )}
        </form>
      )}

      {/* Available Promo Codes Hint */}
      {!currentPromoCode && (
        <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
          <p className="text-xs text-text-secondary mb-2">Available promo codes:</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-1 bg-surface border border-border rounded text-xs text-text-secondary">
              SAVE10 - 10% off
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-surface border border-border rounded text-xs text-text-secondary">
              WELCOME20 - 20% off
            </span>
            <span className="inline-flex items-center px-2 py-1 bg-surface border border-border rounded text-xs text-text-secondary">
              FREESHIP - Free shipping
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;