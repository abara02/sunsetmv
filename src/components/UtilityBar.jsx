import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag } from 'lucide-react';
import './UtilityBar.css';

const UtilityBar = () => {
    return (
        <div className="utility-bar">
            <div className="container utility-bar-container">
                <div className="utility-left">
                    {/* Placeholder for future utility items or social icons */}
                </div>
                <div className="utility-right">
                    <Link to="/account" className="utility-link">
                        <User size={14} className="icon-small" />
                        <span>My Account</span>
                    </Link>
                    <span className="divider">|</span>
                    <Link to="/cart" className="utility-link">
                        <ShoppingBag size={14} className="icon-small" />
                        <span>Checkout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UtilityBar;
