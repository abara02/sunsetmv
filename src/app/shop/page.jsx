'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';
import WineCard from '../../components/WineCard';
import { useShop } from '../../context/ShopContext';
import './Shop.css';

function ShopContent() {
    const { wines, loading } = useShop();
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const searchParams = useSearchParams();

    // Map URL category params to Filter names
    useEffect(() => {
        const category = searchParams.get('category');

        if (category) {
            switch (category.toLowerCase()) {
                case 'white':
                    setFilter('White');
                    break;
                case 'fruit':
                    setFilter('Fruit');
                    break;
                case 'rose':
                    setFilter('Rosé');
                    break;
                case 'red':
                    setFilter('Red');
                    break;
                case 'reserve':
                    setFilter('Reserve');
                    break;
                case 'sparkling':
                    setFilter('Sparkling');
                    break;
                case 'more':
                    setFilter('More');
                    break;
                default:
                    setFilter('All');
            }
        } else {
            setFilter('All');
        }
    }, [searchParams]);

    // Filter logic
    const filteredWines = wines.filter(wine => {
        const matchesCategory = filter === 'All' || wine.type === filter;
        const matchesSearch = wine.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Get unique types for filter buttons (ensure ordered as requested)
    const filterTypes = ['All', 'White', 'Fruit', 'Rosé', 'Red', 'Reserve', 'Sparkling', 'More'];

    return (
        <div className="page-container">
            <div className="shop-header">
                <div className="container">
                    <h1>The Wine Shop</h1>
                    <p>Handcrafted with passion in the Litchfield Hills.</p>
                    <p className="shop-subtitle">No added sugars, sulfites, or preservatives.</p>
                </div>
            </div>

            <div className="container shop-content">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <>
                        {/* Shop Controls: Search & Filter Toggle */}
                        <div className="shop-controls">
                            <div className="search-wrapper">
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <button
                                className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={20} />
                                <span>Filters</span>
                            </button>
                        </div>

                        {/* Collapsible Filter Section */}
                        <div className={`filters-container ${showFilters ? 'open' : ''}`}>
                            <div className="filters">
                                {filterTypes.map(type => (
                                    <button
                                        key={type}
                                        className={`filter-btn ${filter === type ? 'active' : ''}`}
                                        onClick={() => setFilter(type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="wine-grid">
                            {filteredWines.length > 0 ? (
                                filteredWines.map(wine => (
                                    <Link href={`/shop/${wine.slug}`} key={wine.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <WineCard
                                            id={wine.id}
                                            slug={wine.slug}
                                            name={wine.name}
                                            type={wine.type}
                                            price={wine.price}
                                            regularPrice={wine.regularPrice}
                                            salePrice={wine.salePrice}
                                            onSale={wine.onSale}
                                            image={wine.image}
                                            isFanFavorite={wine.isFanFavorite}
                                        />
                                    </Link>
                                ))
                            ) : (
                                <div className="no-results">
                                    <p>No wines found matching your criteria.</p>
                                    <button onClick={() => { setFilter('All'); setSearchQuery(''); }} className="btn-text">Clear Search</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
