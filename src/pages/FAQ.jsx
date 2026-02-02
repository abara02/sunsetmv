import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        // EDIT THIS TO ADD NEW FAQS, then remove "//" from the lines below to 
        // make it visible
        // {
        //  question: "",
        //  answer: ""
        //},

        {
            question: "Are dogs allowed?",
            answer: "Yes! Pets are welcome at Sunset Meadow. Please ensure your pet is leashed at all times, friendly with people and other animals, and never left unattended. Guests are responsible for cleaning up after their pets."
        },
        {
            question: "Do you allow outside food?",
            answer: "Yes, outside food is permitted; however, we kindly ask that you refrain from bringing large coolers."
        },
        {
            question: "Do you have outdoor heaters or fire pits?",
            answer: "Unfortunately, we do not offer fire pits or outdoor heaters due to local restrictions on open flames in public areas. Please do not bring portable heaters or fire pits onto the property."
        },
        {
            question: "Do you sell your wine in local liquor stores?",
            answer: <>Yes! Our wines are available at numerous package stores throughout the state. You can locate the store nearest you by visiting <Link to="/where-to-buy" className="faq-link">Where to Buy</Link>.</>
        },
        {
            question: "Do you have a restaurant?",
            answer: "While we do not have a full-service restaurant, we offer a selection of local meats, cheeses, spreads, and crackers. Food trucks are also available on-site most weekends."
        },
        {
            question: "Do you allow outside beverages?",
            answer: "No, outside beverages are not permitted due to Farm Winery Permit regulations. Violating this restriction may jeopardize our permit. Non-alcoholic beverages such as soda, water, and juice are available for purchase on-site."
        },
        {
            question: "Can we take home an unfinished bottle of wine?",
            answer: "Yes! Please bring any opened bottles to the bar so we can legally bag them for you."
        },
        {
            question: "Do you take reservations for tastings and seating?",
            answer: "Currently, we are not accepting reservations. All seating is first-come, first-served. Guests are welcome to bring their own chairs and blankets for outdoor seating."
        },
        {
            question: "Do you accept credit cards?",
            answer: "Yes, we accept all major credit cards, including Visa, MasterCard, Discover, and American Express. We do not accept checks. Please note that gratuity is accepted in cash only."
        },
        {
            question: "Is the winery wheelchair accessible?",
            answer: "Yes, Sunset Meadow is fully wheelchair accessible. Handicapped parking is available beside the winery, and a ramp provides easy access to the tasting room. Our restrooms are also wheelchair accessible."
        },
        {
            question: "Are children allowed in the tasting room?",
            answer: "Children are welcome outdoors under adult supervision at all times."
        }
    ];

    return (
        <div className="faq-page">
            <div className="faq-decor decor-top-left"></div>
            <div className="faq-decor decor-bottom-right"></div>
            <div className="faq-container">


                <div className="faq-header">
                    <h1>FREQUENTLY ASKED QUESTIONS</h1>
                    <p>Find answers to common questions about your visit.</p>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                            <button className="faq-question-btn" onClick={() => toggleFAQ(index)}>
                                <span className="faq-question-text">{faq.question}</span>
                                <span className="faq-icon">
                                    {openIndex === index ? <X size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <div className={`faq-answer-container ${openIndex === index ? 'open' : ''}`}>
                                <div className="faq-answer-content">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
