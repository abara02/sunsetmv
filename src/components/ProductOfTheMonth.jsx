'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const QUERY_POM = `
  query GetProductOfTheMonth {
    productsOfTheMonth(first: 1) {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        productFeatures {
          wineName
          description
          shopLink
        }
      }
    }
  }
`;

export default function ProductOfTheMonth() {
    const [pomData, setPomData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPom = async () => {
            try {
                const response = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: QUERY_POM })
                });

                const result = await response.json();

                if (result.errors) {
                    console.warn('Handling WP Product of the Month GraphQL errors (CPT/ACF likely not configured yet):', result.errors);
                    setPomData(null); // Force fallback
                    return;
                }

                const nodes = result?.data?.productsOfTheMonth?.nodes;

                if (nodes && nodes.length > 0) {
                    const node = nodes[0];
                    setPomData({
                        title: node.productFeatures?.wineName || node.title,
                        description: node.productFeatures?.description || '',
                        shopLink: node.productFeatures?.shopLink || '/shop',
                        imageUrl: node.featuredImage?.node?.sourceUrl || null
                    });
                } else {
                    setPomData(null); // No data found, use fallback
                }
            } catch (err) {
                console.error('Error fetching Product of the Month, using fallback:', err);
                setPomData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPom();
    }, []);

    if (loading) {
        return (
            <section className="section product-spotlight">
                <div className="spotlight-card" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="loading-spinner"></div>
                </div>
            </section>
        );
    }

    // Fallback static content if WordPress isn't returning the expected shape yet
    if (!pomData || !pomData.title || !pomData.description) {
        return (
            <section className="section product-spotlight">
                <div className="spotlight-card">
                    <div className="spotlight-text-content">
                        <div className="section-header center-header">
                            <h3>Product of the Month</h3>
                        </div>
                        <div className="spotlight-header">
                            <h4>Shades</h4>
                        </div>
                        <div className="spotlight-info">
                            <p>A fruity, pomegranate hued, sparkling wine. Bursting with flavors of bright raspberry and pomegranate with just a hint of effervescence.</p>
                            <Link href="/shop" className="btn btn-primary-inverted">Shop Now</Link>
                        </div>
                    </div>
                    <div className="spotlight-image">
                        <img src="/wines/shades.png" alt="Shades" />
                    </div>
                </div>
            </section>
        );
    }

    // Render dynamic WP content
    return (
        <section className="section product-spotlight fade-in">
            <div className="spotlight-card">
                <div className="spotlight-text-content">
                    <div className="section-header center-header">
                        <h3>Product of the Month</h3>
                    </div>
                    <div className="spotlight-header">
                        <h4>{pomData.title}</h4>
                    </div>
                    <div className="spotlight-info">
                        <p>{pomData.description}</p>
                        <Link href={pomData.shopLink} className="btn btn-primary-inverted">Shop Now</Link>
                    </div>
                </div>
                <div className="spotlight-image">
                    {pomData.imageUrl && (
                        <img src={pomData.imageUrl} alt={pomData.title} />
                    )}
                </div>
            </div>
        </section>
    );
}
