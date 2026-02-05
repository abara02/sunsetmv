import React, { createContext, useState, useContext, useEffect } from 'react';
import { wines as localWines } from '../data/wines';

const ShopContext = createContext();

export const useShop = () => {
    return useContext(ShopContext);
};

const QUERY_PRODUCT_PRICES = `
  query GetProductPrices {
    products(first: 100) {
      nodes {
        slug
        name
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          onSale
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          onSale
        }
      }
    }
  }
`;

export const ShopProvider = ({ children }) => {
    const [wines, setWines] = useState(localWines);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            // Use relative path for proxy
            const restUrl = `/wp-json/wc/store/v1/products?per_page=100`;

            console.log('Fetching prices via Vite Proxy:', restUrl);

            try {
                const response = await fetch(restUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const wpProducts = await response.json();
                console.log('WooCommerce REST Response:', wpProducts);

                if (Array.isArray(wpProducts)) {
                    console.log(`Found ${wpProducts.length} products in WordPress.`);

                    const mergedWines = localWines.map(localWine => {
                        // Matching logic: Try slug first, then exact name, then normalized name
                        const wpProduct = wpProducts.find(p => {
                            const wpSlug = String(p.slug || '').toLowerCase();
                            const wpName = String(p.name || '').toLowerCase().trim();
                            const localSlug = String(localWine.slug || '').toLowerCase();
                            const localName = String(localWine.name || '').toLowerCase().trim();

                            return wpSlug === localSlug || wpName === localName;
                        });

                        if (wpProduct) {
                            // Smarter Price Parsing: Handles "26.99", "2699", or "$26.99"
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

                            const prices = wpProduct.prices || {};
                            const livePrice = parsePrice(prices.price);
                            const regPrice = parsePrice(prices.regular_price);
                            const slPrice = parsePrice(prices.sale_price);

                            console.log(`✅ SYNCED: ${localWine.name} -> WP Price: $${livePrice}`);

                            return {
                                ...localWine,
                                price: livePrice || localWine.price, // Fallback to local if parsed is NaN
                                regularPrice: regPrice,
                                salePrice: slPrice,
                                onSale: prices.regular_price !== prices.price
                            };
                        } else {
                            console.warn(`❌ MISSING IN WP: "${localWine.name}" (Slug: ${localWine.slug})`);
                        }

                        return localWine;
                    });

                    setWines(mergedWines);
                } else {
                    console.error('Error: WooCommerce API response is not an array.');
                }
            } catch (err) {
                console.error('🔴 REST API Error:', err);
                setError(err.message);
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
