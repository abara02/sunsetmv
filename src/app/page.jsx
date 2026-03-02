'use client';

import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Link from 'next/link';
const familyPhoto = '/family-photo.jpg';
import './Home.css';

const QUERY_PRODUCT_OF_THE_MONTH = `
  query GetProductOfTheMonth {
    productOfTheMonths(first: 1) {
      nodes {
        title
        productMonthDetails {
          wineName
          description
          image {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export default function Home() {
    const [productOfMonth, setProductOfMonth] = useState(null);
    const [loadingSpotlight, setLoadingSpotlight] = useState(true);

    useEffect(() => {
        const fetchProductOfMonth = async () => {
            try {
                const response = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: QUERY_PRODUCT_OF_THE_MONTH })
                });

                const { data, errors } = await response.json();

                if (errors) {
                    throw new Error('GraphQL Errors found');
                }

                if (data?.productOfTheMonths?.nodes?.length > 0) {
                    const node = data.productOfTheMonths.nodes[0];
                    const details = node.productMonthDetails || {};

                    // Use the dedicated wineName field, fallback to post title if empty
                    const displayName = details.wineName || node.title;

                    // Auto-generate the slug from the wine name (e.g., "Twisted Red" -> "twisted-red")
                    const computedSlug = displayName
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');

                    setProductOfMonth({
                        title: displayName,
                        description: details.description,
                        // This links directly to the SunsetMV Next.js shop, NOT WordPress
                        shopLink: computedSlug ? `/shop/${computedSlug}` : '/shop',
                        imageUrl: details.image?.node?.sourceUrl
                    });
                }
            } catch (err) {
                console.error('Error fetching Product of the Month:', err);
            } finally {
                setLoadingSpotlight(false);
            }
        };

        fetchProductOfMonth();
    }, []);

    // Fallback content until WordPress is set up and returns data
    const fallbackProduct = {
        title: 'Twisted Red',
        description: 'An exquisitely balanced Bordeaux style wine. This Cabernet blend will tantalize your taste buds with hints of spice, blackberry, black cherry, plum and vanilla.',
        shopLink: '/shop/twisted-red',
        imageUrl: '/wines/twisted-red.png'
    };

    const displayProduct = productOfMonth || fallbackProduct;

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
                {loadingSpotlight ? (
                    <div className="spotlight-loading text-center" style={{ padding: '4rem', color: 'white' }}>
                        Loading Feature...
                    </div>
                ) : (
                    <div className="spotlight-card fade-in">
                        <div className="spotlight-text-content">
                            <div className="section-header center-header">
                                <h3>Product of the Month</h3>
                            </div>
                            <div className="spotlight-header">
                                <h4>{displayProduct.title}</h4>
                            </div>
                            <div className="spotlight-info">
                                <p>{displayProduct.description}</p>
                                <Link href={displayProduct.shopLink} className="btn btn-primary-inverted">Shop Now</Link>
                            </div>
                        </div>
                        <div className="spotlight-image">
                            {displayProduct.imageUrl && (
                                <img src={displayProduct.imageUrl} alt={displayProduct.title} />
                            )}
                        </div>
                    </div>
                )}
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

