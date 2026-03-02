'use client';

import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Link from 'next/link';
import { wines } from '../data/wines';
const familyPhoto = '/family-photo.jpg';
import './Home.css';

const QUERY_POTM = `
  query GetPOTM {
    updatePotm {
      winename
      winedescription
    }
  }
`;

export default function Home() {
    const [potmData, setPotmData] = useState({
        name: 'Twisted Red',
        description: 'An exquisitely balanced Bordeaux style wine. This Cabernet blend will tantalize your taste buds with hints of spice, blackberry, black cherry, plum and vanilla.',
        image: '/wines/twisted-red.png',
        slug: 'twisted-red'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPOTM = async () => {
            try {
                const response = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: QUERY_POTM })
                });
                const result = await response.json();
                console.log('DEBUG: POTM GraphQL Response:', JSON.stringify(result, null, 2));

                const { data } = result;
                if (data && (data.updatePotm || data.updatePotms)) {
                    const potm = data.updatePotm || (data.updatePotms?.nodes ? data.updatePotms.nodes[0] : null);
                    if (!potm) {
                        console.warn('DEBUG: No POTM data found in response matching keys.');
                        return;
                    }

                    const { winename, winedescription } = potm;
                    console.log('DEBUG: Found POTM fields:', { winename, winedescription });

                    // Match with local wine data for image and slug
                    const matchedWine = wines.find(w =>
                        w.name.toLowerCase().trim() === winename.toLowerCase().trim()
                    );

                    if (matchedWine) {
                        setPotmData({
                            name: matchedWine.name,
                            description: winedescription || matchedWine.description,
                            image: matchedWine.image,
                            slug: matchedWine.slug
                        });
                    } else {
                        // If name doesn't match a wine, strictly use the text but keep default image/slug
                        // (or fallback to Twisted Red if safer)
                        setPotmData(prev => ({
                            ...prev,
                            name: winename,
                            description: winedescription || prev.description
                        }));
                    }
                }
            } catch (err) {
                console.error('Error fetching Product of the Month:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPOTM();
    }, []);

    return (
        <div className="home-page">
            <Hero />

            {/* Welcome Section */}
            <section className="welcome-section">
                <div className="section-decor welcome-decor-center"></div>
                <div className="container center-text">
                    <span className="welcome-intro">Welcome To</span>
                    <h2 className="welcome-title">SUNSET MEADOW VINEYARDS</h2>
                    <span className="welcome-location">- Goshen, CT -</span>
                </div>
            </section>

            {/* Split Banner Section */}
            <section className="split-banner-section">
                <div className="split-panel wine-shop-panel" style={{ backgroundImage: "url('/wine-shop-new.jpg')" }}>
                    <div className="split-overlay"></div>
                    <div className="split-content">
                        <h2>The Wine Shop</h2>
                        <Link href="/shop" className="btn btn-primary-inverted">Visit</Link>
                    </div>
                </div>
                <div className="split-panel tasting-room-panel" style={{ backgroundImage: "url('/tasting-room-new.jpg')" }}>
                    <div className="split-overlay"></div>
                    <div className="split-content">
                        <h2>The Tasting Room</h2>
                        <Link href="/visit" className="btn btn-primary-inverted">More Info</Link>
                    </div>
                </div>
            </section>

            {/* Product of the Month */}
            <section className="section product-spotlight">
                <div className="spotlight-card">
                    <div className="spotlight-text-content">
                        <div className="section-header center-header">
                            <h3>Product of the Month</h3>
                        </div>
                        <div className="spotlight-header">
                            <h4>{potmData.name}</h4>
                        </div>
                        <div className="spotlight-info">
                            <p>{potmData.description}</p>
                            <Link href={`/shop/${potmData.slug}`} className="btn btn-primary-inverted">Shop Now</Link>
                        </div>
                    </div>
                    <div className="spotlight-image">
                        <img src={potmData.image} alt={potmData.name} />
                    </div>
                </div>
            </section>

            {/* Our Story & History */}
            <section className="section text-center story-section teaser-section">
                <div className="container">
                    {/* Quote Section */}
                    <div className="quote-section fade-in delay-1">
                        <div className="quote-grid home-quote-grid">
                            <div className="quote-image-column">
                                <div className="quote-image-wrapper">
                                    <img src={familyPhoto} alt="The Motel Family" className="quote-image" />
                                </div>
                                <div className="quote-button-wrapper">
                                    <Link href="/about" className="btn btn-primary">Our Story</Link>
                                </div>
                            </div>
                            <div className="quote-content text-left">
                                <blockquote>
                                    "Our goal at Sunset Meadow Vineyards is to provide our patrons with high quality, estate grown wines that reflect the character and charm of the Litchfield Hills.
                                    <br /><br />
                                    Stop by our vineyards in Goshen, Connecticut, to experience a great selection of award-winning wines in an inviting atmosphere that truly is the essence of Sunset Meadow Vineyards."
                                </blockquote>
                                <cite>— The Motel Family</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards Teaser */}
            <section className="section awards-teaser">
                <div className="container">
                    <div className="awards-teaser-content">
                        <div className="awards-text-col">
                            <h3>Award-Winning Excellence</h3>
                            <p className="clean-text">
                                Sunset Meadow Vineyards has been named one of the 101 Best Wineries in America by the Daily Meal.
                            </p>
                            <Link href="/awards" className="btn btn-outline-custom">View All Awards</Link>
                        </div>
                        <div className="awards-image-col">
                            <img
                                src="/daily-meal-award.jpg"
                                alt="Top 101 Winery in America"
                                className="awards-teaser-img"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

