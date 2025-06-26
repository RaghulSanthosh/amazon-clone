import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  const navigationItems = [
    { label: 'Shop', path: '/product-catalog', icon: 'Store' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart', badge: cartItemCount }
  ];

  const accountMenuItems = isAuthenticated ? [
    { label: 'Order History', path: '/order-history', icon: 'Package' },
    { label: 'Account Settings', path: '/account', icon: 'Settings' },
    { label: 'Logout', action: 'logout', icon: 'LogOut' }
  ] : [
    { label: 'Sign In', path: '/user-login', icon: 'LogIn' },
    { label: 'Create Account', path: '/register', icon: 'UserPlus' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAccountAction = (item) => {
    if (item.action === 'logout') {
      setIsAuthenticated(false);
      setIsAccountDropdownOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 hover:opacity-80 transition-smooth"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ShoppingBag" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary hidden sm:block">
              ShopHub
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth relative ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Account Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-smooth"
              >
                <Icon name="User" size={20} />
                <span className="font-medium">Account</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transform transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-border py-2 z-200">
                  {accountMenuItems.map((item, index) => (
                    <div key={index}>
                      {item.path ? (
                        <Link
                          to={item.path}
                          onClick={() => setIsAccountDropdownOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-smooth"
                        >
                          <Icon name={item.icon} size={16} />
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleAccountAction(item)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-smooth"
                        >
                          <Icon name={item.icon} size={16} />
                          <span>{item.label}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden bg-surface border-t border-border shadow-modal"
        >
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-smooth ${
                  isActivePath(item.path)
                    ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="border-t border-border pt-2 mt-4">
              <div className="px-4 py-2 text-sm font-medium text-text-secondary">
                Account
              </div>
              {accountMenuItems.map((item, index) => (
                <div key={index}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-smooth"
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        handleAccountAction(item);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-100 transition-smooth"
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;