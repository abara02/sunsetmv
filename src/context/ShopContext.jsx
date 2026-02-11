'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { wines as localWines } from '../data/wines';

const ShopContext = createContext();

export const useShop = () => {
    return useContext(ShopContext);
};

export const ShopProvider = ({ children }) => {
    const [wines, setWines] = useState(localWines);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            // Using the WooCommerce Store API (Public, no keys required)
            const restUrl = `/wp-json/wc/store/v1/products?per_page=100&_=${Date.now()}`;

            // Robust normalization for matching names (handles special characters, accents, etc.)
            const normalize = (str) => {
                if (!str) return '';
                return str.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents/diacritics
                    .replace(/[‘’'“”"]/g, "'") // Standardize all quotes/apostrophes
                    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric (dashes, spaces, etc.)
                    .trim();
            };

            const parsePrice = (priceVal) => {
                if (priceVal === undefined || priceVal === null || priceVal === '') return null;
                const valStr = String(priceVal);
                const cleanNum = parseFloat(valStr.replace(/[^0-9.]/g, ''));

                // Logic: If it has a dot, it's already in dollars (e.g., "16.99")
                // If NO dot AND > 100, it's likely cents (e.g., "1699")
                if (valStr.includes('.')) {
                    return cleanNum;
                } else if (cleanNum > 100) {
                    return cleanNum / 100;
                }
                return cleanNum;
            };

            try {
                console.log('🔄 Syncing product prices from WordPress...');
                const response = await fetch(restUrl);

                if (!response.ok) {
                    throw new Error(`WordPress connection failed (${response.status})`);
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Received non-JSON response from WordPress.');
                }

                const wpProducts = await response.json();

                if (Array.isArray(wpProducts)) {
                    let updatedCount = 0;

                    const updatedWines = localWines.map(localWine => {
                        const localNorm = normalize(localWine.name);
                        const localSlug = String(localWine.slug || '').toLowerCase();

                        // Match logic: Normalize name OR exact slug match
                        const wpMatch = wpProducts.find(p => {
                            const wpNorm = normalize(p.name);
                            const wpSlug = String(p.slug || '').toLowerCase();
                            return wpNorm === localNorm || wpSlug === localSlug;
                        });

                        if (wpMatch) {
                            const prices = wpMatch.prices || {};
                            const livePrice = parsePrice(prices.price);
                            const regPrice = parsePrice(prices.regular_price);
                            const slPrice = parsePrice(prices.sale_price);

                            // Check sale status based on price difference or explicit flag
                            const isOnSale = wpMatch.on_sale || (regPrice && slPrice && slPrice < regPrice);

                            updatedCount++;
                            return {
                                ...localWine,
                                price: livePrice || localWine.price,
                                regularPrice: regPrice,
                                salePrice: slPrice,
                                onSale: isOnSale
                            };
                        }

                        return localWine;
                    });

                    console.log(`✅ SYNC COMPLETE: Updated ${updatedCount} products.`);
                    setWines(updatedWines);
                    setError(null);
                }
            } catch (err) {
                console.warn('⚠️ WordPress Sync Issue:', err.message);
                // We don't set a blocking error here so the site can still use local data
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    const value = {
        wines,
        loading,
        error
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};
