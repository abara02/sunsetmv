'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="container cart-container empty-cart">
                    <h2>Your Cart is Empty</h2>
                    <p>Looks like you haven't added any wines yet.</p>
                    <Link href="/shop" className="btn btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="cart-title">Your Shopping Cart</h1>

                <div className="cart-container">
                    <div className="cart-header">
                        <div>Product</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Total</div>
                        <div></div>
                    </div>

                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-product-info">
                                    {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
                                    <div className="cart-item-details">
                                        <h3><Link href={`/shop/${item.slug}`}>{item.name}</Link></h3>
                                    </div>
                                </div>
                                <div className="cart-item-price">
                                    ${item.price?.toFixed(2) || '0.00'}
                                </div>
                                <div className="quantity-wrapper">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <div className="cart-item-total">
                                    ${((item.price || 0) * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                    title="Remove item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row summary-total">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <Link href="/checkout" className="btn btn-primary checkout-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Proceed to Checkout <ArrowRight size={18} style={{ display: 'inline', marginLeft: '8px' }} />
                        </Link>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center', width: '100%' }}>
                            <Link href="/shop" style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                <ArrowLeft size={16} /> Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
