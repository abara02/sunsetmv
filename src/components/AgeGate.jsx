'use client';
import React, { useState, useEffect } from 'react';
import './AgeGate.css';

const AgeGate = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Check localStorage on mount
    useEffect(() => {
        const isVerified = localStorage.getItem('ageVerified');
        if (!isVerified) {
            // Small delay to ensure smooth rendering
            const timer = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleVerify = () => {
        localStorage.setItem('ageVerified', 'true');
        setIsVisible(false);
    };

    const handleExit = () => {
        // Redirect to Google or another safe site
        window.location.href = 'https://www.google.com';
    };

    if (!isVisible) return null;

    return (
        <div className="age-gate-overlay">
            <div className="age-gate-modal">
                <div className="age-gate-content">
                    <h2>Are you 21 or older?</h2>
                    <p>
                        It is required by law that you be 21 years of age or older to purchase wine from this website.
                    </p>
                    <div className="age-gate-buttons">
                        <button className="age-gate-btn verify" onClick={handleVerify}>Yes, I’m 21 or older</button>
                        <button className="age-gate-btn exit" onClick={handleExit}>No, take me back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgeGate;
