import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import OrderCard from './components/OrderCard';
import OrderFilters from './components/OrderFilters';
import OrderSearch from './components/OrderSearch';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    searchQuery: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

  // Mock order data
  const mockOrders = [
    {
      id: "ORD-2024-001",
      orderNumber: "112-3456789-1234567",
      date: new Date('2024-01-15'),
      status: "delivered",
      total: 89.97,
      items: [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          price: 49.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
          seller: "TechGear Store"
        },
        {
          id: 2,
          name: "USB-C Charging Cable",
          price: 19.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
          seller: "ElectroHub"
        }
      ],
      shippingAddress: `123 Main Street
Apartment 4B
New York, NY 10001
United States`,
      trackingNumber: "1Z999AA1234567890",
      deliveryDate: new Date('2024-01-18'),
      paymentMethod: "Credit Card ending in 4567"
    },
    {
      id: "ORD-2024-002",
      orderNumber: "112-7890123-4567890",
      date: new Date('2024-01-10'),
      status: "shipped",
      total: 156.48,
      items: [
        {
          id: 3,
          name: "Smart Fitness Watch",
          price: 129.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
          seller: "FitTech Solutions"
        },
        {
          id: 4,
          name: "Silicone Watch Band",
          price: 26.49,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=300&h=300&fit=crop",
          seller: "AccessoryWorld"
        }
      ],
      shippingAddress: `123 Main Street
Apartment 4B
New York, NY 10001
United States`,
      trackingNumber: "1Z999AA0987654321",
      estimatedDelivery: new Date('2024-01-20'),
      paymentMethod: "Credit Card ending in 4567"
    },
    {
      id: "ORD-2024-003",
      orderNumber: "112-4567890-1234567",
      date: new Date('2024-01-05'),
      status: "processing",
      total: 234.95,
      items: [
        {
          id: 5,
          name: "Laptop Stand Adjustable",
          price: 79.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
          seller: "OfficeEssentials"
        },
        {
          id: 6,
          name: "Wireless Mouse",
          price: 34.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop",
          seller: "TechGear Store"
        },
        {
          id: 7,
          name: "Mechanical Keyboard",
          price: 119.97,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
          seller: "KeyboardPro"
        }
      ],
      shippingAddress: `123 Main Street
Apartment 4B
New York, NY 10001
United States`,
      estimatedShipping: new Date('2024-01-22'),
      paymentMethod: "Credit Card ending in 4567"
    },
    {
      id: "ORD-2023-004",
      orderNumber: "112-1234567-8901234",
      date: new Date('2023-12-20'),
      status: "cancelled",
      total: 45.99,
      items: [
        {
          id: 8,
          name: "Phone Case Clear",
          price: 15.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
          seller: "PhoneAccessories"
        },
        {
          id: 9,
          name: "Screen Protector Pack",
          price: 29.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=300&h=300&fit=crop",
          seller: "ProtectTech"
        }
      ],
      shippingAddress: `123 Main Street
Apartment 4B
New York, NY 10001
United States`,
      cancelledDate: new Date('2023-12-21'),
      cancelReason: "Customer requested cancellation",
      paymentMethod: "Credit Card ending in 4567"
    },
    {
      id: "ORD-2023-005",
      orderNumber: "112-8901234-5678901",
      date: new Date('2023-12-15'),
      status: "returned",
      total: 67.98,
      items: [
        {
          id: 10,
          name: "Bluetooth Speaker Portable",
          price: 67.98,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
          seller: "AudioTech"
        }
      ],
      shippingAddress: `123 Main Street
Apartment 4B
New York, NY 10001
United States`,
      returnDate: new Date('2023-12-25'),
      returnReason: "Product not as described",
      refundAmount: 67.98,
      paymentMethod: "Credit Card ending in 4567"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case '30days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case '3months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case '6months':
          filterDate.setMonth(now.getMonth() - 6);
          break;
        case '1year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          filterDate.setFullYear(1970);
      }
      
      filtered = filtered.filter(order => order.date >= filterDate);
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    setFilteredOrders(filtered);
  }, [filters, orders]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-success bg-success-50';
      case 'shipped':
        return 'text-primary bg-primary-50';
      case 'processing':
        return 'text-warning bg-warning-50';
      case 'cancelled':
        return 'text-error bg-error-50';
      case 'returned':
        return 'text-secondary bg-secondary-100';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      case 'returned':
        return 'RotateCcw';
      default:
        return 'Package';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading your orders...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb customItems={[
            { label: 'Home', path: '/homepage', icon: 'Home' },
            { label: 'Order History', path: '/order-history', icon: 'Package', isLast: true }
          ]} />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Order History</h1>
              <p className="text-text-secondary">
                Track and manage your past purchases
              </p>
            </div>
            
            {/* View Mode Toggle - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-sm text-text-secondary">View:</span>
              <div className="flex bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-smooth ${
                    viewMode === 'card' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="LayoutGrid" size={16} className="inline mr-1" />
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-smooth ${
                    viewMode === 'table' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="List" size={16} className="inline mr-1" />
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <OrderSearch 
                searchQuery={filters.searchQuery}
                onSearchChange={(query) => handleFilterChange({ searchQuery: query })}
              />
            </div>
            <div>
              <OrderFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Package" size={48} className="text-text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">No Orders Found</h3>
              <p className="text-text-secondary mb-6">
                {filters.searchQuery || filters.status !== 'all' || filters.dateRange !== 'all' ?'Try adjusting your search or filters' :'You haven\'t placed any orders yet'
                }
              </p>
              <button
                onClick={() => setFilters({ status: 'all', dateRange: 'all', searchQuery: '' })}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-smooth font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <p className="text-text-secondary">
                  Showing {filteredOrders.length} of {orders.length} orders
                </p>
              </div>

              {/* Desktop Table View */}
              {viewMode === 'table' && (
                <div className="hidden lg:block bg-surface rounded-lg border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-secondary-50 border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Order</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Items</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Total</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-secondary-50 transition-smooth">
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-text-primary">{order.orderNumber}</p>
                                <p className="text-sm text-text-secondary">#{order.id}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-text-secondary">
                              {order.date.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                <Icon name={getStatusIcon(order.status)} size={12} className="mr-1" />
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex -space-x-2">
                                {order.items.slice(0, 3).map((item, index) => (
                                  <div key={index} className="w-8 h-8 rounded-full border-2 border-surface overflow-hidden">
                                    <Image 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                                {order.items.length > 3 && (
                                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-secondary-100 flex items-center justify-center">
                                    <span className="text-xs font-medium text-text-secondary">
                                      +{order.items.length - 3}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-text-primary">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => toggleOrderExpansion(order.id)}
                                className="text-primary hover:text-primary-700 font-medium text-sm transition-smooth"
                              >
                                {expandedOrders.has(order.id) ? 'Hide Details' : 'View Details'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Card View (Mobile + Desktop) */}
              {(viewMode === 'card' || window.innerWidth < 1024) && (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      isExpanded={expandedOrders.has(order.id)}
                      onToggleExpansion={() => toggleOrderExpansion(order.id)}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;