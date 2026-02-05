import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Events.css';
import { Users, Music, Wine, List as ListIcon, Calendar as CalendarIcon } from 'lucide-react';
import EventCalendar from '../components/EventCalendar';
import RentalCarousel from '../components/RentalCarousel';

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

const Events = () => {
    const { hash } = useLocation();
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events from CMS
    useEffect(() => {
        const fetchEvents = async () => {
            const graphqlUrl = '/graphql';
            console.log('Attempting to fetch events from:', graphqlUrl);

            try {

                const response = await fetch(graphqlUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: QUERY_EVENTS })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();
                console.log('WPGraphQL Response:', json);

                const { data, errors } = json;

                if (errors) {
                    console.error('GraphQL Errors:', errors);
                    throw new Error(errors[0].message);
                }

                if (!data || !data.events || !data.events.nodes) {
                    console.warn('No events data found in response');
                    setEvents([]);
                    return;
                }

                // Map data to the format expected by the component
                const mappedEvents = data.events.nodes.map(node => {
                    const fields = node.eventDetails;
                    const dateObj = new Date(fields.eventDate);
                    return {
                        id: node.id,
                        title: fields.eventTitle,
                        desc: fields.eventDescription,
                        time: fields.eventTime,
                        category: 'General', // Fallback as it's not in the screenshot
                        date: dateObj,
                        month: dateObj.toLocaleString('default', { month: 'short' }).toUpperCase(),
                        day: dateObj.getDate().toString().padStart(2, '0')
                    };
                });

                console.log('Mapped Events:', mappedEvents);
                setEvents(mappedEvents);
            } catch (err) {
                console.error('Error fetching events:', err);
                // Fallback to mock data silently without notifying the user in the UI
                const mockEvents = [
                    {
                        id: 'galentines-workshop',
                        title: 'Galentine’s Charcuterie Workshop',
                        desc: 'Hey ladies! Join Mommy Salami Charcuterie for a fun in-person Galentines Day Charcuterie Workshop at Sunset Meadow Vineyards! 💕🫒 Whether you’re a charcuterie pro or new to the game, we’ll guide you through creating beautiful, delicious boards perfect for sharing with your besties.',
                        time: '6:00 PM - 8:00 PM',
                        category: 'Workshop',
                        image: '/galentines-workshop.jpg',
                        date: new Date('2026-02-13T18:00:00'),
                        month: 'FEB',
                        day: '13'
                    }
                ];
                setEvents(mockEvents);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Scroll to hash on load/change
    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
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
                            {viewMode === 'list' ? (
                                <div className="events-list fade-in">
                                    {events.map(event => (
                                        <div key={event.id} className="event-card">
                                            {event.image && (
                                                <div className="event-image-column">
                                                    <img src={event.image} alt={event.title} />
                                                </div>
                                            )}
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
                                                <Link to={`/events/${event.id}`} className="btn btn-primary">Event Details</Link>
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
                            <h3>Stay Up to Date on Upcoming Events</h3>
                            <p>Follow us on social media for the latest events, announcements, promotions, and updates.</p>
                            <div className="banner-socials">
                                <a href="https://www.facebook.com/SunsetMeadowVineyards" target="_blank" rel="noopener noreferrer" className="social-icon-link fb-icon">
                                    <img src="/icon-facebook.png" alt="Facebook" />
                                </a>
                                <a href="https://www.instagram.com/sunsetmeadowvineyards/" target="_blank" rel="noopener noreferrer" className="social-icon-link ig-icon">
                                    <img src="/icon-instagram.png" alt="Instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Events;
