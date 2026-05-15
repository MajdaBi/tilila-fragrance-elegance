import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./i18n";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { StockProvider } from "./context/StockContext";
import { OrdersProvider } from "./context/OrdersContext";
import { ProductsProvider } from "./context/ProductsContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Index from "./pages/Index.tsx";
import Collection from "./pages/Collection";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound.tsx";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LoadingScreen />
      <Toaster />
      <Sonner position="top-center" />
      <AuthProvider>
        <ProductsProvider>
          <StockProvider>
            <CartProvider>
              <OrdersProvider>
                <BrowserRouter>
                  <Routes>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Index />} />
                      <Route path="/collection" element={<Collection />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                      <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </OrdersProvider>
            </CartProvider>
          </StockProvider>
        </ProductsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
