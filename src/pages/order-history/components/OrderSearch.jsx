import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const OrderSearch = ({ searchQuery, onSearchChange }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange(localQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [localQuery, onSearchChange]);

  const handleClear = () => {
    setLocalQuery('');
    onSearchChange('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
        />
        <input
          type="text"
          placeholder="Search by order number or product name..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth bg-surface"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>
      
      {/* Search Suggestions */}
      {localQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface rounded-lg shadow-modal border border-border z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide">
              Search Suggestions
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary-50 transition-smooth text-left">
                <Icon name="Search" size={16} className="text-text-secondary" />
                <span className="text-text-primary">Search in order numbers</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary-50 transition-smooth text-left">
                <Icon name="Package" size={16} className="text-text-secondary" />
                <span className="text-text-primary">Search in product names</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSearch;