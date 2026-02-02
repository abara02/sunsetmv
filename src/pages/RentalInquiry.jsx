import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Calendar, Clock, Mail, MessageSquare, Phone } from 'lucide-react';
import './RentalInquiry.css';

const RentalInquiry = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rental = location.state?.rental;

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        date: '',
        time: '',
        attendees: '',
        renterName: '',
        comments: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!rental) {
            // Redirect back if no rental data passed (direct access)
            // navigate('/events');
        }
    }, [rental, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to a backend or email service
        alert("Thank you for your inquiry! We'll get back to you shortly.");
        console.log("Form Data:", formData);
    };

    if (!rental) {
        return (
            <div className="inquiry-page-container container">
                <div className="error-message">
                    <h2>Private Event Inquiry</h2>
                    <p>Please select a rental option from the events page first.</p>
                    <button onClick={() => navigate('/events')} className="btn btn-primary">Go to Events</button>
                </div>
            </div>
        );
    }

    return (
        <div className="inquiry-page-container">
            <div className="container">
                <button onClick={() => navigate('/events')} className="back-link">
                    <ArrowLeft size={20} /> Back to Events
                </button>

                <div className="inquiry-grid">
                    {/* Left Column: Details */}
                    <div className="rental-details-column">
                        <h1>{rental.title}</h1>
                        <div className="price-tag">{rental.price}</div>

                        <div className="rental-image-large">
                            {/* Use cycling images if available, otherwise single image or placeholder */}
                            {rental.images && rental.images.length > 0 ? (
                                <CyclingImage
                                    images={rental.images}
                                    alt={rental.title}
                                    startIndex={rental.id === 'half-tent' ? 1 : 0}
                                />
                            ) : rental.image ? (
                                <img src={rental.image} alt={rental.title} />
                            ) : (
                                <div className="placeholder-box">Selected Rental</div>
                            )}
                        </div>

                        <h3>Rental Details</h3>
                        <div className="details-content">
                            <p className="rental-description-main">
                                {(() => {
                                    const text = rental.inquiryDescription || rental.description;
                                    if (typeof text === 'string' && text.includes('Please note:')) {
                                        const parts = text.split('Please note:');
                                        return (
                                            <>
                                                {parts[0]}
                                                <i>Please note:{parts.slice(1).join('Please note:')}</i>
                                            </>
                                        );
                                    }
                                    return text;
                                })()}
                            </p>

                            {/* Dynamically render the 'More info' text properly if it was passed as a long string or structured data 
                                Since we are passing 'details' string in the next step, we render it here. */}
                            {rental.details && (
                                <div className="additional-info">
                                    <h4>Additional Information:</h4>
                                    <ul className="info-list">
                                        {rental.details.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                                            <li key={idx}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="availability-note">
                                <strong>Note:</strong> Rentals Available Mid May - Mid December
                            </div>

                            <div className="contact-info-box">
                                <h4>Contact Us</h4>
                                <p><Phone size={16} /> (860) 201-4654</p>
                                <p><Mail size={16} /> events@sunsetmeadowvineyards.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Inquiry Form */}
                    <div className="inquiry-form-column">
                        <div className="form-card">
                            <h2>Inquiry Form</h2>
                            <p className="form-subtitle">Fill out the details below to start planning your event — or feel free to contact us directly with any questions!</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address (to be sent from)</label>
                                    <div className="input-with-icon">
                                        <Mail size={18} />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Name of Party / Event Title</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Smith Family Reunion"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="date">Date Requested</label>
                                        <div className="input-with-icon">
                                            <Calendar size={18} />
                                            <input
                                                type="date"
                                                id="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="time">Time</label>
                                        <div className="input-with-icon">
                                            <Clock size={18} />
                                            <input
                                                type="time"
                                                id="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="attendees"># of Attendees</label>
                                        <div className="input-with-icon">
                                            <User size={18} />
                                            <input
                                                type="number"
                                                id="attendees"
                                                name="attendees"
                                                value={formData.attendees}
                                                onChange={handleChange}
                                                required
                                                min="1"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="renterName">Renter Name</label>
                                        <input
                                            type="text"
                                            id="renterName"
                                            name="renterName"
                                            value={formData.renterName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Full Name"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="comments">Additional comments / questions</label>
                                    <div className="input-with-icon textarea-icon">
                                        <MessageSquare size={18} />
                                        <textarea
                                            id="comments"
                                            name="comments"
                                            value={formData.comments}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Tell us more about your event needs..."
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for cycling images
const CyclingImage = ({ images, alt, interval = 3000, startIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    React.useEffect(() => {
        if (!images || images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </AnimatePresence>
        </div>
    );
};

export default RentalInquiry;
