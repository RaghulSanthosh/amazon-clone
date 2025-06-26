import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/homepage': { label: 'Home', icon: 'Home' },
    '/product-catalog': { label: 'Shop', icon: 'Store' },
    '/product-detail': { label: 'Product Details', icon: 'Package' },
    '/shopping-cart': { label: 'Shopping Cart', icon: 'ShoppingCart' },
    '/user-login': { label: 'Sign In', icon: 'LogIn' },
    '/order-history': { label: 'Order History', icon: 'Package' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/homepage', icon: 'Home' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo) {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs.length > 1 ? breadcrumbs : [];
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-muted mx-2" 
              />
            )}
            
            {item.isLast ? (
              <span className="flex items-center space-x-1 text-text-primary font-medium">
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </span>
            ) : (
              <Link
                to={item.path}
                className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-smooth"
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;