'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TastingCarousel from '../../components/TastingCarousel';
import './Visit.css';

const GET_VISIT_PAGE = `
  query GetVisitPage($id: ID!) {
    page(id: $id, idType: URI) {
      id
      title
      storeHoursEdit {
        hoursTitle
        hoursList
      }
    }
  }
`;

function VisitContent() {
    const searchParams = useSearchParams();
    const hash = ''; // In Next.js, handling hash fragments is slightly different.

    const images = [
        '/visit-bar-bg.jpg',
        '/visit-bg-1.jpg',
        '/visit-bg-2.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hours, setHours] = useState([]);
    const [hoursTitle, setHoursTitle] = useState('Winter Hours');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitData = async () => {
            const graphqlUrl = '/graphql';
            const attemptFetch = async (uri, queryToUse) => {
                try {
                    const response = await fetch(graphqlUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            query: queryToUse,
                            variables: { id: uri }
                        }),
                        cache: 'no-store',
                        next: { revalidate: 0 }
                    });
                    const contentType = response.headers.get('content-type');
                    if (!contentType || !contentType.includes('application/json')) {
                        throw new Error('Server returned a non-JSON response.');
                    }

                    const json = await response.json();
                    if (json.errors) return null;
                    const page = json.data?.page;
                    if (!page) return null;
                    return page.storeHoursEdit || page.storeHoursDetails;
                } catch (e) {
                    return null;
                }
            };

            try {
                let details = await attemptFetch('/store-hours/', GET_VISIT_PAGE);
                if (!details) details = await attemptFetch('store-hours', GET_VISIT_PAGE);
                if (!details) details = await attemptFetch('/store-hours', GET_VISIT_PAGE);

                if (details) {
                    setHoursTitle(details.hoursTitle || 'Winter Hours');
                    const rawContent = details.hoursList;
                    if (rawContent) {
                        const lines = rawContent.split(/\r?\n/).filter(line => line.trim() !== '');
                        const mapped = lines.map(line => {
                            const firstColonIndex = line.indexOf(':');
                            if (firstColonIndex !== -1) {
                                return {
                                    label: line.substring(0, firstColonIndex).trim(),
                                    value: line.substring(firstColonIndex + 1).trim()
                                };
                            }
                            return { label: '', value: line.trim() };
                        });
                        setHours(mapped);
                    }
                }
            } catch (err) {
                console.error('Final hours fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitData();
    }, []);

    const tastingItems = [
        {
            title: "Classic Tasting",
            price: "$17",
            description: "Sample any five of our estate-grown wines as our knowledgeable staff guides you through the tasting experience.",
            images: ["/classic-tasting-1.jpg", "/classic-tasting-2.jpg"]
        },
        {
            title: "Chocolate Pairing",
            price: "$25",
            description: "Five pre-selected wines thoughtfully paired with Fascia's Chocolates for an unforgettable tasting experience.",
            image: "/chocolate-pairing.jpg"
        },
        {
            title: "Seasonal Offerings",
            price: "$10",
            description: "Sip seasonally: Enjoy refreshing wine slushies in the warmer months, or cozy mulled wine by the fire in our winter months.",
            images: ["/wine-slushy.jpg", "/mulled-wine.jpg"]
        },
        {
            title: "By The Glass or Bottle",
            description: "Our estate-grown wines are available by the glass or bottle. Relax and enjoy them on our scenic property, or purchase bottles to enjoy at home.",
            image: "/glass-bottle.jpg"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="page-container visit-page">
            <div className="page-header visit-header-container">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`visit-bg-slide ${index === currentImageIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}

                <div className="overlay"></div>
                <div className="container header-content">
                    <h1>Visit Us</h1>
                    <p>Join us for wine tastings and so much more! Open year-round, our Rustic Tasting Room & Gift Shop
                        offers limited indoor seating and ample outdoor seating on our spacious lawn. </p>
                </div>
            </div>

            <div className="container visit-content">
                <div className="visit-grid">
                    <div className="visit-info">
                        <section id="tasting-room">
                            <h2>Wine Tastings & Beverages</h2>

                            <TastingCarousel items={tastingItems} />

                            <h2>Tips for Your Visit</h2>
                            <ul className="visit-tips-list">
                                <li>Seating is first come, first served. Indoor seating is limited.</li>
                                <li>Outdoor seating is ideal for groups of 10 or fewer. Larger groups, please call ahead. Guests are welcome to bring their own chairs or blankets for outdoor comfort.</li>
                                <li>Outside food is welcome, and food trucks are onsite most weekends. Light snacks including chips, crackers, cheese, and charcuterie are also available for purchase.</li>
                                <li>No outside beverages allowed (e.g., water bottles, tumblers, Yeti/Stanley cups, etc.).</li>
                                <li>Check our Events Calendar to see what’s happening in the vines each weekend.</li>
                                <li>Please review our FAQ for current rules and guidelines.</li>
                            </ul>

                            <h2>{hoursTitle}</h2>
                            <div className="hours-grid-container">
                                <div className="hours-grid">
                                    {hours.length > 0 ? (
                                        hours.map((item, idx) => (
                                            <React.Fragment key={idx}>
                                                <div className="day">{item.label} :</div>
                                                <div className="time">{item.value || 'Closed'}</div>
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <>
                                            <div className="day">Monday</div>
                                            <div className="time">Closed</div>
                                            <div className="day">Tuesday</div>
                                            <div className="time">Closed</div>
                                            <div className="day">Wednesday</div>
                                            <div className="time">Closed</div>
                                            <div className="day">Thursday</div>
                                            <div className="time">12:00 PM – 5:00 PM</div>
                                            <div className="day">Friday</div>
                                            <div className="time">12:00 PM – 5:00 PM</div>
                                            <div className="day">Saturday</div>
                                            <div className="time">12:00 PM – 5:00 PM</div>
                                            <div className="day">Sunday</div>
                                            <div className="time">12:00 PM – 5:00 PM</div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section id="location">
                            <h2>Find Us</h2>
                            <div className="location-content">
                                <div className="location-info">
                                    <div className="address-details">
                                        <p className="venue-name">Sunset Meadow Vineyards</p>
                                        <p>599 Old Middle Street</p>
                                        <p>Goshen, CT 06756</p>
                                        <p className="phone-number"><a href="tel:8602014654">(860) 201-4654</a></p>
                                    </div>
                                    <a
                                        href="https://www.google.com/maps/dir/?api=1&destination=599+Old+Middle+St,+Goshen,+CT+06756"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="directions-btn"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                                <div className="map-container">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d146817.96323250173!2d-73.29181217326082!3d41.785400308531536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e79a6bbaf3bd5d%3A0xdd932246fc06bf3f!2s599%20Old%20Middle%20St%2C%20Goshen%2C%20CT%2006756!5e0!3m2!1sen!2sus!4v1632255724157!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: '350px' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Visit() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VisitContent />
        </Suspense>
    );
}
