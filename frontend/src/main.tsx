import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, /*retryDelay: 300*/ } },
});

import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import HomePage from './pages/HomePage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import { StoreProvider } from './AppStateContext.tsx'
import CartPage from './pages/CartPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ShippingPage from './pages/ShippingPage.tsx'
import PaymentMethodPage from './pages/PaymentMethodPage.tsx'
import ProtectedRoute from './components/protected/ProtectedRoute.tsx'
import PlaceOrderPage from './pages/PlaceOrderPage.tsx'
import OrderPage from './pages/OrderPage.tsx'
import OrderHistoryPage from './pages/OrderHistoryPage.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginPage />} />
      <Route index={true} element={<HomePage />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="" element={<ProtectedRoute />}> 
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="order/:id" element={<OrderPage />} />
        <Route path="history" element={<OrderHistoryPage />} />
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
    <PayPalScriptProvider options={{ 'clientId': 'sb' }} deferLoading={true} >
        <QueryClientProvider client={queryClient} >
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>,
)
