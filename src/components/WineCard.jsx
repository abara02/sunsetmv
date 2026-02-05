import React from 'react';
import { Wine, ShoppingBag } from 'lucide-react';
import './WineCard.css';

const WineCard = ({ name, type, price, regularPrice, salePrice, onSale, image, isFanFavorite }) => {
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
                <button className="add-to-cart-btn" aria-label="Add to Cart">
                    <ShoppingBag size={20} />
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
