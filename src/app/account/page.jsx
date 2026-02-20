'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import './Account.css';

export default function AccountPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("This is a demo. Login functionality is not yet available.");
    };

    return (
        <div className="account-page">
            <div className="container">
                <div className="account-auth-container">
                    <div className="auth-header">
                        <div className="auth-icon-circle">
                            <User size={32} color="white" />
                        </div>
                        <h1>Welcome Back</h1>
                        <p>Sign in to your Sunset Meadow Vineyards account</p>
                    </div>

                    <div className="auth-demo-badge">
                        DEMO MODE
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-options">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember me
                            </label>
                            <button type="button" className="forgot-password">Forgot Password?</button>
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            Sign In <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Don't have an account? <button className="text-btn">Create Account</button></p>
                    </div>

                    <div className="demo-notice">
                        <p>Note: Checkout and Account systems are currently under development. No real data will be processed.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
