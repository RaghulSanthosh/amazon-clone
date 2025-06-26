import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const OrderFilters = ({ filters, onFilterChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const statusOptions = [
    { value: 'all', label: 'All Orders', icon: 'Package' },
    { value: 'processing', label: 'Processing', icon: 'Clock' },
    { value: 'shipped', label: 'Shipped', icon: 'Truck' },
    { value: 'delivered', label: 'Delivered', icon: 'CheckCircle' },
    { value: 'cancelled', label: 'Cancelled', icon: 'XCircle' },
    { value: 'returned', label: 'Returned', icon: 'RotateCcw' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentStatusLabel = () => {
    const currentStatus = statusOptions.find(option => option.value === filters.status);
    return currentStatus ? currentStatus.label : 'All Orders';
  };

  const getCurrentDateRangeLabel = () => {
    const currentRange = dateRangeOptions.find(option => option.value === filters.dateRange);
    return currentRange ? currentRange.label : 'All Time';
  };

  const hasActiveFilters = filters.status !== 'all' || filters.dateRange !== 'all';

  const clearFilters = () => {
    onFilterChange({ status: 'all', dateRange: 'all' });
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Mobile/Tablet Filter Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-smooth"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-text-secondary" />
          <span className="font-medium text-text-primary">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-primary rounded-full"></span>
          )}
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Filter Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-lg shadow-modal border border-border z-50 p-4">
          {/* Status Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Order Status
            </label>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onFilterChange({ status: option.value })}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth ${
                    filters.status === option.value
                      ? 'bg-primary-50 text-primary border border-primary' :'hover:bg-secondary-50 text-text-secondary'
                  }`}
                >
                  <Icon name={option.icon} size={16} />
                  <span className="font-medium">{option.label}</span>
                  {filters.status === option.value && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">
              Date Range
            </label>
            <div className="space-y-2">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onFilterChange({ dateRange: option.value })}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-smooth ${
                    filters.dateRange === option.value
                      ? 'bg-primary-50 text-primary border border-primary' :'hover:bg-secondary-50 text-text-secondary'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {filters.dateRange === option.value && (
                    <Icon name="Check" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex space-x-3 pt-4 border-t border-border">
            <button
              onClick={clearFilters}
              className="flex-1 px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-smooth font-medium"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Summary (Desktop) */}
      {hasActiveFilters && (
        <div className="hidden lg:block mt-3">
          <div className="flex flex-wrap gap-2">
            {filters.status !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                Status: {getCurrentStatusLabel()}
                <button
                  onClick={() => onFilterChange({ status: 'all' })}
                  className="ml-1 hover:text-primary-700"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-primary-50 text-primary text-xs rounded-full">
                Date: {getCurrentDateRangeLabel()}
                <button
                  onClick={() => onFilterChange({ dateRange: 'all' })}
                  className="ml-1 hover:text-primary-700"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;