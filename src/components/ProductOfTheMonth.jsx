'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const QUERY_PRODUCT_OF_MONTH = `
  query GetProductOfTheMonth {
    productOfTheMonths(first: 1) {
      nodes {
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        productOfTheMonthFields {
          productLink
        }
      }
    }
  }
`;

export default function ProductOfTheMonth() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: QUERY_PRODUCT_OF_MONTH })
                });

                const result = await response.json();

                if (result.errors) {
                    console.error('GraphQL Errors checking Product of the Month:', result.errors);
                    throw new Error('GraphQL error');
                }

                const nodes = result?.data?.productOfTheMonths?.nodes;
                if (nodes && nodes.length > 0) {
                    const data = nodes[0];
                    setProduct({
                        title: data.title,
                        description: data.content?.replace(/<[^>]+>/g, '') || '', // Strip HTML tags
                        image: data.featuredImage?.node?.sourceUrl || null,
                        altText: data.featuredImage?.node?.altText || data.title,
                        link: data.productOfTheMonthFields?.productLink || '/shop'
                    });
                } else {
                    // No product found in WP
                    setProduct(null);
                }
            } catch (err) {
                console.warn('Failed to fetch Product of the Month from WP. Using fallback.', err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
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

    // Use fetched data if available, otherwise use the hardcoded fallback
    const displayData = product || {
        title: "Twisted Red",
        description: "An exquisitely balanced Bordeaux style wine. This Cabernet blend will tantalize your taste buds with hints of spice, blackberry, black cherry, plum and vanilla.",
        image: "/wines/twisted-red.png",
        altText: "Twisted Red",
        link: "/shop/twisted-red"
    };

    return (
        <section className="section product-spotlight fade-in">
            <div className="spotlight-card">
                <div className="spotlight-text-content">
                    <div className="section-header center-header">
                        <span className="pre-heading" style={{ color: 'var(--color-primary)' }}>Featured</span>
                        <h3>Product of the Month</h3>
                    </div>
                    <div className="spotlight-header">
                        <h4>{displayData.title}</h4>
                    </div>
                    <div className="spotlight-info">
                        <p>{displayData.description}</p>
                        <Link href={displayData.link} className="btn btn-primary-inverted">Shop Now</Link>
                    </div>
                </div>
                <div className="spotlight-image">
                    <img src={displayData.image} alt={displayData.altText} />
                </div>
            </div>
        </section>
    );
}
