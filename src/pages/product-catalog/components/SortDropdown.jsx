import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === sortBy);

  const handleOptionSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-secondary-100 transition-smooth min-w-48"
      >
        <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
        <span className="text-text-primary font-medium">
          {selectedOption?.label || 'Sort by'}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transform transition-transform ml-auto ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-modal z-10 py-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`w-full text-left px-4 py-2 hover:bg-secondary-100 transition-smooth ${
                sortBy === option.value ? 'text-primary bg-primary-50' : 'text-text-secondary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;