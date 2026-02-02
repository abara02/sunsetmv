import React, { useState, useEffect } from 'react';
import stores from '../data/stores';
import './WhereToBuy.css';

// Helper functions (defined outside component for safety)
const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const WhereToBuy = () => {
    const [searchZip, setSearchZip] = useState('');
    const [radius, setRadius] = useState(200);
    // Default to approximately center of CT
    const [userLocation, setUserLocation] = useState({ lat: 41.6032, lng: -72.7000 });
    const [viewMode, setViewMode] = useState('list');
    const [isSearching, setIsSearching] = useState(false);

    // Initialize filteredStores WITH calculated distances to avoid render crash
    const [filteredStores, setFilteredStores] = useState(() => {
        const center = { lat: 41.6032, lng: -72.7000 };
        return stores.map(store => {
            const distance = getDistance(center.lat, center.lng, store.lat, store.lng);
            return { ...store, distance };
        }).sort((a, b) => a.distance - b.distance);
    });

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchZip.trim()) return;

        setIsSearching(true);
        let center = userLocation;

        try {
            // Use OpenStreetMap Nominatim API for free geocoding
            // Restricted to US, with a bias towards the Northeast (CT/NY/MA area) to prioritize local towns like "Canaan"
            // viewbox format: left,top,right,bottom (West, North, East, South) -> actually Nominatim expects min_lon,max_lat,max_lon,min_lat or x1,y1,x2,y2
            // CT region approx: -74.3, 42.1, -71.7, 40.9
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=us&viewbox=-74.3,42.1,-71.7,40.9&bounded=0&q=${encodeURIComponent(searchZip)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                // Take the first result
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                center = { lat, lng: lon };
                setUserLocation(center);
            } else {
                alert(`Could not find location: "${searchZip}". Returning to previous location.`);
                setIsSearching(false);
                return;
            }

            // Filter and sort based on new real coordinates
            const results = stores.map(store => {
                const distance = getDistance(center.lat, center.lng, store.lat, store.lng);
                return { ...store, distance };
            }).filter(store => store.distance <= radius)
                .sort((a, b) => a.distance - b.distance);

            setFilteredStores(results);

        } catch (error) {
            console.error("Geocoding error:", error);
            alert("Error searching for location. Please try again.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="where-to-buy-page">
            <div className="wtb-search-container">
                <div className="container">
                    <form className="search-form" onSubmit={handleSearch}>
                        <div className="search-group">
                            <label htmlFor="zip">Your location</label>
                            <input
                                type="text"
                                id="zip"
                                className="search-input"
                                placeholder="Zip Code or City"
                                value={searchZip}
                                onChange={(e) => setSearchZip(e.target.value)}
                                disabled={isSearching}
                            />
                        </div>
                        <div className="search-group">
                            <label htmlFor="radius">Search radius</label>
                            <select
                                id="radius"
                                className="search-select"
                                value={radius}
                                onChange={(e) => setRadius(Number(e.target.value))}
                                disabled={isSearching}
                            >
                                <option value="10">10 mi</option>
                                <option value="25">25 mi</option>
                                <option value="50">50 mi</option>
                                <option value="100">100 mi</option>
                                <option value="200">200 mi</option>
                                <option value="5000">Global</option>
                            </select>
                        </div>
                        <div className="search-group">
                            <label>&nbsp;</label>
                            <button type="submit" className="search-btn" disabled={isSearching}>
                                {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container wtb-simple-content">
                <div className="wtb-list-header">
                    <h2>Store Locations</h2>

                    {/* View Toggle */}
                    <div className="view-toggle-container">
                        <div className="view-toggle">
                            <button
                                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                List
                            </button>
                            <button
                                className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
                                onClick={() => setViewMode('map')}
                            >
                                Map
                            </button>
                        </div>
                    </div>

                    <div className="wtb-results-count">{filteredStores.length} stores found near you</div>
                    {userLocation.lat !== 41.6032 && (
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                            Distances calculated from your search location.
                        </p>
                    )}
                </div>

                {viewMode === 'list' ? (
                    <div className="store-grid">
                        {filteredStores.map(store => (
                            <div key={store.id} className="store-card-simple">
                                <div className="store-card-header">
                                    <h3 className="store-name">{store.name}</h3>
                                    <span className="store-badge">{store.city}</span>
                                </div>
                                <div className="store-body">
                                    <p className="store-address">
                                        {store.address}<br />
                                        {store.city}, {store.state} {store.zip}
                                    </p>
                                    {store.phone && <p className="store-phone">{store.phone}</p>}
                                </div>
                                <div className="store-footer">
                                    <span className="store-distance">
                                        {store.distance !== undefined ? store.distance.toFixed(1) : 'N/A'} miles away
                                    </span>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address + ' ' + store.city + ' ' + store.state)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="store-directions-btn"
                                    >
                                        Get Directions &rarr;
                                    </a>
                                </div>
                            </div>
                        ))}

                        {filteredStores.length === 0 && (
                            <div className="no-results">
                                <p>No stores found within this radius. Please try a different zip code or town, or increase the search distance.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="map-placeholder-view realistic-map">
                        {/* Realistic Demo Pins from actual stores data */}
                        <div className="map-pins-overlay">
                            {stores.slice(0, 35).map(store => {
                                // Simple mapping formula for CT/Northeast region
                                // Based on approximate bounds of the generated realistic map image
                                const West = -74.5;
                                const East = -70.5;
                                const North = 42.8;
                                const South = 40.2;

                                const left = ((store.lng - West) / (East - West)) * 100;
                                const top = ((North - store.lat) / (North - South)) * 100;

                                return (
                                    <div
                                        key={store.id}
                                        className="map-pin teardrop"
                                        style={{ top: `${top}%`, left: `${left}%` }}
                                    >
                                        <div className="pin-marker-teardrop"></div>
                                        <div className="pin-tooltip">{store.name}</div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="map-demo-label">
                            <h3 className="placeholder-title">Interactive Map Demo</h3>
                            <p className="placeholder-subtitle">Using actual store locations across the region.</p>
                            <button
                                className="placeholder-btn"
                                onClick={() => setViewMode('list')}
                            >
                                Return to List
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhereToBuy;
