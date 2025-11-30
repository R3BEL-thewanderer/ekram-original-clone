'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiShare2, FiStar } from 'react-icons/fi';
import { useCartStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailClient({ product, relatedProducts }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || null);
    const [selectedSize, setSelectedSize] = useState(product.sizes.length === 1 ? product.sizes[0] : null);
    const [quantity, setQuantity] = useState(1);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewsData, setReviewsData] = useState(null);
    const addItem = useCartStore((state) => state.addItem);

    // Fetch reviews
    useEffect(() => {
        fetchReviews();
    }, [product._id]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?productId=${product._id}`);
            if (res.ok) {
                const data = await res.json();
                setReviewsData(data);
                setReviews(data.reviews || []);
            }
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
        }
    };

    // Filter images based on selected color
    const filteredImages = product.images.filter(img => {
        if (!selectedColor) return true;
        const colorSlug = selectedColor.toLowerCase()
            .replace(/ & /g, '-and-')
            .replace(/\s+/g, '-');
        return img.toLowerCase().includes(colorSlug);
    });

    const displayImages = filteredImages.length > 0 ? filteredImages : product.images;

    const handleColorSelect = (colorName) => {
        setSelectedColor(colorName);
        setSelectedImage(0);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addItem(product, quantity, selectedColor, selectedSize);
        alert('Added to cart!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 group">
                        <Image
                            src={displayImages[selectedImage] || 'https://placehold.co/600x800'}
                            alt={product.name}
                            fill
                            className="object-cover object-center group-hover:scale-150 transition-transform duration-500 cursor-zoom-in"
                        />
                    </div>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                        {displayImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 ${selectedImage === idx ? 'border-[#5A7D5C]' : 'border-transparent'}`}
                            >
                                <Image src={img} alt="" fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="font-serif text-4xl font-bold text-[#333333]">{product.name}</h1>
                        <p className="text-2xl font-medium text-[#5A7D5C] mt-2">₹{product.price.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-500 mt-1">Tax included.</p>
                    </div>

                    <div className="border-t border-b border-gray-200 py-6 space-y-6">
                        {/* Color Selector */}
                        {product.colors && product.colors.length > 0 && (
                            <div>
                                <h3 className="font-medium text-[#333333] mb-3">Color: <span className="text-gray-600">{selectedColor}</span></h3>
                                <div className="flex space-x-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => handleColorSelect(color.name)}
                                            className={`w-10 h-10 rounded-full border-2 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:scale-110 ${selectedColor === color.name ? 'border-[#5A7D5C] ring-2 ring-[#5A7D5C] ring-offset-2' : 'border-gray-200'}`}
                                            style={{
                                                backgroundColor: color.hex,
                                                backgroundImage: color.image ? `url(${color.image})` : 'none',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-medium text-[#333333]">Size</h3>
                                <button
                                    onClick={() => setShowSizeChart(true)}
                                    className="text-sm text-[#5A7D5C] underline flex items-center gap-1"
                                >
                                    Size Chart ✏️
                                </button>
                            </div>
                            <div className={`grid gap-3 ${product.sizes[0].length > 5 ? 'grid-cols-1' : 'grid-cols-4'}`}>
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 px-4 border rounded-md text-sm font-medium transition-colors ${selectedSize === size ? 'bg-[#5A7D5C] text-white border-[#5A7D5C]' : 'border-gray-300 text-[#333333] hover:border-[#5A7D5C]'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <h3 className="font-medium text-[#333333] mb-3">Quantity</h3>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-[#5A7D5C]"><FiMinus /></button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-[#5A7D5C]"><FiPlus /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-[#E8B4B8] text-[#333333] py-4 rounded-md font-bold hover:bg-[#d8a4a4] transition-colors shadow-lg transform hover:-translate-y-1"
                        >
                            ADD TO CART
                        </button>
                        <button className="w-full bg-[#D4AF37] text-white py-4 rounded-md font-bold hover:bg-[#c4a030] transition-colors shadow-lg transform hover:-translate-y-1">
                            BUY IT NOW
                        </button>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 pt-6">
                        {product.includesEarrings && (
                            <div className="bg-[#F8F6F1] p-4 rounded-md border border-[#5A7D5C]/20">
                                <p className="text-[#5A7D5C] font-medium flex items-center gap-2">
                                    ✨ Includes Matching Fabric Earrings
                                </p>
                            </div>
                        )}
                        <div className="prose prose-sm text-gray-600">
                            <p><strong>Fabric:</strong> {product.fabric}</p>
                        </div>
                    </div>

                    {/* Expandable Sections */}
                    <div className="border-t border-gray-200 pt-6 space-y-4">
                        <details className="group border-b border-gray-100 pb-4 last:border-0" open>
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#333333] hover:text-[#5A7D5C] transition-colors">
                                <span>Description</span>
                                <span className="transition-transform duration-300 group-open:rotate-180"><FiPlus /></span>
                            </summary>
                            <div className="text-gray-600 mt-3 group-open:animate-fadeIn text-sm leading-relaxed whitespace-pre-line">
                                {product.description}
                            </div>
                        </details>

                        <details className="group border-b border-gray-100 pb-4 last:border-0">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#333333] hover:text-[#5A7D5C] transition-colors">
                                <span>Wash Care</span>
                                <span className="transition-transform duration-300 group-open:rotate-180"><FiPlus /></span>
                            </summary>
                            <div className="text-gray-600 mt-3 group-open:animate-fadeIn text-sm leading-relaxed">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Machine wash with like colors</li>
                                    <li>Do not bleach</li>
                                    <li>Tumble dry medium</li>
                                    <li>Iron low</li>
                                    <li>Dry clean</li>
                                </ul>
                            </div>
                        </details>

                        <details className="group border-b border-gray-100 pb-4 last:border-0">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#333333] hover:text-[#5A7D5C] transition-colors">
                                <span>Shipping & Taxes</span>
                                <span className="transition-transform duration-300 group-open:rotate-180"><FiPlus /></span>
                            </summary>
                            <div className="text-gray-600 mt-3 group-open:animate-fadeIn text-sm leading-relaxed">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Orders are processed within 1-3 business days</li>
                                    <li>Estimated delivery within India: 7-10 business days</li>
                                    <li>International orders: 15-20 business days depending on location</li>
                                    <li>Shipping charges are calculated at checkout based on weight, size, and destination</li>
                                    <li>Free shipping may be offered on select orders or during promotional periods</li>
                                    <li>Taxes included (as indicated on product pages)</li>
                                </ul>
                            </div>
                        </details>

                        <details className="group border-b border-gray-100 pb-4 last:border-0">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#333333] hover:text-[#5A7D5C] transition-colors">
                                <span>Customer Care</span>
                                <span className="transition-transform duration-300 group-open:rotate-180"><FiPlus /></span>
                            </summary>
                            <div className="text-gray-600 mt-3 group-open:animate-fadeIn text-sm leading-relaxed">
                                <p className="mb-2"><strong>Email:</strong> ekramoriginal09@gmail.com</p>
                                <p className="mb-2"><strong>Phone:</strong> 9090131513</p>
                                <p className="mb-2"><strong>Address:</strong> G-1 104/105 Bhoomi Park Phase 2, Malad [west] Mumbai 400095</p>
                                <p className="mb-2">Available 24/7 – we're just a message away, any day, any time</p>
                                <p>We do our best to respond to all inquiries within 24–48 hours</p>
                            </div>
                        </details>

                        <details className="group border-b border-gray-100 pb-4 last:border-0">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#333333] hover:text-[#5A7D5C] transition-colors">
                                <span>Returns & Exchange</span>
                                <span className="transition-transform duration-300 group-open:rotate-180"><FiPlus /></span>
                            </summary>
                            <div className="text-gray-600 mt-3 group-open:animate-fadeIn text-sm leading-relaxed">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Returns are accepted only for defective, damaged, or incorrect items</li>
                                    <li>Return Window: Must raise request within 3 days of receiving order</li>
                                    <li>Item must be unused, with original packaging and tags intact</li>
                                    <li>Returns are only accepted when the complimentary matching fabric earrings are included</li>
                                    <li>Size issues can be returned or exchanged</li>
                                    <li>Customized, altered, or made-to-order items are NOT eligible for return</li>
                                    <li>Gift cards, accessories, and clearance items are not eligible for return</li>
                                    <li>Requests made after 3 days will not be accepted</li>
                                    <li><strong>Return Process:</strong> Contact customer service with order details and photos → Once approved, receive return instructions → Item must be unused with original packaging</li>
                                    <li><strong>Return Shipping:</strong> Customers are responsible for return shipping costs unless item was damaged or incorrect</li>
                                    <li><strong>Exchanges:</strong> Only for same item in different size or color (subject to availability)</li>
                                </ul>
                            </div>
                        </details>

                        <details className="group border-b border-gray-100 pb-4 last:border-0">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-[#333333] hover:text-[#5A7D5C] transition-colors">
                                <span>Refund Policy</span>
                                <span className="transition-transform duration-300 group-open:rotate-180"><FiPlus /></span>
                            </summary>
                            <div className="text-gray-600 mt-3 group-open:animate-fadeIn text-sm leading-relaxed">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Once we receive and inspect the returned item, we will notify you of the refund approval</li>
                                    <li>Approved refunds will be processed to your original method of payment within 7–10 business days</li>
                                    <li><strong>Return Shipping Costs:</strong> Customers responsible unless item was damaged or incorrect</li>
                                    <li><strong>Non-Refundable Items:</strong> Gift cards, accessories, and clearance items</li>
                                </ul>
                            </div>
                        </details>
                    </div>
                </div>
            </div>

            {/* Size Chart Modal */}
            {showSizeChart && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSizeChart(false)}>
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold font-serif">Size Chart</h2>
                            <button onClick={() => setShowSizeChart(false)} className="text-gray-500 hover:text-black">✕</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-700 font-bold uppercase">
                                    <tr>
                                        <th className="px-6 py-3">Size</th>
                                        <th className="px-6 py-3">Bust (INCHES)</th>
                                        <th className="px-6 py-3">Waist (INCHES)</th>
                                        <th className="px-6 py-3">Hip (INCHES)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        { size: 'XS', bust: '32"', waist: '28"', hip: '34"' },
                                        { size: 'S', bust: '34"', waist: '30"', hip: '36"' },
                                        { size: 'M', bust: '36"', waist: '32"', hip: '38"' },
                                        { size: 'L', bust: '38"', waist: '34"', hip: '40"' },
                                        { size: 'XL', bust: '40"', waist: '36"', hip: '42"' },
                                        { size: '2XL', bust: '42"', waist: '38"', hip: '44"' },
                                        { size: '3XL', bust: '44"', waist: '40"', hip: '48"' },
                                    ].map((row) => (
                                        <tr key={row.size} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium">{row.size}</td>
                                            <td className="px-6 py-4">{row.bust}</td>
                                            <td className="px-6 py-4">{row.waist}</td>
                                            <td className="px-6 py-4">{row.hip}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 text-right">
                            <p className="text-xs text-gray-500">Powered by Kiwi Sizing</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Section - Only show if there are reviews */}
            {reviewsData && reviewsData.count > 0 && (
                <div className="mt-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-serif text-3xl font-bold text-[#333333]">Customer Reviews</h2>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.round(reviewsData.averageRating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {reviewsData.averageRating} out of 5 ({reviewsData.count} {reviewsData.count === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div key={review._id} className="border border-gray-200 rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold text-[#333333]">{review.userName}</p>
                                            {review.verified && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Verified Purchase</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <h4 className="font-bold text-[#333333] mb-2">{review.title}</h4>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Related Products */}
            <div className="mt-20">
                <h2 className="font-serif text-3xl font-bold text-[#333333] mb-8">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
}
