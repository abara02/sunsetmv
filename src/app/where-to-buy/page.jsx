'use client';

import React, { useState, useEffect } from 'react';
import stores from '../../data/stores';
import './WhereToBuy.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
const burgundyIcon = new L.DivIcon({
    className: 'custom-div-icon',
    html: `
        <div style='background-color:#53161d; width:24px; height:24px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); border:2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;'>
            <div style='background-color: white; width: 8px; height: 8px; border-radius: 50%;'></div>
        </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
});

// Component to handle map centering
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

const deg2rad = (deg) => deg * (Math.PI / 180);

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

const getZoomLevel = (radius) => {
    if (radius <= 10) return 12;
    if (radius <= 25) return 11;
    if (radius <= 50) return 10;
    if (radius <= 100) return 9;
    if (radius <= 200) return 8;
    return 2; // Global
};

export default function WhereToBuy() {
    const [searchZip, setSearchZip] = useState('');
    const [radius, setRadius] = useState(100);
    const [userLocation, setUserLocation] = useState({ lat: 41.6032, lng: -72.7000 });
    const [viewMode, setViewMode] = useState('list');
    const [isSearching, setIsSearching] = useState(false);

    const [filteredStores, setFilteredStores] = useState(() => {
        const center = { lat: 41.6032, lng: -72.7000 };
        return stores.map(store => {
            const distance = getDistance(center.lat, center.lng, store.lat, store.lng);
            return { ...store, distance };
        }).filter(store => store.distance <= 100)
            .sort((a, b) => a.distance - b.distance);
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchZip.trim()) return;
        setIsSearching(true);
        let center = userLocation;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=us&viewbox=-74.3,42.1,-71.7,40.9&bounded=0&q=${encodeURIComponent(searchZip)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                center = { lat, lng: lon };
                setUserLocation(center);
            } else {
                alert(`Could not find location: "${searchZip}".`);
                alert(`Could not find location: "${searchZip}". Returning to previous location.`);
                setIsSearching(false);
                return;
            }

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

    const [selectedStore, setSelectedStore] = useState(null);

    return (
        <div className="where-to-buy-page">
            <div className="wtb-header-section">
                <div className="container">
                    <h1 className="wtb-main-title">Where to Buy</h1>
                </div>
            </div>

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
                    </div>
                ) : (
                    <div className="map-container-wrapper">
                        <MapContainer
                            center={[userLocation.lat, userLocation.lng]}
                            zoom={getZoomLevel(radius)}
                            style={{ height: '600px', width: '100%', borderRadius: '12px' }}
                            scrollWheelZoom={true}
                        >
                            <ChangeView center={[userLocation.lat, userLocation.lng]} zoom={filteredStores.length > 0 ? getZoomLevel(radius) : 8} />
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {filteredStores.map(store => (
                                <Marker
                                    key={store.id}
                                    position={[store.lat, store.lng]}
                                    icon={burgundyIcon}
                                >
                                    <Popup>
                                        <div className="map-popup-content">
                                            <h3 className="popup-store-name">{store.name}</h3>
                                            <p className="popup-store-address">{store.address}</p>
                                            <p className="popup-store-location">{store.city}, {store.state} {store.zip}</p>
                                            {store.phone && <p className="popup-store-phone">{store.phone}</p>}
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address + ' ' + store.city + ' ' + store.state)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="popup-directions-btn"
                                            >
                                                Get Directions
                                            </a>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                )}
            </div>
        </div>
    );
}
