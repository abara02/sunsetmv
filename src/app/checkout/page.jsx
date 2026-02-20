'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';

export default function CheckoutDemo() {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f9f9f9'
        }}>
            <Construction size={64} color="#53161d" style={{ marginBottom: '2rem' }} />
            <h1 style={{
                color: '#53161d',
                fontSize: '2.5rem',
                marginBottom: '1rem',
                fontFamily: 'serif'
            }}>
                Checkout
            </h1>
            <p style={{
                fontSize: '1.25rem',
                color: '#666',
                maxWidth: '600px',
                lineHeight: '1.6',
                marginBottom: '2rem'
            }}>
                This is a demo. Checkout is not yet available.
            </p>
            <Link href="/shop" style={{
                backgroundColor: '#53161d',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <ArrowLeft size={18} /> Return to Shop
            </Link>
        </div>
    );
}
