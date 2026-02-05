import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';

import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Visit from './pages/Visit';
import RentalInquiry from './pages/RentalInquiry';
import WhereToBuy from './pages/WhereToBuy';
import Awards from './pages/Awards';
import FAQ from './pages/FAQ';
import Cart from './pages/Cart';


import { CartProvider } from './context/CartContext';
import { ShopProvider } from './context/ShopContext';

function App() {
  return (
    <ShopProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<ProductDetails />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/inquire" element={<RentalInquiry />} />
            <Route path="/about" element={<About />} />
            <Route path="/where-to-buy" element={<WhereToBuy />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </ShopProvider>
  );
}


export default App;
