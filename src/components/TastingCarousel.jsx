'use client';

import React, { useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wine, Info } from "lucide-react";
import "./TastingCarousel.css";

const TastingCarousel = ({ items }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);

    const nextStep = useCallback(() => {
        setDirection(1);
        setIndex((prev) => prev + 1);
        setHasInteracted(true);
    }, []);

    const prevStep = useCallback(() => {
        setDirection(-1);
        setIndex((prev) => prev - 1);
        setHasInteracted(true);
    }, []);

    const getItem = (i) => {
        const adjustedIndex = ((i % items.length) + items.length) % items.length;
        return items[adjustedIndex];
    };

    const handleDragEnd = (_, info) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            nextStep();
        } else if (info.offset.x > threshold) {
            prevStep();
        }

        if (Math.abs(info.offset.x) > 10) {
            setHasInteracted(true);
        }
    };

    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="carousel-wrapper">
            {/* Navigation Arrows */}
            <div className={`carousel-nav prev ${hasInteracted ? 'has-interacted' : ''}`}>
                <button onClick={prevStep} aria-label="Previous">
                    <ChevronLeft size={32} />
                </button>
            </div>

            <div className={`carousel-nav next ${hasInteracted ? 'has-interacted' : ''}`}>
                <button onClick={nextStep} aria-label="Next">
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Carousel Container */}
            <div className="carousel-content-area">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    {[-1, 0, 1].map((offset) => {
                        const item = getItem(index + offset);
                        const isActive = offset === 0;

                        return (
                            <motion.div
                                key={`${index + offset}-${item.title}`} // Unique key based on index to force re-render/animate
                                custom={direction}
                                initial={{
                                    x: offset * 350 + (direction * 100), // Adjust spacing
                                    scale: isActive ? 1 : 0.8,
                                    opacity: isActive ? 1 : 0.4,
                                    zIndex: isActive ? 10 : 1
                                }}
                                animate={{
                                    x: offset * (isMobile ? 320 : 400),
                                    scale: isActive ? 1 : 0.85,
                                    opacity: isActive ? 1 : 0.5,
                                    zIndex: isActive ? 10 : 1
                                }}
                                exit={{
                                    x: offset * 350 - (direction * 100),
                                    opacity: 0,
                                    scale: 0.7
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    opacity: { duration: 0.2 }
                                }}
                                drag={isActive ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={handleDragEnd}
                                className={`carousel-card ${isActive ? "active" : "inactive"}`}
                            >
                                {/* Image / Icon Section */}
                                <div className="card-image-area">
                                    {item.images && item.images.length > 0 ? (
                                        <CyclingImage images={item.images} alt={item.title} />
                                    ) : item.image ? (
                                        <img src={item.image} alt={item.title} />
                                    ) : (
                                        <div className="placeholder-icon">
                                            <Wine size={64} strokeWidth={1} />
                                        </div>
                                    )}
                                    {item.badge && <span className="card-badge">{item.badge}</span>}
                                </div>

                                {/* Content Section */}
                                <div className="card-details">
                                    <div>
                                        <h3>{item.title}</h3>
                                        {item.price && <p className="price">{item.price}</p>}
                                        <p className="description">{item.description}</p>
                                    </div>

                                    {/* Footer removed as requested */}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="carousel-pagination">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > (((index % items.length) + items.length) % items.length) ? 1 : -1);
                            setIndex(index + (i - (((index % items.length) + items.length) % items.length)));
                        }}
                        className={`dot ${i === (((index % items.length) + items.length) % items.length) ? "active" : ""}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Helper component for cycling images
const CyclingImage = ({ images, alt, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    React.useEffect(() => {
        if (!images || images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    return (
        <div className="cycling-image-container">
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

export default TastingCarousel;
