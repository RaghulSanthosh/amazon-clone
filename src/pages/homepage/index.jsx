import React from 'react';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const featuredCategories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      itemCount: "10,000+ items",
      discount: "Up to 50% off"
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      itemCount: "25,000+ items",
      discount: "Up to 70% off"
    },
    {
      id: 3,
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      itemCount: "15,000+ items",
      discount: "Up to 40% off"
    },
    {
      id: 4,
      name: "Sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      itemCount: "8,000+ items",
      discount: "Up to 60% off"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 49.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 1234
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 129.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 856
    },
    {
      id: 3,
      name: "Laptop Stand Adjustable",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 432
    },
    {
      id: 4,
      name: "Wireless Mouse",
      price: 34.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 678
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Everything You Need, 
                  <span className="block text-accent">All in One Place</span>
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Discover millions of products with fast shipping, great prices, and excellent customer service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/product-catalog"
                    className="bg-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-smooth text-center"
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/user-login"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-smooth text-center"
                  >
                    Sign Up Today
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                    alt="Shopping Experience"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-modal">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                      <Icon name="Truck" size={24} className="text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">Free Shipping</p>
                      <p className="text-sm text-text-secondary">On orders over $50</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Fast Delivery</h3>
                <p className="text-text-secondary">Free shipping on orders over $50. Get your items delivered quickly and safely.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Secure Shopping</h3>
                <p className="text-text-secondary">Your personal information and payments are protected with industry-leading security.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="RotateCcw" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Easy Returns</h3>
                <p className="text-text-secondary">Not satisfied? Return items within 30 days for a full refund, no questions asked.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-text-secondary">
                Explore our wide range of products across different categories
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category) => (
                <Link
                  key={category.id}
                  to="/product-catalog"
                  className="group bg-surface rounded-xl overflow-hidden shadow-product-card hover:shadow-modal transition-smooth hover-lift"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded-full text-sm font-medium">
                      {category.discount}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {category.name}
                    </h3>
                    <p className="text-text-secondary mb-4">{category.itemCount}</p>
                    <div className="flex items-center text-primary font-medium">
                      <span>Shop Now</span>
                      <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  Featured Products
                </h2>
                <p className="text-xl text-text-secondary">
                  Handpicked items just for you
                </p>
              </div>
              <Link
                to="/product-catalog"
                className="hidden sm:flex items-center space-x-2 text-primary hover:text-primary-700 font-medium transition-smooth"
              >
                <span>View All Products</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to="/product-detail"
                  className="group bg-background rounded-xl overflow-hidden shadow-product-card hover:shadow-modal transition-smooth hover-lift"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-error text-white px-2 py-1 rounded-full text-sm font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={`${
                              i < Math.floor(product.rating)
                                ? 'text-accent fill-current' :'text-secondary-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-text-secondary ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-text-primary">
                        ${product.price}
                      </span>
                      <span className="text-lg text-text-secondary line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-700 transition-smooth font-medium">
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8 sm:hidden">
              <Link
                to="/product-catalog"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-medium transition-smooth"
              >
                <span>View All Products</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay Updated with Our Latest Deals
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter and never miss out on exclusive offers and new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-smooth">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-text-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="ShoppingBag" size={20} color="white" />
                  </div>
                  <span className="text-xl font-semibold">ShopHub</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent service.
                </p>
                <div className="flex space-x-4">
                  <Icon name="Facebook" size={20} className="text-gray-400 hover:text-white cursor-pointer transition-smooth" />
                  <Icon name="Twitter" size={20} className="text-gray-400 hover:text-white cursor-pointer transition-smooth" />
                  <Icon name="Instagram" size={20} className="text-gray-400 hover:text-white cursor-pointer transition-smooth" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/product-catalog" className="text-gray-400 hover:text-white transition-smooth">Shop</Link></li>
                  <li><Link to="/user-login" className="text-gray-400 hover:text-white transition-smooth">My Account</Link></li>
                  <li><Link to="/order-history" className="text-gray-400 hover:text-white transition-smooth">Order History</Link></li>
                  <li><Link to="/shopping-cart" className="text-gray-400 hover:text-white transition-smooth">Shopping Cart</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">FAQ</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Shipping Info</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Returns</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-2 text-gray-400">
                  <p className="flex items-center">
                    <Icon name="Phone" size={16} className="mr-2" />
                    1-800-SHOPHUB
                  </p>
                  <p className="flex items-center">
                    <Icon name="Mail" size={16} className="mr-2" />
                    support@shophub.com
                  </p>
                  <p className="flex items-start">
                    <Icon name="MapPin" size={16} className="mr-2 mt-1" />
                    123 Commerce St, Shopping City, SC 12345
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;