import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ filters, onFilterChange, categories, brands, isMobile = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
    availability: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterUpdate = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    handleFilterUpdate('priceRange', newRange);
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      priceRange: [0, 1000],
      brand: '',
      rating: 0,
      availability: 'all'
    });
  };

  const hasActiveFilters = filters.category || filters.brand || filters.rating > 0 || 
    filters.availability !== 'all' || filters.priceRange[0] > 0 || filters.priceRange[1] < 1000;

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-secondary-50 transition-smooth"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transform transition-transform ${
            expandedSections[sectionKey] ? 'rotate-180' : ''
          }`}
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-surface ${!isMobile ? 'rounded-lg border border-border' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-text-primary">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary-700 transition-smooth"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-border">
        {/* Category Filter */}
        <FilterSection title="Category" sectionKey="category">
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-smooth">
                <input
                  type="radio"
                  name="category"
                  value={category === 'All' ? '' : category}
                  checked={category === 'All' ? !filters.category : filters.category === category}
                  onChange={(e) => handleFilterUpdate('category', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-text-secondary">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection title="Price Range" sectionKey="price">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-xs text-text-secondary mb-1">Min</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  min="0"
                  max="1000"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-text-secondary mb-1">Max</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  min="0"
                  max="1000"
                />
              </div>
            </div>
            
            {/* Price Range Slider */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                className="absolute w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                className="absolute w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex justify-between text-xs text-text-secondary">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        {/* Brand Filter */}
        <FilterSection title="Brand" sectionKey="brand">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-smooth">
                <input
                  type="radio"
                  name="brand"
                  value={brand === 'All' ? '' : brand}
                  checked={brand === 'All' ? !filters.brand : filters.brand === brand}
                  onChange={(e) => handleFilterUpdate('brand', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <span className="text-text-secondary">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Customer Rating" sectionKey="rating">
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-smooth">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => handleFilterUpdate('rating', parseInt(e.target.value))}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Icon
                      key={index}
                      name="Star"
                      size={12}
                      className={`${index < rating ? 'text-accent fill-current' : 'text-secondary-300'}`}
                    />
                  ))}
                  <span className="text-text-secondary text-sm ml-1">& Up</span>
                </div>
              </label>
            ))}
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-smooth">
              <input
                type="radio"
                name="rating"
                value={0}
                checked={filters.rating === 0}
                onChange={(e) => handleFilterUpdate('rating', parseInt(e.target.value))}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-text-secondary">All Ratings</span>
            </label>
          </div>
        </FilterSection>

        {/* Availability Filter */}
        <FilterSection title="Availability" sectionKey="availability">
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-smooth">
              <input
                type="radio"
                name="availability"
                value="all"
                checked={filters.availability === 'all'}
                onChange={(e) => handleFilterUpdate('availability', e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-text-secondary">All Products</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-smooth">
              <input
                type="radio"
                name="availability"
                value="in-stock"
                checked={filters.availability === 'in-stock'}
                onChange={(e) => handleFilterUpdate('availability', e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-text-secondary">In Stock</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-smooth">
              <input
                type="radio"
                name="availability"
                value="low-stock"
                checked={filters.availability === 'low-stock'}
                onChange={(e) => handleFilterUpdate('availability', e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-text-secondary">Low Stock</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterSidebar;