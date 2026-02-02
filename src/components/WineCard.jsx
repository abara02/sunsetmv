import React from 'react';
import { Wine, ShoppingBag } from 'lucide-react';
import './WineCard.css';

const WineCard = ({ name, type, price, image, isFanFavorite }) => {
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
            </div>
            <div className="wine-info">
                <h3>{name}</h3>
                <p className="wine-type">{type}</p>
                <span className="wine-price">${price.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default WineCard;
