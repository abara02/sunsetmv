'use client';

import React, { useState, useEffect } from 'react';
import { Wine, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './WineCard.css';

const WineCard = ({ id, slug, name, type, price, regularPrice, salePrice, onSale, image, isFanFavorite }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // On smaller screens, don't open the cart automatically
        const shouldOpenDrawer = window.innerWidth > 768;

        addToCart({ id, slug, name, price, regularPrice, salePrice, onSale, image }, 1, shouldOpenDrawer);

        setIsAdded(true);
    };

    // Auto-reset the "Added" state after 4 seconds
    useEffect(() => {
        if (isAdded) {
            const timer = setTimeout(() => {
                setIsAdded(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isAdded]);

    return (
        <div className="wine-card">
            <div className="wine-image">
                {image ? (
                    <img src={image} alt={name} />
                ) : (
                    <div className="placeholder-bottle">
                        <Wine size={64} strokeWidth={1} color="#ccc" />
                    </div>
                )}

                <button
                    className={`add-to-cart-btn ${isAdded ? 'is-added' : ''}`}
                    aria-label={isAdded ? "Added to Cart" : "Add to Cart"}
                    onClick={handleAddToCart}
                    disabled={isAdded}
                >
                    {isAdded ? (
                        <>
                            <Check size={18} />
                            <span className="added-text">Added!</span>
                        </>
                    ) : (
                        <ShoppingBag size={20} />
                    )}
                </button>

                {isFanFavorite && <div className="fan-favorite-badge">Fan Favorite</div>}
                {onSale && <img src="/images/sale-badge.png" alt="SALE" className="sale-badge-img" />}
            </div>
            <div className="wine-info">
                <h3>{name}</h3>
                {type !== 'More' && <p className="wine-type">{type}</p>}
                <div className="price-display">
                    {onSale && regularPrice ? (
                        <>
                            <span className="regular-price">${regularPrice.toFixed(2)}</span>
                            <span className="sale-price">${price.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="wine-price">${price.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WineCard;
