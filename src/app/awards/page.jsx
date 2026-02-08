'use client';

import React from 'react';
import { generalAwards, wineAwards } from '../../data/awards';
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
                <section className="general-awards-section">
                    <h2 className="section-title">Winery Recognitions</h2>
                    <div className="recognition-list">
                        {generalAwards.map((award, index) => (
                            <div key={index} className="recognition-row">
                                <span className="rec-title">{award.title}</span>
                                <span className="rec-org">{award.organization}</span>
                                <span className="rec-year">{award.year}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="wine-awards-section">
                    <h2 className="section-title">Award-Winning Wines</h2>
                    <div className="wine-accordion-container">
                        {(() => {
                            const wineOrder = [
                                "Chardonnay",
                                "Cayuga White",
                                "Vidal Blanc",
                                "Riesling",
                                "Rosé",
                                "Sunset Blush",
                                "St. Croix",
                                "Merlot",
                                "Twisted Red",
                                "Root 63",
                                "Shades",
                                "Midnight Ice",
                                "New Dawn",
                                "Pyrrha’s Passion",
                                "Blustery Blend",
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
                                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                                    if (indexA !== -1) return -1;
                                    if (indexB !== -1) return 1;
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

    const manualCounts = {
        "Cayuga White": 12,
        "Chardonnay": 13,
        "Riesling": 3,
        "Vidal Blanc": 12,
        "Rosé": 4,
        "Blustery Blend": 16,
        "Sunset Blush": 5,
        "Enchanted Apple": 4,
        "St. Croix": 5,
        "New Dawn": 14,
        "Merlot": 4,
        "Twisted Red": 7,
        "Pyrrha’s Passion": 4
    };

    const count = manualCounts[wineName] || awards.length;

    return (
        <div className={`wine-accordion-item ${isOpen ? 'open' : ''}`}>
            <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="col-name">{wineName}</div>
                <div className="col-count">{count} {count === 1 ? 'AWARD' : 'AWARDS'}</div>
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
                            <div className="award-year">{award.year}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Awards;
