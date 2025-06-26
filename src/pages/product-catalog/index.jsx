import React, { useState, useEffect, useRef } from 'react';

import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import ProductCard from './components/ProductCard';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    brand: '',
    rating: 0,
    availability: 'all'
  });
  
  const observerRef = useRef();
  const filterSidebarRef = useRef();

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      title: "Apple iPhone 15 Pro Max",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviewCount: 2847,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "Apple",
      availability: "in-stock",
      discount: 8,
      isNew: true,
      features: ["256GB Storage", "Pro Camera System", "Titanium Design"]
    },
    {
      id: 2,
      title: "Samsung Galaxy S24 Ultra",
      price: 1099.99,
      originalPrice: 1199.99,
      rating: 4.7,
      reviewCount: 1923,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "Samsung",
      availability: "in-stock",
      discount: 8,
      features: ["S Pen Included", "200MP Camera", "5000mAh Battery"]
    },
    {
      id: 3,
      title: "Sony WH-1000XM5 Headphones",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.9,
      reviewCount: 5621,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "Sony",
      availability: "in-stock",
      discount: 13,
      isBestseller: true,
      features: ["Noise Cancelling", "30hr Battery", "Premium Sound"]
    },
    {
      id: 4,
      title: "MacBook Air M3 13-inch",
      price: 1099.99,
      originalPrice: 1199.99,
      rating: 4.8,
      reviewCount: 3456,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "Apple",
      availability: "in-stock",
      discount: 8,
      features: ["M3 Chip", "18hr Battery", "Liquid Retina Display"]
    },
    {
      id: 5,
      title: "Nike Air Max 270",
      price: 149.99,
      originalPrice: 179.99,
      rating: 4.6,
      reviewCount: 8934,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Fashion",
      brand: "Nike",
      availability: "in-stock",
      discount: 17,
      features: ["Air Max Technology", "Breathable Mesh", "Durable Sole"]
    },
    {
      id: 6,
      title: "Adidas Ultraboost 22",
      price: 189.99,
      originalPrice: 219.99,
      rating: 4.7,
      reviewCount: 6782,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      category: "Fashion",
      brand: "Adidas",
      availability: "low-stock",
      discount: 14,
      features: ["Boost Midsole", "Primeknit Upper", "Continental Rubber"]
    },
    {
      id: 7,
      title: "Instant Pot Duo 7-in-1",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviewCount: 12456,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      category: "Home & Kitchen",
      brand: "Instant Pot",
      availability: "in-stock",
      discount: 20,
      isBestseller: true,
      features: ["7-in-1 Functions", "6 Quart Capacity", "Smart Programs"]
    },
    {
      id: 8,
      title: "KitchenAid Stand Mixer",
      price: 379.99,
      originalPrice: 429.99,
      rating: 4.8,
      reviewCount: 9876,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category: "Home & Kitchen",
      brand: "KitchenAid",
      availability: "in-stock",
      discount: 12,
      features: ["5 Quart Bowl", "10 Speeds", "Tilt-Head Design"]
    },
    {
      id: 9,
      title: "Dyson V15 Detect Vacuum",
      price: 649.99,
      originalPrice: 749.99,
      rating: 4.7,
      reviewCount: 4321,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      category: "Home & Kitchen",
      brand: "Dyson",
      availability: "in-stock",
      discount: 13,
      features: ["Laser Detection", "60min Runtime", "HEPA Filtration"]
    },
    {
      id: 10,
      title: "Levi\'s 501 Original Jeans",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.4,
      reviewCount: 15678,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      category: "Fashion",
      brand: "Levi\'s",
      availability: "in-stock",
      discount: 25,
      features: ["100% Cotton", "Classic Fit", "Button Fly"]
    },
    {
      id: 11,
      title: "Canon EOS R6 Mark II",
      price: 2399.99,
      originalPrice: 2499.99,
      rating: 4.9,
      reviewCount: 1234,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
      category: "Electronics",
      brand: "Canon",
      availability: "in-stock",
      discount: 4,
      isNew: true,
      features: ["24.2MP Sensor", "4K Video", "In-Body Stabilization"]
    },
    {
      id: 12,
      title: "The North Face Jacket",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviewCount: 7890,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      category: "Fashion",
      brand: "The North Face",
      availability: "in-stock",
      discount: 20,
      features: ["Waterproof", "Breathable", "Insulated"]
    }
  ];

  const categories = ["All", "Electronics", "Fashion", "Home & Kitchen"];
  const brands = ["All", "Apple", "Samsung", "Sony", "Nike", "Adidas", "Instant Pot", "KitchenAid", "Dyson", "Levi\'s", "Canon", "The North Face"];
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filters, sortBy]);

  const loadProducts = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const startIndex = (page - 1) * 12;
      const endIndex = startIndex + 12;
      const newProducts = mockProducts.slice(startIndex, endIndex);
      
      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setHasMore(endIndex < mockProducts.length);
      setLoading(false);
    }, 500);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Apply filters
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.brand && filters.brand !== 'All') {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    if (filters.availability !== 'all') {
      filtered = filtered.filter(product => product.availability === filters.availability);
    }

    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilter = (filterType) => {
    const newFilters = { ...filters };
    switch (filterType) {
      case 'category':
        newFilters.category = '';
        break;
      case 'brand':
        newFilters.brand = '';
        break;
      case 'rating':
        newFilters.rating = 0;
        break;
      case 'price':
        newFilters.priceRange = [0, 1000];
        break;
      case 'availability':
        newFilters.availability = 'all';
        break;
      default:
        break;
    }
    setFilters(newFilters);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      loadProducts();
    }
  };

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  // Close filter sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterSidebarRef.current && !filterSidebarRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
              Product Catalog
            </h1>
            <p className="text-text-secondary">
              Discover amazing products at great prices
            </p>
          </div>

          {/* Filter Chips */}
          <FilterChips 
            filters={filters}
            onClearFilter={clearFilter}
          />

          {/* Mobile Filter Button & Sort */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-secondary-100 transition-smooth"
            >
              <Icon name="Filter" size={20} />
              <span className="font-medium">Filters</span>
            </button>
            
            <SortDropdown
              sortBy={sortBy}
              onSortChange={setSortBy}
              options={sortOptions}
            />
          </div>

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                categories={categories}
                brands={brands}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Desktop Sort & Results Count */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-text-secondary">
                  Showing {filteredProducts.length} results
                </p>
                <SortDropdown
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  options={sortOptions}
                />
              </div>

              {/* Mobile Results Count */}
              <div className="lg:hidden mb-4">
                <p className="text-sm text-text-secondary">
                  {filteredProducts.length} results
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-text-secondary">Loading more products...</span>
                </div>
              )}

              {/* Load More Trigger */}
              <div ref={observerRef} className="h-4"></div>

              {/* No More Products */}
              {!hasMore && filteredProducts.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-text-secondary">You've seen all products</p>
                </div>
              )}

              {/* No Results */}
              {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No products found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={() => setFilters({
                      category: '',
                      priceRange: [0, 1000],
                      brand: '',
                      rating: 0,
                      availability: 'all'
                    })}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div 
            ref={filterSidebarRef}
            className="fixed right-0 top-0 h-full w-80 bg-surface shadow-modal transform transition-transform"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto h-full pb-20">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                categories={categories}
                brands={brands}
                isMobile={true}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-surface border-t border-border">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-700 transition-smooth font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;