import React from 'react';
import './PageHero.css';

const PageHero = ({ title, subtitle, backgroundImage, logoSrc }) => {
    const style = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

    return (
        <div className="page-hero" style={style}>
            <div className="page-hero-overlay"></div>
            <div className="page-hero-content">
                <h1>{title}</h1>
                {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
            </div>
            {logoSrc && (
                <div className="page-hero-logo-wrapper">
                    <div className="page-hero-logo-cutout">
                        <img src={logoSrc} alt="Logo" className="page-hero-logo" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageHero;
