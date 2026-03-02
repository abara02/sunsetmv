'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SoldOutModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="sold-out-modal-overlay" onClick={onClose}>
                    <motion.div
                        className="sold-out-modal"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Sold Out</h2>
                        <p>Oh no! This vintage is currently sold out. We hope to share it with you again soon.</p>
                        <button className="close-btn" onClick={onClose}>CLOSE</button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SoldOutModal;
