'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import './Events.css';
import { Users, Music, Wine, List as ListIcon, Calendar as CalendarIcon } from 'lucide-react';
import EventCalendar from '../../components/EventCalendar';
import RentalCarousel from '../../components/RentalCarousel';

const QUERY_EVENTS = `
  query GetEvents {
    events {
      nodes {
        id
        eventDetails {
          eventTitle
          eventDescription
          eventDate
          eventTime
        }
      }
    }
  }
`;

const rentals = [
    {
        id: 'full-tent',
        title: 'Full Tent Rental',
        price: '$550',
        description: 'Reserved tented space for gatherings of up to 75 people',
        details: `Four-hour rental period (no additional time or day-of setup included)
Includes guest tables and chairs, plus one 6-foot rectangular table if needed
No outside beverages permitted, all beverages and alcohol provided by Sunset Meadow Vineyards (including water)
Wine service available with full bar setup
No open-flame catering permitted; kitchen facilities are not available
Decorations such as candles, sparklers, confetti, and streamers are not allowed
A non-refundable 50% deposit is required upon booking; remaining balance due 7 days prior to the event`,
        inquiryDescription: 'Enjoy a reserved, tented event space suitable for gatherings of up to 75 guests.\n\nPlease note: Rental price does not include wine or gratuity. Gratuity is cash only.',
        image: '/private-tent.jpg',
        images: ['/full-tent-1.jpg', '/full-tent-2.jpg']
    },
    {
        id: 'half-tent',
        title: 'Half Tent Rental',
        price: '$330',
        description: 'Reserved tented space for gatherings of up to 45 people',
        inquiryDescription: 'Enjoy a reserved, tented event space suitable for gatherings of up to 45 guests.\n\nPlease note: Rental price does not include wine or gratuity. Gratuity is cash only.',
        details: `Three-hour rental period (no additional time or day-of setup included)
Includes guest tables and chairs, plus one 6-foot rectangular table if needed
No outside beverages permitted, all beverages and alcohol provided by Sunset Meadow Vineyards (including water)
Wine service available with full bar setup
No open-flame catering permitted; kitchen facilities are not available
Decorations such as candles, sparklers, confetti, and streamers are not allowed
A non-refundable 50% deposit is required upon booking; remaining balance due 7 days prior to the event`,
        image: '/private-half-tent.jpg',
        images: ['/half-tent-1.jpg', '/full-tent-2.jpg']
    },
    {
        id: 'gazebo',
        title: 'Gazebo Rental',
        price: '$50',
        description: 'Reserved gazebo space for gatherings of up to 10 people',
        details: `Two-hour rental period (no additional time or day-of setup included)
Rental includes gazebo with chairs and tables
Outside food is allowed
No outside beverages permitted, all beverages and alcohol provided by Sunset Meadow Vineyards (including water)
No open-flame catering permitted; kitchen facilities are not available
Decorations such as candles, sparklers, confetti, and streamers are not allowed
Non-refundable payment due up front upon booking`,
        inquiryDescription: 'Enjoy a reserved gazebo space suitable for gatherings of up to 10 guests.\n\nPlease note: Rental price does not include wine or gratuity.',
        image: '/gazebo-rental.jpg'
    }
];

function EventsContent() {
    const [viewMode, setViewMode] = useState('list');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchEvents = async () => {
            const graphqlUrl = '/graphql';
            try {
                const response = await fetch(graphqlUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: QUERY_EVENTS }),
                    cache: 'no-store',
                    next: { revalidate: 0 }
                });

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Server returned a non-JSON response.');
                }

                const json = await response.json();
                const { data, errors } = json;

                if (errors) throw new Error(errors[0].message);

                if (!data || !data.events || !data.events.nodes) {
                    setEvents([]);
                    return;
                }

                const mappedEvents = data.events.nodes.map(node => {
                    const fields = node.eventDetails;
                    const dateObj = new Date(fields.eventDate);
                    const isWorkshop = fields.eventTitle.toLowerCase().includes('galentine');
                    return {
                        id: node.id,
                        title: fields.eventTitle,
                        desc: fields.eventDescription,
                        time: fields.eventTime,
                        category: 'General',
                        image: isWorkshop ? '/galentines-workshop.png' : (node.featuredImage?.node?.sourceUrl || null),
                        date: dateObj,
                        month: dateObj.toLocaleString('default', { month: 'short' }).toUpperCase(),
                        day: dateObj.getDate().toString().padStart(2, '0')
                    };
                });
                setEvents(mappedEvents);
            } catch (err) {
                const mockEvents = [
                    {
                        id: 'galentines-workshop',
                        title: 'Galentine’s Charcuterie Workshop',
                        desc: 'Hey ladies! Join Mommy Salami Charcuterie for a fun in-person Galentines Day Charcuterie Workshop at Sunset Meadow Vineyards! 💕🫒 Whether you’re a charcuterie pro or new to the game, we’ll guide you through creating beautiful, delicious boards perfect for sharing with your besties.',
                        time: '6:00 PM - 8:00 PM',
                        category: 'Workshop',
                        image: '/galentines-workshop.png',
                        date: new Date('2026-02-13T18:00:00'),
                        month: 'FEB',
                        day: '13'
                    },
                    {
                        id: 'paint-and-sip',
                        title: 'Paint and Sip',
                        desc: 'Unleash your inner artist! Join us for a relaxing afternoon of painting and wine. No experience necessary – our instructor will guide you step-by-step through creating your own masterpiece while you enjoy our award-winning wines.',
                        time: '4:40 PM - 6:00 PM',
                        category: 'Art',
                        image: null,
                        date: new Date('2026-02-22T16:40:00'),
                        month: 'FEB',
                        day: '22'
                    }
                ];
                setEvents(mockEvents);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const effectiveViewMode = isMobile ? 'list' : viewMode;

    return (
        <div className="page-container events-page">
            <div className="events-hero">
                <div className="overlay"></div>
                <div className="container hero-content">
                    <h1>Events at SMV</h1>
                    <p>Experience the perfect blend of wine, community, and celebration.</p>
                </div>
            </div>

            <div className="container">
                <section id="scheduled-events" className="events-section fade-in">
                    <div className="section-header text-center">
                        <span className="pre-heading">Join Us For</span>
                        <h2>Upcoming Events</h2>
                        <div className="divider"></div>

                        {!isMobile && (
                            <div className="view-toggle-container">
                                <div className="view-toggle">
                                    <button
                                        className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <ListIcon size={18} /> List
                                    </button>
                                    <button
                                        className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                                        onClick={() => setViewMode('calendar')}
                                    >
                                        <CalendarIcon size={18} /> Calendar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-5">
                            <p>No upcoming events at this time. Check back soon!</p>
                        </div>
                    ) : (
                        <>
                            {effectiveViewMode === 'list' ? (
                                <div className="events-list fade-in">
                                    {events.map(event => (
                                        <div key={event.id} className="event-card">
                                            <div className="event-date-column">
                                                <div className="date-box">
                                                    <span className="month">{event.month}</span>
                                                    <span className="day">{event.day}</span>
                                                </div>
                                            </div>
                                            <div className="event-details-column">
                                                <h3>{event.title}</h3>
                                                <p className="event-time">{event.time}</p>
                                            </div>
                                            <div className="event-action-column">
                                                <Link href={`/events/${event.id}`} className="btn btn-primary">Event Details</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EventCalendar events={events} />
                            )}
                        </>
                    )}
                </section>

                <hr className="section-divider" />

                <section id="private-events" className="events-section fade-in">
                    <div className="section-header text-center">
                        <span className="pre-heading">Host Your Own</span>
                        <h2>Private Events</h2>
                        <div className="divider"></div>
                        <p className="section-intro" style={{ textAlign: 'left', maxWidth: '100%' }}>
                            Celebrate with Us – Perfect for Corporate Gatherings, Birthdays, Anniversaries, and Special Occasions
                        </p>
                    </div>

                    <div className="rentals-carousel-container">
                        <RentalCarousel items={rentals} />
                    </div>

                    <div className="inquiry-banner mt-5">
                        <div className="inquiry-content">
                            <h3>Stay Up to Date on Upcoming Events</h3>
                            <p>Follow us on social media for the latest events, announcements, promotions, and updates.</p>
                            <div className="banner-socials">
                                <a href="https://www.facebook.com/SunsetMeadowVineyards" target="_blank" rel="noopener noreferrer" className="social-icon-link icon-wrap fb">
                                    <img src="/icons8-facebook-50.png" alt="Facebook" />
                                </a>
                                <a href="https://www.instagram.com/sunsetmeadowvineyards/" target="_blank" rel="noopener noreferrer" className="social-icon-link icon-wrap ig">
                                    <img src="/icons8-instagram-50.png" alt="Instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function Events() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventsContent />
        </Suspense>
    );
}
