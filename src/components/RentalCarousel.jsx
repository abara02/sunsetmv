'use client';

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Tent } from "lucide-react";
import { useRouter } from "next/navigation";
import "./RentalCarousel.css";

const RentalCarousel = ({ items }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const router = useRouter();

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

    const handleInquire = (item) => {
        router.push(`/events/inquire?id=${item.id}`);
    };

    const handleDragEnd = (_, info) => {
        const threshold = 50;
        if (info.offset.x < -threshold) nextStep();
        else if (info.offset.x > threshold) prevStep();

        if (Math.abs(info.offset.x) > 10) {
            setHasInteracted(true);
        }
    };

    const isMobile = window.innerWidth < 768;
    const spacing = isMobile ? 340 : 420;

    return (
        <div className="rental-carousel-wrapper">

            {/* Navigation */}
            <div className={`rental-carousel-nav prev ${hasInteracted ? 'has-interacted' : ''}`}>
                <button onClick={prevStep} aria-label="Previous">
                    <ChevronLeft size={32} />
                </button>
            </div>

            <div className={`rental-carousel-nav next ${hasInteracted ? 'has-interacted' : ''}`}>
                <button onClick={nextStep} aria-label="Next">
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Carousel */}
            <div className="rental-carousel-content-area">

                {[-1, 0, 1].map((offset) => {
                    const item = getItem(index + offset);
                    const isActive = offset === 0;

                    return (
                        <motion.div
                            key={`${index + offset}-${item.id}`}
                            initial={{
                                x: offset * spacing + direction * spacing,
                                scale: isActive ? 1 : 0.8,
                                opacity: isActive ? 1 : 0.4
                            }}
                            animate={{
                                x: offset * spacing,
                                scale: isActive ? 1 : 0.85,
                                opacity: isActive ? 1 : 0.5
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
                            className={`rental-carousel-card ${isActive ? "active" : "inactive"}`}
                        >

                            {/* Image */}
                            <div className="rental-card-image-area">
                                {item.images && item.images.length > 0 ? (
                                    <CyclingImage
                                        images={item.images}
                                        alt={item.title}
                                        startIndex={item.id === 'half-tent' ? 1 : 0}
                                    />
                                ) : item.image ? (
                                    <img src={item.image} alt={item.title} />
                                ) : (
                                    <div className="placeholder-icon">
                                        <Tent size={64} strokeWidth={1} />
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="rental-card-details">
                                <div>
                                    <h3>{item.title}</h3>
                                    {item.price && <p className="price">{item.price}</p>}
                                    <p className="description">{item.description}</p>
                                </div>

                                <button
                                    className="btn btn-primary inquire-btn"
                                    onClick={() => handleInquire(item)}
                                >
                                    Request Reservation
                                </button>
                            </div>

                        </motion.div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="rental-carousel-pagination">
                {items.map((_, i) => {
                    const current =
                        ((index % items.length) + items.length) % items.length;

                    return (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > current ? 1 : -1);
                                setIndex(index + (i - current));
                            }}
                            className={`dot ${i === current ? "active" : ""}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    );
                })}
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

export default RentalCarousel;
