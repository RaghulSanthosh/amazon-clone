import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Homepage from "pages/homepage";
import UserLogin from "pages/user-login";
import ShoppingCart from "pages/shopping-cart";
import ProductCatalog from "pages/product-catalog";
import OrderHistory from "pages/order-history";
import ProductDetail from "pages/product-detail";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/product-catalog" element={<ProductCatalog />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;