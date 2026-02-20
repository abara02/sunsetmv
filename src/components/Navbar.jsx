'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, MapPin, User } from 'lucide-react';
import './Navbar.css';

const Navbar = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const { cartCount, openCart } = useCart();

    const isSolidNavbar = pathname !== '/';

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
            data-page={pathname.split('/')[1] || 'home'}
        >
            <div className="navbar-container container">
                <Link href="/" className="logo">
                    <img src="/smv-logo-footer.png" alt="Sunset Meadow Vineyards" />
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links desktop-only">
                    <div className="nav-item-dropdown">
                        <Link href="/visit" className="dropdown-trigger">Visit</Link>
                        <div className="dropdown-menu">
                            <Link href="/visit#tasting-room">Tasting Room</Link>
                            <Link href="/visit#location">Location</Link>
                        </div>
                    </div>
                    <div className="nav-item-dropdown">
                        <Link href="/shop" className="dropdown-trigger">Shop</Link>
                        <div className="dropdown-menu">
                            <Link href="/shop?category=white">White Wines</Link>
                            <Link href="/shop?category=fruit">Fruit Wines</Link>
                            <Link href="/shop?category=rose">Rosé Wines</Link>
                            <Link href="/shop?category=red">Red Wines</Link>
                            <Link href="/shop?category=reserve">Reserve Wines</Link>
                            <Link href="/shop?category=sparkling">Sparkling Wines</Link>
                            <Link href="/shop?category=more">More</Link>
                        </div>
                    </div>
                    <div className="nav-item-dropdown">
                        <Link href="/events" className="dropdown-trigger">Events</Link>
                        <div className="dropdown-menu">
                            <Link href="/events#scheduled-events">Scheduled Events</Link>
                            <Link href="/events#private-events">Private Events</Link>
                        </div>
                    </div>
                    <Link href="/about">Our Story</Link>
                    <Link href="/faq">FAQ</Link>
                </div>

                <div className="nav-actions">
                    <Link href="/where-to-buy" className="icon-link" title="Where to Buy">
                        <MapPin size={22} />
                    </Link>

                    <Link href="/account" className="icon-link" title="Account">
                        <User size={22} />
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
                    <Link href="/shop" onClick={closeMenu}>Shop</Link>
                    <Link href="/visit" onClick={closeMenu}>Visit</Link>
                    <Link href="/events" onClick={closeMenu}>Events</Link>
                    <Link href="/about" onClick={closeMenu}>Our Story</Link>
                    <Link href="/faq" onClick={closeMenu}>FAQ</Link>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;
