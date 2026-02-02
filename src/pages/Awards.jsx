import React from 'react';
import { generalAwards, wineAwards } from '../data/awards';
import { Trophy } from 'lucide-react';
import './Awards.css';

const Awards = () => {
    return (
        <div className="awards-page">
            <div className="awards-container">
                {/* General Awards */}
                <section className="general-awards-section">
                    <h2 className="section-title">Winery Recognitions</h2>
                    <div className="general-awards-list">
                        {generalAwards.map((award, index) => (
                            <div key={index} className="general-award-row">
                                <div className="general-award-title-col">{award.title}</div>
                                <div className="general-award-org-col">{award.organization} {award.year}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Wine Awards Table */}
                <section className="wine-awards-section">
                    <h2 className="section-title">Award-Winning Wines</h2>

                    <div className="wine-awards-table-container">
                        <div className="wine-awards-header-row">
                            <div className="col-award">Award Title</div>
                            <div className="col-comp">Competition</div>
                            <div className="col-wine">Wine</div>
                        </div>

                        <div className="wine-awards-body">
                            {[...wineAwards].sort((a, b) => {
                                const soldOutWines = ["Blustery Blend", "Enchanted Apple", "New Dawn", "Pyrrha’s Passion"];
                                const aSoldOut = soldOutWines.includes(a.wine);
                                const bSoldOut = soldOutWines.includes(b.wine);

                                if (aSoldOut && !bSoldOut) return 1;
                                if (!aSoldOut && bSoldOut) return -1;

                                return a.wine.localeCompare(b.wine);
                            }).map((award, idx) => (
                                <div key={idx} className="wine-award-row">
                                    <div className="col-award" data-label="Award">{award.award}</div>
                                    <div className="col-comp" data-label="Competition">
                                        {award.year ? `${award.year} ` : ''}{award.competition}
                                    </div>
                                    <div className="col-wine" data-label="Wine">{award.wine}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Awards;
