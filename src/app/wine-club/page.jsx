'use client';

import React from 'react';
import Link from 'next/link';
import './WineClub.css';

export default function WineClub() {
    return (
        <div className="page-container wine-club-page">
            {/* Hero Section */}
            <div className="wine-club-hero">
                <div className="overlay"></div>
                <div className="container hero-content">
                    <h1>Wine Club</h1>
                    <p>Join the Sunset Meadow Vineyards family and enjoy exclusive benefits, customizable shipments, and premium access.</p>
                </div>
            </div>

            <div className="container">
                {/* Intro Section */}
                <section className="club-intro text-center fade-in">
                    <span className="pre-heading">Become a Member</span>
                    <h2>Exclusive Perks & Benefits</h2>
                    <div className="divider"></div>
                    <p className="section-intro" style={{ textAlign: 'left', margin: '0 auto 2rem auto' }}>
                        Elevate your wine experience with our Gold and Platinum memberships. As a member, you'll receive hand-selected shipments, exclusive discounts, and priority access to our finest creations.
                    </p>

                    <div className="tasting-perk-banner">
                        <div className="tasting-perk-content">
                            <h3>Quarterly Tastings</h3>
                            <p>Members receive <strong>FREE QUARTERLY TASTINGS</strong> for themselves and one guest!</p>
                        </div>
                    </div>
                </section>

                {/* Memberships Grid */}
                <section className="memberships-section fade-in">
                    <div className="memberships-grid">

                        {/* Gold Membership Card */}
                        <div className="membership-card gold-tier">
                            <div className="card-header">
                                <h3>Gold Membership</h3>
                                <div className="shipment-subtitle">6 bottles/shipment</div>
                            </div>
                            <ul className="benefits-list">
                                <li>$120–163/shipment</li>
                                <li>$25 flat rate shipping</li>
                                <li>15% off all Sunset Meadows Vineyard wines</li>
                                <li>Fully customizable wine selections</li>
                                <li>Access to new wine releases</li>
                            </ul>
                        </div>

                        {/* Platinum Membership Card */}
                        <div className="membership-card platinum-tier featured">
                            {/* <div className="popular-tag">Most Popular</div> */}
                            <div className="card-header">
                                <h3>Platinum Membership</h3>
                                <div className="shipment-subtitle">12 bottles/shipment</div>
                            </div>
                            <ul className="benefits-list">
                                <li>$239–325/shipment</li>
                                <li>$25 flat rate shipping</li>
                                <li>15% off all Sunset Meadows Vineyard wines</li>
                                <li>Fully customizable wine selections</li>
                                <li>First access to new wine releases</li>
                                <li>Exclusive access to reserve & limited release wines</li>
                                <li>Priority access to events at SMV</li>
                            </ul>
                        </div>

                    </div>
                </section>

                {/* FAQ / Additional Info (Optional for Future) */}
                <section className="club-footer-info text-center fade-in">
                    <p className="text-muted">Membership requires a minimum commitment of two shipments. Terms and conditions apply.</p>
                    <Link href="/contact" className="btn btn-outline" style={{ marginTop: '1rem' }}>Contact Us for Details</Link>
                </section>

            </div>
        </div>
    );
}
