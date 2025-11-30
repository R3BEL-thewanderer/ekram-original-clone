'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CollectionCard({ collection }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % collection.images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [collection.images.length]);

    return (
        <Link href={collection.link} className="group relative h-[500px] overflow-hidden rounded-lg block">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={collection.images[currentImageIndex]}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />

            <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{collection.name}</h3>
                <span className="text-white border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity">View Collection</span>
            </div>
        </Link>
    );
}
