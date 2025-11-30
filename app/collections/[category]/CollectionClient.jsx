'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { FiChevronRight, FiFilter } from 'react-icons/fi';

export default function CollectionClient({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts);
    const [sort, setSort] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

    // Filter and Sort logic
    useEffect(() => {
        let filtered = [...initialProducts];

        // Filter by price
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Sort
        if (sort === 'price_asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sort === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        // 'featured' is default, assume initial order or specific field

        setProducts(filtered);
    }, [sort, priceRange, initialProducts]);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - Hover to Expand */}
            <div
                className={`hidden md:block transition-all duration-300 ${sidebarExpanded ? 'w-64' : 'w-16'}`}
                onMouseEnter={() => setSidebarExpanded(true)}
                onMouseLeave={() => setSidebarExpanded(false)}
            >
                <div className="sticky top-4 space-y-4">
                    {/* Collapsed State - Icon Only */}
                    {!sidebarExpanded && (
                        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex flex-col items-center gap-4">
                                <FiFilter size={24} className="text-[#5A7D5C]" />
                                <div className="writing-mode-vertical text-sm font-medium text-gray-600">
                                    Filters
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Expanded State */}
                    {sidebarExpanded && (
                        <>
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                                <h3 className="font-serif text-lg font-bold text-[#333333] mb-4 border-b pb-2">Sort By</h3>
                                <div className="space-y-2">
                                    {[
                                        { label: 'Featured', value: 'featured' },
                                        { label: 'Price: Low to High', value: 'price_asc' },
                                        { label: 'Price: High to Low', value: 'price_desc' },
                                        { label: 'Newest Arrivals', value: 'newest' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSort(option.value)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${sort === option.value
                                                ? 'bg-[#5A7D5C] text-white font-medium'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-[#5A7D5C]'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                                <h3 className="font-serif text-lg font-bold text-[#333333] mb-4 border-b pb-2">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                            <input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#5A7D5C]"
                                                placeholder="Min"
                                            />
                                        </div>
                                        <span className="text-gray-400">-</span>
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                            <input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#5A7D5C]"
                                                placeholder="Max"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="10000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5A7D5C]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Filters - Always Visible */}
            <div className="md:hidden w-full space-y-4">
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-[#333333] mb-4 border-b pb-2">Sort By</h3>
                    <div className="space-y-2">
                        {[
                            { label: 'Featured', value: 'featured' },
                            { label: 'Price: Low to High', value: 'price_asc' },
                            { label: 'Price: High to Low', value: 'price_desc' },
                            { label: 'Newest Arrivals', value: 'newest' }
                        ].map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setSort(option.value)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${sort === option.value
                                    ? 'bg-[#5A7D5C] text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#5A7D5C]'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-[#333333] mb-4 border-b pb-2">Price Range</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                <input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                    className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#5A7D5C]"
                                    placeholder="Min"
                                />
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                    className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#5A7D5C]"
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                        <div className="pt-2">
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5A7D5C]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                {products.length === 0 && (
                    <p className="text-center text-gray-500 mt-12">No products found matching your filters.</p>
                )}
            </div>
        </div>
    );
}
