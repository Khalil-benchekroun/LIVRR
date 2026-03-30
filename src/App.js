import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './index.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderTracking from './pages/OrderTracking';
import Profile from './pages/Profile';
import FidelityProgram from './pages/FidelityProgram';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100vh' }}><div className="spinner"/></div>;
  return user ? children : <Navigate to="/login" />;
}

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingBottom: '80px' }}>
        {children}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster
            position="top-center"
            toastOptions={{
              style: { fontFamily: 'DM Sans, sans-serif', fontSize: '14px' },
              success: { iconTheme: { primary: '#C9A96E', secondary: '#fff' } }
            }}
          />
          <Routes>
            {/* Auth routes — no navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* App routes */}
            <Route path="/" element={<AppLayout><Home /></AppLayout>} />
            <Route path="/catalog" element={<AppLayout><Catalog /></AppLayout>} />
            <Route path="/catalog/:category" element={<AppLayout><Catalog /></AppLayout>} />
            <Route path="/product/:id" element={<AppLayout><ProductDetail /></AppLayout>} />
            <Route path="/cart" element={<AppLayout><Cart /></AppLayout>} />
            <Route path="/checkout" element={<PrivateRoute><AppLayout><Checkout /></AppLayout></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><AppLayout><Orders /></AppLayout></PrivateRoute>} />
            <Route path="/orders/:id" element={<PrivateRoute><AppLayout><OrderTracking /></AppLayout></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><AppLayout><Profile /></AppLayout></PrivateRoute>} />
            <Route path="/fidelite" element={<PrivateRoute><AppLayout><FidelityProgram /></AppLayout></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
