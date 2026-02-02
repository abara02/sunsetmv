import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useParams, Link } from 'react-router-dom';
import { wines } from '../data/wines';
import { ArrowLeft, Wine } from 'lucide-react';
import './ProductDetails.css';

const ProductDetails = () => {
    const { slug } = useParams();
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const wine = wines.find(w => w.slug === slug);

    const handleAddToCart = () => {
        if (!wine) return;
        setAdding(true);
        // Simulate a small delay for better UX
        setTimeout(() => {
            addToCart(wine, quantity);
            setAdding(false);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }, 500);
    };

    if (!wine) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Wine not found</h2>
                <Link to="/shop" className="btn btn-outline">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            <div className="container">
                <div className="back-link">
                    <Link to="/shop"><ArrowLeft size={16} /> Back to Shop</Link>
                </div>

                <div className="product-layout">
                    {/* Left Column: Info & Actions */}
                    <div className="product-info-col">
                        <span className="product-type-label">{wine.type} Collection</span>
                        <h1 className="product-title">{wine.name}</h1>

                        <div className="product-price">${wine.price.toFixed(2)}</div>

                        <div className="stock-status">
                            <span className="indicator"></span> In Stock
                        </div>

                        <div className="add-to-cart-section">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button
                                className="btn btn-primary add-btn"
                                onClick={handleAddToCart}
                                disabled={adding}
                            >
                                {adding ? 'ADDING...' : 'ADD TO CART'}
                            </button>
                            {added && <span style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold' }}>Added!</span>}
                        </div>

                        <div className="product-description-tabs">
                            <div className="tab-header">DESCRIPTION</div>
                            <div className="tab-content">
                                <p>{wine.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="product-image-col">
                        {wine.image ? (
                            <img src={wine.image} alt={wine.name} className="main-product-image" />
                        ) : (
                            <div className="placeholder-details-image">
                                <Wine size={120} strokeWidth={0.5} color="#ccc" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Accolades Section - Only if awards exist */}
                {wine.awards && wine.awards.length > 0 && (
                    <div className="accolades-section">
                        <h2>Accolades/Awards</h2>
                        <ul className="awards-list">
                            {wine.awards.map((award, index) => (
                                <li key={index} className="award-item">
                                    {award}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Tech Specs Section */}
                {wine.specs && (
                    <div className="specs-section">
                        <h3>Specifications</h3>
                        <div className="specs-grid">
                            <div className="spec-item">
                                <span className="label">Alcohol</span>
                                <span className="value">{wine.specs.alc}</span>
                            </div>
                            {wine.specs.weight && (
                                <div className="spec-item">
                                    <span className="label">Weight</span>
                                    <span className="value">{wine.specs.weight}</span>
                                </div>
                            )}
                            {wine.specs.dimensions && (
                                <div className="spec-item">
                                    <span className="label">Dimensions</span>
                                    <span className="value">{wine.specs.dimensions}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductDetails;
