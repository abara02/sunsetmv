import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Events.css';
import { Users, Music, Wine, List as ListIcon, Calendar as CalendarIcon } from 'lucide-react';
import EventCalendar from '../components/EventCalendar';
import RentalCarousel from '../components/RentalCarousel';

// Enhanced events data with date objects for calendar
const events = [
    { id: 1, month: 'JUN', day: '12', date: new Date(2025, 5, 12), title: 'Jazz in the Vines', desc: 'Live music featuring the exuberant sounds of local jazz trio.', time: '2:00 PM - 5:00 PM', category: 'Music' },
    { id: 2, month: 'JUN', day: '18', date: new Date(2025, 5, 18), title: 'Summer Solstice Tasting', desc: 'Special extended hours and flight specials to celebrate the longest day.', time: '11:00 AM - 8:00 PM', category: 'Tasting' },
    { id: 3, month: 'JUL', day: '04', date: new Date(2025, 6, 4), title: 'Red, White & Rosé', desc: 'BBQ food truck and patriotic wine slushies.', time: '12:00 PM - 6:00 PM', category: 'Festival' },
    { id: 4, month: 'AUG', day: '15', date: new Date(2025, 7, 15), title: 'Sunset Yoga', desc: 'Relax and unwind with a guided yoga session overlooking the vineyard.', time: '6:00 PM - 7:30 PM', category: 'Wellness' },
];

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

const Events = () => {
    const { hash } = useLocation();
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

    // Scroll to hash on load/change
    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [hash]);

    return (
        <div className="page-container events-page">
            {/* Hero Section */}
            <div className="events-hero">
                <div className="overlay"></div>
                <div className="container hero-content">
                    <h1>Events at SMV</h1>
                    <p>Experience the perfect blend of wine, community, and celebration.</p>
                </div>
            </div>

            <div className="container">
                {/* Winery Events Section */}
                <section id="scheduled-events" className="events-section fade-in">
                    <div className="section-header text-center">
                        <span className="pre-heading">Join Us For</span>
                        <h2>Upcoming Events</h2>
                        <div className="divider"></div>

                        {/* View Toggle */}
                        <div className="view-toggle-container">
                            <div className="view-toggle">
                                <button
                                    className={`toggle - btn ${viewMode === 'list' ? 'active' : ''} `}
                                    onClick={() => setViewMode('list')}
                                >
                                    <ListIcon size={18} /> List
                                </button>
                                <button
                                    className={`toggle - btn ${viewMode === 'calendar' ? 'active' : ''} `}
                                    onClick={() => setViewMode('calendar')}
                                >
                                    <CalendarIcon size={18} /> Calendar
                                </button>
                            </div>
                        </div>
                    </div>

                    {viewMode === 'list' ? (
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
                                        <div className="event-category">
                                            {event.category === 'Music' && <Music size={16} />}
                                            {event.category === 'Tasting' && <Wine size={16} />}
                                            <span>{event.category || 'General'}</span>
                                        </div>
                                        <h3>{event.title}</h3>
                                        <p className="event-time">{event.time}</p>
                                        <p className="event-desc">{event.desc}</p>
                                    </div>
                                    <div className="event-action-column">
                                        <button className="btn btn-primary">Event Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EventCalendar events={events} />
                    )}
                </section>

                {/* Divider */}
                <hr className="section-divider" />

                {/* Private Events Section */}
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
                            <h3>Have a custom request?</h3>
                            <p>Contact our events coordinator to schedule a tour and discuss packages.</p>
                            <a href="mailto:events@sunsetmeadowvineyards.com" className="btn btn-primary-inverted">Contact Us</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Events;
