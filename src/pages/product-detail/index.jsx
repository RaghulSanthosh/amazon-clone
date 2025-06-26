import React, { useState, useEffect } from 'react';

import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';


import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import PurchasePanel from './components/PurchasePanel';
import RelatedProducts from './components/RelatedProducts';

const ProductDetail = () => {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const productData = {
    id: 1,
    title: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199.99,
    originalPrice: 1299.99,
    discount: 8,
    rating: 4.6,
    reviewCount: 2847,
    availability: "In Stock",
    sku: "APL-IP15PM-256-TBL",
    category: "Electronics > Smartphones",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=800&fit=crop"
    ],
    variants: [
      { id: 'titanium-blue', name: 'Titanium Blue', color: '#4A90E2', price: 1199.99, available: true },
      { id: 'titanium-natural', name: 'Natural Titanium', color: '#8E8E93', price: 1199.99, available: true },
      { id: 'titanium-white', name: 'White Titanium', color: '#F2F2F7', price: 1199.99, available: true },
      { id: 'titanium-black', name: 'Black Titanium', color: '#1C1C1E', price: 1199.99, available: false }
    ],
    specifications: [
      { label: 'Display', value: '6.7-inch Super Retina XDR' },
      { label: 'Chip', value: 'A17 Pro chip' },
      { label: 'Storage', value: '256GB' },
      { label: 'Camera', value: '48MP Main, 12MP Ultra Wide, 12MP Telephoto' },
      { label: 'Battery', value: 'Up to 29 hours video playback' },
      { label: 'Operating System', value: 'iOS 17' }
    ],
    description: `The iPhone 15 Pro Max represents the pinnacle of smartphone technology, featuring the revolutionary A17 Pro chip built on 3-nanometer technology. This powerhouse delivers unprecedented performance and efficiency, making it perfect for everything from everyday tasks to professional workflows.

The stunning 6.7-inch Super Retina XDR display with ProMotion technology provides an immersive viewing experience with incredible detail and vibrant colors. Whether you're watching movies, editing photos, or gaming, every pixel comes to life with remarkable clarity.

The advanced camera system transforms how you capture memories. The 48MP Main camera with 2x Telephoto option gives you incredible flexibility, while the Ultra Wide camera captures more of the scene. Night mode, Portrait mode, and Cinematic mode ensure your photos and videos look professional in any lighting condition.`,
    features: [
      "A17 Pro chip with 6-core GPU",
      "Pro camera system with 48MP Main camera",
      "6.7-inch Super Retina XDR display with ProMotion",
      "Titanium design with textured matte glass back",
      "Action Button for quick access to features",
      "USB-C connector with USB 3 support",
      "Face ID for secure authentication",
      "5G connectivity for ultra-fast downloads",
      "MagSafe and Qi wireless charging",
      "Water resistant to 6 meters for up to 30 minutes"
    ],
    shipping: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      returnPolicy: "30-day return policy",
      warranty: "1-year limited warranty"
    }
  };

  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2024-01-15",
      title: "Absolutely amazing phone!",
      content: `I've been using this phone for 3 months now and it's incredible. The camera quality is outstanding, especially in low light conditions. The battery life easily gets me through a full day of heavy usage. The titanium build feels premium and durable.

The A17 Pro chip handles everything I throw at it without any lag. Gaming, video editing, multitasking - everything is smooth. Highly recommend this phone to anyone looking for the best iPhone experience.`,
      helpful: 24,
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      date: "2024-01-10",
      title: "Great upgrade from iPhone 13",
      content: `Coming from an iPhone 13, the improvements are noticeable. The camera system is significantly better, especially the telephoto lens. The titanium design feels more premium and is lighter than expected.

Battery life is excellent - easily lasts a full day with heavy usage. The only minor complaint is the price, but the quality justifies it. The Action Button is a nice addition that I use for quick camera access.`,
      helpful: 18,
      images: []
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      date: "2024-01-08",
      title: "Perfect for photography enthusiasts",
      content: `As a photography enthusiast, this phone exceeded my expectations. The 48MP camera captures incredible detail, and the new telephoto options give me more creative flexibility. Night mode has improved dramatically.

The ProRAW feature is fantastic for editing. The display is gorgeous for reviewing photos. Build quality is top-notch with the titanium construction. Worth every penny for serious mobile photographers.`,
      helpful: 31,
      images: [
        "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=300&fit=crop"
      ]
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      title: "iPhone 15 Pro",
      price: 999.99,
      originalPrice: 1099.99,
      rating: 4.5,
      reviewCount: 1892,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      badge: "Popular"
    },
    {
      id: 3,
      title: "AirPods Pro (2nd Gen)",
      price: 249.99,
      originalPrice: 279.99,
      rating: 4.7,
      reviewCount: 3421,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 4,
      title: "MagSafe Charger",
      price: 39.99,
      originalPrice: 49.99,
      rating: 4.3,
      reviewCount: 892,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
      badge: ""
    },
    {
      id: 5,
      title: "iPhone 15 Silicone Case",
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.4,
      reviewCount: 567,
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop",
      badge: "New"
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Electronics', path: '/product-catalog', icon: 'Smartphone' },
    { label: 'Smartphones', path: '/product-catalog', icon: 'Smartphone' },
    { label: productData.title, path: '/product-detail', icon: 'Package', isLast: true }
  ];

  useEffect(() => {
    if (productData.variants.length > 0) {
      setSelectedVariant(productData.variants[0].id);
    }
  }, []);

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      productId: productData.id,
      variant: selectedVariant,
      quantity: quantity
    });
  };

  const handleBuyNow = () => {
    console.log('Buy now:', {
      productId: productData.id,
      variant: selectedVariant,
      quantity: quantity
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Product Images */}
            <div className="lg:col-span-6">
              <ProductImageGallery images={productData.images} title={productData.title} />
            </div>
            
            {/* Product Info & Purchase Panel */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Product Info */}
                <div className="xl:col-span-8">
                  <ProductInfo 
                    product={productData}
                    selectedVariant={selectedVariant}
                    onVariantChange={setSelectedVariant}
                  />
                </div>
                
                {/* Purchase Panel */}
                <div className="xl:col-span-4">
                  <PurchasePanel
                    product={productData}
                    selectedVariant={selectedVariant}
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-12">
            <ProductTabs
              product={productData}
              reviews={reviews}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;