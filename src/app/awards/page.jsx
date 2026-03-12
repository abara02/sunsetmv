'use client';

import React from 'react';
import { generalAwards, wineAwards } from '../../data/awards';
import { Trophy, Medal, Award, Star, Wine } from 'lucide-react';
import PageHero from '../../components/PageHero';
import './Awards.css';

const Awards = () => {


    return (
        <div className="awards-page">
            <PageHero
                title={<>AWARDS <br className="mobile-break" />& <br className="mobile-break" />ACCOLADES</>}
                backgroundImage="/test2.png"
                logoSrc="/LOGO SMV (1).png"
            />
            <div className="awards-container">
                {/* General Awards */}
                <section className="general-awards-section">
                    <h2 className="section-title">Winery Recognitions</h2>
                    <div className="recognition-list">
                        {generalAwards.map((award, index) => (
                            <div key={index} className="recognition-row">
                                <span className="rec-title">{award.title}</span>
                                <span className="rec-org">{award.organization}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Wine Awards Accordion */}
                <section className="wine-awards-section">
                    <h2 className="section-title">Award-Winning Wines</h2>
                    <div className="wine-accordion-container">
                        {(() => {
                            const wineOrder = [
                                "Chardonnay",
                                "Cayuga",
                                "Vidal",
                                "Root 63 White",
                                "Country Porch Peach",
                                "Rosé",
                                "Sunset Blush",
                                "Twisted Red",
                                "Merlot",
                                "Root 63 Red",
                                "Shades",
                                "Pyrrha’s Passion",
                                "Enchanted Apple"
                            ];

                            const groupedAwards = wineAwards.reduce((acc, award) => {
                                if (!acc[award.wine]) acc[award.wine] = [];
                                acc[award.wine].push(award);
                                return acc;
                            }, {});

                            return Object.entries(groupedAwards)
                                .sort(([a], [b]) => {
                                    const indexA = wineOrder.indexOf(a);
                                    const indexB = wineOrder.indexOf(b);
                                    // If both are in the list, sort by index
                                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                                    // If only A is in list, comes first
                                    if (indexA !== -1) return -1;
                                    // If only B is in list, comes first
                                    if (indexB !== -1) return 1;
                                    // Otherwise sort alphabetically
                                    return a.localeCompare(b);
                                })
                                .map(([wineName, awards], index) => (
                                    <WineAccordionItem key={index} wineName={wineName} awards={awards} />
                                ));
                        })()}
                    </div>
                </section>
            </div>
        </div>
    );
};

const WineAccordionItem = ({ wineName, awards }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`wine-accordion-item ${isOpen ? 'open' : ''}`}>
            <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="col-name">{wineName}</div>
                <div className="col-toggle">
                    VIEW AWARDS {isOpen ? '-' : '+'}
                </div>
            </div>
            {isOpen && (
                <div className="accordion-content">
                    {awards.map((award, idx) => (
                        <div key={idx} className="accordion-award-row">
                            <div className="award-detail-main">
                                <span className="award-title">{award.award}</span>
                                <span className="award-comp">{award.competition}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Awards;
