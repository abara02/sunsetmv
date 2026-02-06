import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, MapPin } from 'lucide-react';
import './Navbar.css';

const Navbar = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const { cartCount, openCart } = useCart();

    const isSolidNavbar = location.pathname !== '/';

    useEffect(() => {
        let rafId = null;

        const handleScroll = () => {
            if (rafId) return;

            rafId = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 50);
                rafId = null;
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const toggleMenu = React.useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const closeMenu = React.useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <nav
            className={`navbar ${scrolled || isSolidNavbar ? 'scrolled' : ''}`}
            data-page={location.pathname.split('/')[1] || 'home'}
        >
            <div className="navbar-container container">
                <Link to="/" className="logo">
                    <img src="/smv-logo-footer.png" alt="Sunset Meadow Vineyards" />
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    <div className="nav-item-dropdown">
                        <Link to="/visit" className="dropdown-trigger">Visit</Link>
                        <div className="dropdown-menu">
                            <Link to="/visit#tasting-room">Tasting Room</Link>
                            <Link to="/visit#location">Location</Link>
                        </div>
                    </div>
                    <div className="nav-item-dropdown">
                        <Link to="/shop" className="dropdown-trigger">Shop</Link>
                        <div className="dropdown-menu">
                            <Link to="/shop?category=white">White Wines</Link>
                            <Link to="/shop?category=fruit">Fruit Wines</Link>
                            <Link to="/shop?category=rose">Rosé Wines</Link>
                            <Link to="/shop?category=red">Red Wines</Link>
                            <Link to="/shop?category=reserve">Reserve Wines</Link>
                            <Link to="/shop?category=sparkling">Sparkling Wines</Link>
                            <Link to="/shop?category=more">More</Link>
                        </div>
                    </div>
                    <div className="nav-item-dropdown">
                        <Link to="/events" className="dropdown-trigger">Events</Link>
                        <div className="dropdown-menu">
                            <Link to="/events#scheduled-events">Scheduled Events</Link>
                            <Link to="/events#private-events">Private Events</Link>
                        </div>
                    </div>
                    <Link to="/about">Our Story</Link>
                    <Link to="/faq">FAQ</Link>
                </div>

                <div className="nav-actions">
                    <Link to="/where-to-buy" className="icon-link" title="Where to Buy">
                        <MapPin size={22} />
                    </Link>

                    <button className="icon-link cart-trigger" title="Cart" onClick={openCart}>
                        <ShoppingBag size={22} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                    <button className="menu-toggle mobile-only" onClick={toggleMenu}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                    <Link to="/shop" onClick={closeMenu}>Shop</Link>
                    <Link to="/visit" onClick={closeMenu}>Visit</Link>
                    <Link to="/events" onClick={closeMenu}>Events</Link>
                    <Link to="/about" onClick={closeMenu}>Our Story</Link>
                    <Link to="/faq" onClick={closeMenu}>FAQ</Link>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;
