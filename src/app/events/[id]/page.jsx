'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import './EventDetails.css';

const GET_EVENT_BY_ID = `
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
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
      }
      event_details {
        event_title
        event_description
        event_date
        event_time
        event_cost
        event_image {
          node {
            sourceUrl
            altText
          }
        }
        event_link {
          url
          title
        }
      }
    }
  }
`;

export default function EventDetails(props) {
    const params = use(props.params);
    const id = params.id;
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

                let attempts = 0;
                while (result.errors && attempts < 10) {
                    const errorMsg = result.errors[0].message;
                    const match = errorMsg.match(/[Ff]ield ["']([^"']+)["']/);
                    const fieldToStrip = match ? match[1] : null;

                    if (fieldToStrip) {
                        const subfieldRegex = new RegExp(`${fieldToStrip}\\s*\\{[^}]*\\}`, 'g');
                        if (subfieldRegex.test(currentQuery)) {
                            currentQuery = currentQuery.replace(subfieldRegex, '');
                        } else {
                            const fieldRegex = new RegExp(`${fieldToStrip}\\s*({[^{}]*({[^{}]*}[^{}]*)*|)`, 'g');
                            currentQuery = currentQuery.replace(fieldRegex, '');
                        }

                        // Cleanup: Remove parent fields that now have empty braces { }
                        let cleaned = true;
                        while (cleaned) {
                            const prev = currentQuery;
                            currentQuery = currentQuery.replace(/[\w_]+\s*\{\s*\}/g, '');
                            cleaned = prev !== currentQuery;
                        }

                        result = await fetchWithQuery(currentQuery);
                        attempts++;
                    } else {
                        break;
                    }
                }

                if (result.errors) throw new Error(result.errors[0].message);

                if (!result.data || !result.data.event) {
                    const MINIMAL_QUERY = `query GetEvent($id: ID!) { event(id: $id) { id title eventDetails { eventTitle } event_details { event_title } } }`;
                    const minimalResult = await fetchWithQuery(MINIMAL_QUERY);
                    if (!minimalResult.data?.event) throw new Error('Event not found');
                    result = minimalResult;
                }

                const node = result.data.event;
                const fields = node.eventDetails || node.event_details || {};
                const eventTitle = fields.eventTitle || fields.event_title || (typeof node.title === 'string' ? node.title : node.title?.rendered) || 'Untitled Event';

                const rawDate = fields.eventDate || fields.event_date;
                const dateObj = rawDate ? new Date(rawDate) : new Date();

                const getLink = (linkField) => {
                    if (!linkField) return null;
                    if (typeof linkField === 'string') {
                        if (linkField.startsWith('http')) return { url: linkField, title: 'Register Now' };
                        return null;
                    }
                    if (typeof linkField === 'object') {
                        const url = linkField.url || linkField.target || Object.values(linkField).find(v => typeof v === 'string' && v.startsWith('http'));
                        const title = linkField.title || 'Register Now';
                        if (url) return { url, title };
                    }
                    return null;
                };

                const finalLink = getLink(fields.eventLink || fields.event_link);
                const isWorkshop = eventTitle.toLowerCase().includes('galentine');

                setEvent({
                    id: node.id,
                    title: eventTitle,
                    description: fields.eventDescription || fields.event_description || '',
                    date: dateObj.toLocaleDateString('default', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    time: fields.eventTime || fields.event_time || '',
                    cost: fields.eventCost || fields.event_cost || null,
                    imageUrl: isWorkshop ? '/eventsdummy.png' : (fields.eventImage?.node?.sourceUrl || fields.event_image?.node?.sourceUrl || null),
                    imageAlt: fields.eventImage?.node?.altText || fields.event_image?.node?.altText || eventTitle || 'Event Image',
                    link: finalLink
                });
            } catch (err) {
                console.error('Error fetching event details:', err);
                if (id === 'galentines-workshop') {
                    setEvent({
                        id: 'galentines-workshop',
                        title: 'Galentine’s Charcuterie Workshop',
                        description: 'Hey ladies! Join Mommy Salami Charcuterie for a fun in-person Galentines Day Charcuterie Workshop at Sunset Meadow Vineyards! 💕🫒 Whether you’re a charcuterie pro or new to the game, we’ll guide you through creating beautiful, delicious boards perfect for sharing with your besties. Bring your love for good food, great company, and laughs. It’s all about celebrating friendship and tasty bites! 🧀🥂',
                        date: 'Friday, February 13, 2026',
                        time: '6:00 PM - 8:00 PM',
                        cost: '$75.00',
                        imageUrl: '/eventsdummy.png',
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

        window.scrollTo(0, 0);
        fetchEvent();
    }, [id]);

    if (loading) return (
        <div className="page-container event-details-loading">
            <div className="loading-spinner"></div>
        </div>
    );

    if (error || !event) return (
        <div className="page-container event-details-error">
            <div className="container py-5 text-center">
                <h2>Oops!</h2>
                <p>{error || 'Event not found'}</p>
                <Link href="/events" className="btn btn-primary mt-3">Back to Events</Link>
            </div>
        </div>
    );

    return (
        <div className="page-container event-details-page">
            <div className="container">
                <Link href="/events" className="back-link">
                    <ArrowLeft size={18} /> Back to Events
                </Link>

                <div className="event-header-centered">
                    <h1 className="event-title">{event.title}</h1>
                    <div className="event-date-badge">
                        <Calendar size={18} /> {event.date}
                    </div>
                </div>

                <div className={`event-detail-content-refined ${!event.imageUrl ? 'no-image' : ''}`}>
                    <div className="event-main-grid">
                        <div className="event-left-column">
                            {event.imageUrl && (
                                <div className="event-image-container">
                                    <img src={event.imageUrl} alt={event.imageAlt} className="main-event-image" />
                                </div>
                            )}

                            <div className="event-details-sidebar">
                                <h3>Details:</h3>
                                <div className="details-list">
                                    <div className="details-row">
                                        <span className="details-label">Date:</span>
                                        <span className="details-value">{event.date}</span>
                                    </div>
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
                                </div>
                            </div>

                            {event.link && (
                                <div className="event-register-container">
                                    <a href={event.link.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        {event.link.title || 'Register Now'} <ExternalLink size={14} />
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="event-description-container">
                            <div className="event-full-description">
                                {event.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
