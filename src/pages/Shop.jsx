import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WineCard from '../components/WineCard';
import { wines } from '../data/wines';
import './Shop.css';

const Shop = () => {
    const [filter, setFilter] = useState('All');
    const location = useLocation();

    // Map URL category params to Filter names
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
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
                default:
                    setFilter('All');
            }
        } else {
            // If no category param, maybe keep current or default to All? 
            // Usually if I click "Shop" I might want to see All or keep my state. 
            // Navbar "Shop" link goes to `/shop` which has no param.
            // If I navigate from Fruit to Shop (main), I probably expect All.
            setFilter('All');
        }
    }, [location.search]);

    // Filter logic
    const filteredWines = filter === 'All'
        ? wines
        : wines.filter(wine => wine.type === filter);

    // Get unique types for filter buttons (ensure ordered as requested)
    const filterTypes = ['All', 'White', 'Fruit', 'Rosé', 'Red', 'Reserve', 'Sparkling'];

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
                <div className="filters">
                    {filterTypes.map(type => (
                        <button
                            key={type}
                            className={`filter-btn ${filter === type ? 'active' : ''}`}
                            onClick={() => setFilter(type)} // Keeps manual clicking working
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="wine-grid">
                    {filteredWines.map(wine => (
                        <Link to={`/shop/${wine.slug}`} key={wine.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <WineCard
                                name={wine.name}
                                type={wine.type}
                                price={wine.price}
                                image={wine.image}
                                isFanFavorite={wine.isFanFavorite}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
