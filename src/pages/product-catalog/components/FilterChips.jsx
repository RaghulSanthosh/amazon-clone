import React from 'react';
import Icon from 'components/AppIcon';

const FilterChips = ({ filters, onClearFilter }) => {
  const activeFilters = [];

  if (filters.category) {
    activeFilters.push({
      type: 'category',
      label: `Category: ${filters.category}`,
      value: filters.category
    });
  }

  if (filters.brand) {
    activeFilters.push({
      type: 'brand',
      label: `Brand: ${filters.brand}`,
      value: filters.brand
    });
  }

  if (filters.rating > 0) {
    activeFilters.push({
      type: 'rating',
      label: `${filters.rating}+ Stars`,
      value: filters.rating
    });
  }

  if (filters.availability !== 'all') {
    const availabilityLabels = {
      'in-stock': 'In Stock',
      'low-stock': 'Low Stock'
    };
    activeFilters.push({
      type: 'availability',
      label: availabilityLabels[filters.availability],
      value: filters.availability
    });
  }

  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
    activeFilters.push({
      type: 'price',
      label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
      value: filters.priceRange
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {activeFilters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm border border-primary-200"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => onClearFilter(filter.type)}
            className="hover:bg-primary-100 rounded-full p-1 transition-smooth"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}
      
      {activeFilters.length > 1 && (
        <button
          onClick={() => {
            activeFilters.forEach(filter => onClearFilter(filter.type));
          }}
          className="text-text-secondary hover:text-primary text-sm underline transition-smooth"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default FilterChips;