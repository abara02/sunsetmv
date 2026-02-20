'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import './EventDetails.css';

const GET_EVENT_BY_ID = `
  query GetEvent($id: ID!, $idType: EventIdType!) {
    event(id: $id, idType: $idType) {
      id
      databaseId
      slug
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
        eventLink
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
        event_link
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

            // Determine idType: If numeric, it's DATABASE_ID, otherwise SLUG
            const guessedIdType = /^\d+$/.test(id) ? 'DATABASE_ID' : 'SLUG';

            const fetchWithQuery = async (queryToUse, variables = { id, idType: guessedIdType }) => {
                const response = await fetch(graphqlUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: queryToUse,
                        variables: variables
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
                        console.log(`Attempting to strip missing field: ${fieldToStrip}`);

                        // Robust stripping: Find the field and its selection set if it has one
                        const fieldIndex = currentQuery.indexOf(fieldToStrip);
                        if (fieldIndex !== -1) {
                            let endPos = fieldIndex + fieldToStrip.length;
                            // Check if followed by a selection set { ... }
                            const nextCharMatch = currentQuery.slice(endPos).match(/^\s*\{/);
                            if (nextCharMatch) {
                                // Find matching closing brace
                                let braceCount = 0;
                                let foundStart = false;
                                for (let i = endPos; i < currentQuery.length; i++) {
                                    if (currentQuery[i] === '{') {
                                        braceCount++;
                                        foundStart = true;
                                    } else if (currentQuery[i] === '}') {
                                        braceCount--;
                                    }
                                    if (foundStart && braceCount === 0) {
                                        endPos = i + 1;
                                        break;
                                    }
                                }
                            }
                            currentQuery = currentQuery.slice(0, fieldIndex) + currentQuery.slice(endPos);
                        }

                        // Cleanup: Remove parent fields that now have empty braces { }
                        let cleaned = true;
                        while (cleaned) {
                            const prev = currentQuery;
                            currentQuery = currentQuery.replace(/[\w_]+\s*\{\s*\}/g, '');
                            cleaned = prev !== currentQuery;
                        }

                        console.log('Retrying with query:', currentQuery);
                        result = await fetchWithQuery(currentQuery);
                        attempts++;
                    } else {
                        break;
                    }
                }

                if (result.errors) {
                    console.error('❌ GraphQL Errors for EventDetails:', JSON.stringify(result.errors, null, 2));
                    console.log('Final query attempted:', currentQuery);
                    throw new Error(result.errors[0].message);
                }

                if (!result.data || !result.data.event) {
                    console.warn(`Event not found for ID ${id} as ${guessedIdType}, trying ID fallback`);
                    // Fallback 1: Try as Global ID (idType: ID)
                    const globalIdResult = await fetchWithQuery(currentQuery, { id, idType: 'ID' });

                    if (globalIdResult.data?.event) {
                        result = globalIdResult;
                    } else {
                        console.warn(`Event not found as Global ID either, trying minimal fallback`);
                        // Fallback 2: Minimal query
                        const MINIMAL_QUERY = `query GetEvent($id: ID!, $idType: EventIdType!) { event(id: $id, idType: $idType) { id databaseId slug title eventDetails { eventTitle eventLink } event_details { event_title event_link } } }`;
                        const minimalResult = await fetchWithQuery(MINIMAL_QUERY);
                        if (!minimalResult.data?.event) {
                            // Last ditch effort: Try minimal as Global ID
                            const minimalGlobalResult = await fetchWithQuery(MINIMAL_QUERY, { id, idType: 'ID' });
                            if (!minimalGlobalResult.data?.event) {
                                console.error('All fetching attempts failed for event:', id);
                                throw new Error('Event not found');
                            }
                            result = minimalGlobalResult;
                        } else {
                            result = minimalResult;
                        }
                    }
                }

                const node = result.data.event;
                const fields = node.eventDetails || node.event_details || {};
                const eventTitle = fields.eventTitle || fields.event_title || (typeof node.title === 'string' ? node.title : node.title?.rendered) || 'Untitled Event';

                const rawDate = fields.eventDate || fields.event_date;
                const dateObj = rawDate ? new Date(rawDate) : new Date();

                const getLink = (linkField) => {
                    if (!linkField) return null;
                    if (typeof linkField === 'string') {
                        if (linkField.startsWith('http')) return { url: linkField, title: 'Purchase Tickets' };
                        return null;
                    }
                    if (typeof linkField === 'object') {
                        const url = linkField.url || linkField.target || Object.values(linkField).find(v => typeof v === 'string' && v.startsWith('http'));
                        const title = linkField.title || 'Purchase Tickets';
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
                                        {event.link.title || 'Purchase Tickets'} <ExternalLink size={14} />
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
