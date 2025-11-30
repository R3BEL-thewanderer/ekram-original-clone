'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiEye } from 'react-icons/fi';

export default function ProductCard({ product }) {
    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
        >
            <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200 relative">
                <Link href={`/products/${product.slug}`}>
                    <Image
                        src={product.images[0] || 'https://placehold.co/600x800'}
                        alt={product.name}
                        fill
                        className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                </Link>

                {/* Quick Actions */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <button className="bg-white p-3 rounded-full shadow-lg hover:bg-[#D4AF37] hover:text-white transition-colors">
                        <FiShoppingBag size={20} />
                    </button>
                    <Link href={`/products/${product.slug}`} className="bg-white p-3 rounded-full shadow-lg hover:bg-[#D4AF37] hover:text-white transition-colors">
                        <FiEye size={20} />
                    </Link>
                </div>

                {/* Badges */}
                {product.isFeatured && (
                    <span className="absolute top-2 left-2 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded">
                        Featured
                    </span>
                )}
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-lg font-medium text-[#333333]">
                        <Link href={`/products/${product.slug}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-lg font-medium text-[#5A7D5C]">₹{product.price.toLocaleString('en-IN')}</p>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
                <div className="mt-2 flex space-x-1">
                    {product.colors.map((color, index) => (
                        <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}
