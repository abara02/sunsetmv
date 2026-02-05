import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // Initialize state from local storage to persist cart across refreshes
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('smv_cart_v1');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (err) {
            console.error("Failed to load cart from local storage", err);
            return [];
        }
    });

    // Update local storage whenever cart items change
    useEffect(() => {
        try {
            localStorage.setItem('smv_cart_v1', JSON.stringify(cartItems));
        } catch (err) {
            console.error("Failed to save cart to local storage", err);
        }
    }, [cartItems]);

    // Cart Drawer State
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    // Check if item is already in cart, if so update quantity, else add new
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                // Item exists, update quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                return updatedItems;
            } else {
                // New item
                return [...prevItems, {
                    id: product.id,
                    name: product.name,
                    price: product.price, // This will be the dynamic price (sale or regular)
                    regularPrice: product.regularPrice,
                    onSale: product.onSale,
                    image: product.image,
                    slug: product.slug,
                    quantity
                }];
            }
        });
        openCart(); // Auto open drawer
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate totals
    const cartCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
