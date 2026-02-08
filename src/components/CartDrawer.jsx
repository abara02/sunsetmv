'use client';

import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import './CartDrawer.css';

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="cart-drawer-overlay" onClick={closeCart}>
            <div className="cart-drawer" onClick={e => e.stopPropagation()}>
                <div className="cart-drawer-header">
                    <h2>Cart</h2>
                    <button className="close-btn" onClick={closeCart}>
                        <X size={24} />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty-state">
                        <p>Your cart is empty.</p>
                        <button className="btn btn-primary" onClick={closeCart}>
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items-list">
                            {cartItems.map(item => (
                                <div key={item.id} className="drawer-item">
                                    <div className="drawer-item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="drawer-item-details">
                                        <div className="drawer-item-top">
                                            <Link href={`/shop/${item.slug}`} onClick={closeCart} className="drawer-item-name">
                                                {item.name}
                                            </Link>
                                            <div className="drawer-item-price-group">
                                                {item.onSale && item.regularPrice ? (
                                                    <div className="drawer-price-stack">
                                                        <span className="drawer-regular-price">${item.regularPrice.toFixed(2)}</span>
                                                        <span className="drawer-sale-price">${item.price.toFixed(2)}</span>
                                                    </div>
                                                ) : (
                                                    <span className="drawer-item-price">${item.price.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="drawer-item-controls">
                                            <div className="qty-controls">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                    <Minus size={14} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button className="drawer-remove-btn" onClick={() => removeFromCart(item.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-drawer-footer">
                            <div className="cart-summary-line">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span className="summary-price">${cartTotal.toFixed(2)}</span>
                            </div>
                            <p className="shipping-note">Taxes and shipping calculated at checkout</p>
                            <Link href="/checkout" className="btn btn-primary btn-block checkout-btn" onClick={closeCart}>
                                Proceed to Checkout
                            </Link>
                            <button className="continue-shopping-btn" onClick={closeCart}>
                                Continue Shopping
                            </button>
                            <Link href="/cart" className="view-cart-link" onClick={closeCart}>
                                View Cart
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
