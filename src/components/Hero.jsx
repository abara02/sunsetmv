'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Hero.css';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        const timer = requestAnimationFrame(() => {
            setIsVisible(true);
        });
        return () => cancelAnimationFrame(timer);
    }, []);

    return (
        <section className="hero">
            <div className={`hero-background ${isVisible ? 'is-visible' : ''}`}>
                <div className="overlay"></div>
            </div>
            <div className="hero-content container">
                <h1><span className="highlight">SUNSET MEADOW VINEYARDS</span></h1>
                {/* <p className="subtitle">Award-winning wines crafted with passion in the heart of the Litchfield Hills.</p> */}
                <div className="hero-buttons">
                    <Link href="/visit" className="btn btn-primary">Plan Your Visit</Link>
                    <Link href="/shop" className="btn btn-outline-white">Shop Wines</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
