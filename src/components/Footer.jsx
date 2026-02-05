import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-column brand-col">

                    <Link to="/" className="footer-logo-link">
                        <img src="/smv-logo-footer.png" alt="Sunset Meadow Vineyards" className="footer-logo" />
                    </Link>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/sunsetmeadowvineyards" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <img src="/icon-instagram.png" alt="Instagram" />
                        </a>
                        <a href="https://www.google.com/search?q=sunset+meadow+vineyards+reviews" target="_blank" rel="noopener noreferrer" aria-label="Google Reviews">
                            <img src="gooog.png" alt="Google Reviews" />
                        </a>
                        <a href="https://www.facebook.com/sunsetmeadowvineyards" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <img src="/icon-facebook.png" alt="Facebook" />
                        </a>
                    </div>
                </div>

                <div className="footer-column">
                    <h4>Explore</h4>
                    <ul className="footer-links">
                        <li><a href="/shop">Shop Wines</a></li>
                        <li><a href="/visit">Visit & Tasting</a></li>
                        <li><a href="/events">Events Calendar</a></li>
                        <li><a href="/club">Wine Club</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Visit Us</h4>
                    <ul className="contact-info">
                        <li><MapPin size={16} /> 599 Old Middle Street, Goshen, CT 06756</li>
                        <li><a href="tel:8602014654"><Phone size={16} /> 860-201-4654</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Newsletter</h4>
                    <p>Join our list for exclusive offers and events.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your email address" />
                        <button className="btn btn-primary">Join</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom container">
                <p>&copy; {new Date().getFullYear()} Sunset Meadow Vineyards. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
