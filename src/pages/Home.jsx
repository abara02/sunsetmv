import React from 'react';
import Hero from '../components/Hero';
import WineCard from '../components/WineCard';
import { ArrowRight } from 'lucide-react';
import familyPhoto from '../assets/family-photo.jpg';
import winemakerPhoto from '../assets/winemaker-photo.jpg';
import './Home.css';

const Home = () => {
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
                        <a href="/shop" className="btn btn-primary-inverted">Visit</a>
                    </div>
                </div>
                <div className="split-panel tasting-room-panel" style={{ backgroundImage: "url('/tasting-room-new.jpg')" }}>
                    <div className="split-overlay"></div>
                    <div className="split-content">
                        <h2>The Tasting Room</h2>
                        <a href="/visit" className="btn btn-primary-inverted">More Info</a>
                    </div>
                </div>
            </section>

            {/* Product of the Month */}
            <section className="section product-spotlight">
                <div className="container">
                    <div className="section-header center-header">
                        <h3>Product of the Month</h3>
                    </div>
                    <div className="spotlight-card">
                        <div className="spotlight-header">
                            <h4>Twisted Red</h4>
                        </div>
                        <div className="spotlight-image">
                            <img src="/wines/twisted-red.png" alt="Twisted Red" />
                        </div>
                        <div className="spotlight-info">
                            <p>An exquisitely balanced Bordeaux style wine. This Cabernet blend will tantalize your taste buds with hints of spice, blackberry, black cherry, plum and vanilla.</p>
                            <a href="/shop/twisted-red" className="btn btn-primary">Shop Now</a>
                        </div>
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
                                    <a href="/about" className="btn btn-primary">Our Story</a>
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
                            <a href="/awards" className="btn btn-outline-custom">View All Awards</a>
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
};

export default Home;
