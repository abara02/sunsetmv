'use client';

import React, { useEffect } from 'react';
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

export default function MapComponent({ userLocation, radius, filteredStores, getZoomLevel }) {
    return (
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
    );
}
