import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import './EventDetails.css';

const GET_EVENT_BY_ID = `
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      eventDetails {
        eventTitle
        eventDescription
        eventDate
        eventTime
        eventCost
        eventImage {
          node {
            sourceUrl
            altText
          }
        }
        eventLink {
          url
          title
        }
        event_link {
          url
          title
        }
      }
    }
  }
`;

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const graphqlUrl = '/graphql';
            let currentQuery = GET_EVENT_BY_ID;

            const fetchWithQuery = async (queryToUse) => {
                const response = await fetch(graphqlUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: queryToUse,
                        variables: { id: id }
                    })
                });
                return await response.json();
            };

            try {
                let result = await fetchWithQuery(currentQuery);

                // Extremely resilient: If any field fails, strip it and try again
                let attempts = 0;
                while (result.errors && attempts < 10) {
                    const errorMsg = result.errors[0].message;
                    const lowerMsg = errorMsg.toLowerCase();

                    if (lowerMsg.includes('cannot query field') || lowerMsg.includes('selection')) {
                        // Handle both "Field 'name'" and "field 'name'" or 'field "name"'
                        const match = errorMsg.match(/[Ff]ield ["']([^"']+)["']/);
                        const fieldToStrip = match ? match[1] : null;

                        if (fieldToStrip) {
                            console.warn(`Resilience: Stripping or simplifying field: ${fieldToStrip}`);

                            // 1. Try simplifying: If it's a field with subfields (like eventLink { url title }),
                            // try querying just the field name itself in case it's a scalar (String).
                            const subfieldRegex = new RegExp(`${fieldToStrip}\\s*\\{[^}]*\\}`, 'g');
                            if (subfieldRegex.test(currentQuery)) {
                                currentQuery = currentQuery.replace(subfieldRegex, fieldToStrip);
                            } else {
                                // 2. If it's already a scalar or simplifying didn't help, remove it entirely
                                const fieldRegex = new RegExp(`${fieldToStrip}\\s*({[^{}]*({[^{}]*}[^{}]*)*|)`, 'g');
                                currentQuery = currentQuery.replace(fieldRegex, '');
                            }

                            result = await fetchWithQuery(currentQuery);
                            attempts++;
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }

                if (result.errors) throw new Error(result.errors[0].message);

                // If data is null but no errors, this is a "not found" case
                if (!result.data || !result.data.event) {
                    // One last ditch effort: fetch just the ID to see if the event exists at all
                    const MINIMAL_QUERY = `query GetEvent($id: ID!) { event(id: $id) { id eventDetails { eventTitle } } }`;
                    const minimalResult = await fetchWithQuery(MINIMAL_QUERY);
                    if (!minimalResult.data?.event) throw new Error('Event not found');
                    result = minimalResult;
                }

                const fields = result.data.event.eventDetails || {};
                const dateObj = fields.eventDate ? new Date(fields.eventDate) : new Date();

                // Advanced mapping to handle field values that might be Objects or Strings
                const getLink = (linkField) => {
                    if (!linkField) return null;

                    // Case 1: Simple String (ACF "Link URL" setting)
                    if (typeof linkField === 'string') {
                        if (linkField.startsWith('http')) return { url: linkField, title: 'Register Now' };
                        return null;
                    }

                    // Case 2: Object (ACF "Link Array" setting)
                    if (typeof linkField === 'object') {
                        // Extract URL from common properties
                        const url = linkField.url || linkField.target || Object.values(linkField).find(v => typeof v === 'string' && v.startsWith('http'));
                        const title = linkField.title || 'Register Now';
                        if (url) return { url, title };
                    }

                    return null;
                };

                console.log('Processed fields:', fields);
                const finalLink = getLink(fields.eventLink || fields.event_link);
                console.log('Mapped Link:', finalLink);

                setEvent({
                    id: result.data.event.id,
                    title: fields.eventTitle || fields.event_title || 'Untitled Event',
                    description: fields.eventDescription || fields.event_description || '',
                    date: dateObj.toLocaleDateString('default', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    cost: fields.eventCost || fields.event_cost || null,
                    imageUrl: fields.eventImage?.node?.sourceUrl || fields.event_image?.node?.sourceUrl || fields.eventImage?.sourceUrl || fields.event_image?.sourceUrl || null,
                    imageAlt: fields.eventImage?.node?.altText || fields.event_image?.node?.altText || fields.eventTitle || 'Event Image',
                    link: finalLink
                });
            } catch (err) {
                console.error('Error fetching event details:', err);

                // Fallback for demo purposes if WP is down or event ID is the mock one
                if (id === 'galentines-workshop') {
                    setEvent({
                        id: 'galentines-workshop',
                        title: 'Galentine’s Charcuterie Workshop',
                        description: 'Hey ladies! Join Mommy Salami Charcuterie for a fun in-person Galentines Day Charcuterie Workshop at Sunset Meadow Vineyards! 💕🫒 Whether you’re a charcuterie pro or new to the game, we’ll guide you through creating beautiful, delicious boards perfect for sharing with your besties. Bring your love for good food, great company, and laughs. It’s all about celebrating friendship and tasty bites! 🧀🥂',
                        date: 'Friday, February 13, 2026',
                        time: '6:00 PM - 8:00 PM (Ends Feb 14 @ 1:00 AM)',
                        cost: '$75.00', // Assumed cost or filler
                        imageUrl: '/galentines-workshop.jpg',
                        imageAlt: 'Galentines Charcuterie Workshop',
                        link: { url: 'https://www.eventbrite.com', title: 'Register on Eventbrite' }
                    });
                } else {
                    setError(`Failed to load event details: ${err.message}.`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div className="page-container event-details-loading" style={{ textAlign: 'center' }}>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container event-details-error">
                <div className="container text-center">
                    <h2>Oops!</h2>
                    <p>{error}</p>
                    <Link to="/events" className="btn btn-primary mt-3">
                        <ArrowLeft size={18} /> Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container event-details-page">
            <div className="container">
                <Link to="/events" className="back-link">
                    <ArrowLeft size={18} /> Back to Events
                </Link>

                {/* Header Information (Centered) */}
                <div className="event-header-centered">
                    <h1 className="event-title">{event.title}</h1>
                    <div className="event-date-badge">
                        <Calendar size={18} /> {event.date}
                    </div>
                </div>

                <div className={`event-detail-content-refined ${!event.imageUrl ? 'no-image' : ''} ${!event.description ? 'no-description' : ''}`}>
                    <div className="event-main-grid">
                        {/* Left Column: Image and Details */}
                        <div className="event-left-column">
                            {event.imageUrl && (
                                <div className="event-image-container">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.imageAlt}
                                        className="main-event-image"
                                    />
                                </div>
                            )}

                            <div className="event-details-sidebar">
                                <h3>Details:</h3>
                                <div className="details-list">
                                    {event.date && (
                                        <div className="details-row">
                                            <span className="details-label">Date:</span>
                                            <span className="details-value">{event.date}</span>
                                        </div>
                                    )}
                                    {event.time && (
                                        <div className="details-row">
                                            <span className="details-label">Time:</span>
                                            <span className="details-value">{event.time}</span>
                                        </div>
                                    )}
                                    {event.cost && (
                                        <div className="details-row">
                                            <span className="details-label">Cost:</span>
                                            <span className="details-value">{event.cost}</span>
                                        </div>
                                    )}
                                    {event.link && event.link.url && (
                                        <div className="details-row link-row">
                                            <a
                                                href={event.link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-sm"
                                            >
                                                {event.link.title || 'Register Now'} <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Description */}
                        {event.description && (
                            <div className="event-description-container">
                                <div className="event-full-description">
                                    {event.description}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
