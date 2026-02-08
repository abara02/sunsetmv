'use client';

import React, { useEffect } from 'react';
import './About.css';
const familyPhoto = '/family-photo.jpg';
const winemakerPhoto = '/winemaker-photo.jpg';

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page">
            <div className="container">
                {/* History Section */}
                <section className="history-section fade-in">
                    <h1 className="section-title">Our Story</h1>
                    <div className="history-content">
                        <p>
                            Sunset Meadow Vineyards began its journey as Sunset Meadow Farms, where the Motel family worked the land raising cattle and harvesting hay. As their connection to the land deepened, so did their vision—and in 2001, that vision took root with the first vineyard plantings and the start of wine production.
                        </p>
                        <p>
                            By May of 2008, we opened our tasting room, welcoming guests to experience our estate grown wines and the beauty of the Litchfield Hills firsthand.
                        </p>
                        <p>
                            Today, Sunset Meadow Vineyards spans 170 acres and is proud to be the largest vineyard in Connecticut, growing 15 different varietals. We remain family owned and operated, with every bottle reflecting our dedication to quality, craftsmanship, and sustainability.
                        </p>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="quote-section fade-in delay-1">
                    <div className="quote-grid">
                        <div className="quote-image-wrapper">
                            <img src={familyPhoto} alt="The Motel Family" className="quote-image" />
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
                </section>

                {/* Winemaker Section */}
                <section className="winemaker-section fade-in delay-2">
                    <h2 className="section-title">Meet the Winemaker</h2>
                    <div className="winemaker-grid">
                        <div className="winemaker-content">
                            <p>
                                Our winemaking is led by UC Davis–certified winemaker George Motel, who oversees all production and has crafted more than 25 unique wines, each designed to showcase the character of our estate and the land we love.
                            </p>
                        </div>
                        <div className="winemaker-image-wrapper">
                            <img src={winemakerPhoto} alt="George Motel, Winemaker" className="winemaker-image" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
