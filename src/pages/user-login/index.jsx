import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'user@amazon.com',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/homepage');
      } else {
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Mock social login success
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
    navigate('/homepage');
  };

  const socialProviders = [
    { name: 'Google', icon: 'Chrome', color: 'bg-red-500 hover:bg-red-600' },
    { name: 'Facebook', icon: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Apple', icon: 'Apple', color: 'bg-gray-900 hover:bg-black' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <Link to="/homepage" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={24} color="white" />
              </div>
              <span className="text-2xl font-bold text-text-primary">ShopHub</span>
            </Link>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
            <p className="text-text-secondary">Sign in to your account to continue shopping</p>
          </div>

          {/* Social Login Options */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3">
              {socialProviders.map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => handleSocialLogin(provider.name)}
                  className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg text-white font-medium transition-smooth ${provider.color}`}
                >
                  <Icon name={provider.icon} size={20} />
                  <span>Continue with {provider.name}</span>
                </button>
              ))}
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-text-secondary">Or continue with email</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-surface rounded-lg shadow-product-card p-6 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-center space-x-3">
                  <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
                  <p className="text-error text-sm">{errors.general}</p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                      errors.email ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Enter your email"
                  />
                  <Icon 
                    name="Mail" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1">
                    <Icon name="AlertCircle" size={16} />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                      errors.password ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Enter your password"
                  />
                  <Icon 
                    name="Lock" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1">
                    <Icon name="AlertCircle" size={16} />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">Remember me</span>
                </label>
                
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-700 transition-smooth"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={20} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-accent-600" />
                <span className="text-sm font-medium text-accent-600">Demo Credentials</span>
              </div>
              <div className="text-sm text-accent-600 space-y-1">
                <p><strong>Email:</strong> user@amazon.com</p>
                <p><strong>Password:</strong> password123</p>
              </div>
            </div>
          </div>

          {/* Create Account Link */}
          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary hover:text-primary-700 font-medium transition-smooth"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Guest Shopping Option */}
          <div className="mt-4 text-center">
            <Link
              to="/product-catalog"
              className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="ShoppingCart" size={16} />
              <span className="text-sm">Continue as Guest</span>
            </Link>
          </div>

          {/* Help Links */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
              <Link to="/help" className="hover:text-primary transition-smooth">
                Help Center
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-primary transition-smooth">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-primary transition-smooth">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;