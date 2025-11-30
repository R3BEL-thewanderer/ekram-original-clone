'use client';

import { useCartStore, useCurrencyStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
    const { symbol, rate } = useCurrencyStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <h1 className="font-serif text-3xl font-bold text-[#333333]">Your Cart is Empty</h1>
                <Link href="/collections/all" className="text-[#5A7D5C] font-medium hover:text-[#D4AF37] underline">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="font-serif text-4xl font-bold text-[#333333] mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {items.map((item) => (
                        <div key={`${item.slug}-${item.color}-${item.size}`} className="flex gap-6 border-b border-gray-200 pb-6">
                            <div className="relative w-24 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="font-medium text-lg text-[#333333]">{item.name}</h3>
                                        <p className="font-medium text-[#333333]">{symbol}{(item.price * item.quantity * rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                                    <div className="mt-2 text-sm text-gray-600">
                                        <p>Color: {item.color}</p>
                                        <p>Size: {item.size}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.slug, item.color, item.size, Math.max(1, item.quantity - 1))}
                                            className="p-2 hover:text-[#5A7D5C]"
                                        >
                                            <FiMinus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.slug, item.color, item.size, item.quantity + 1)}
                                            className="p-2 hover:text-[#5A7D5C]"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.slug, item.color, item.size)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-[#F8F6F1] p-6 rounded-lg border border-[#5A7D5C]/20 sticky top-24">
                        <h2 className="font-serif text-xl font-bold text-[#333333] mb-6">Order Summary</h2>
                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{symbol}{(getCartTotal() * rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-[#5A7D5C] font-medium">Free</span>
                            </div>
                            <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg text-[#333333]">
                                <span>Total</span>
                                <span>{symbol}{(getCartTotal() * rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="block w-full bg-[#333333] text-white text-center py-4 rounded-md font-medium mt-8 hover:bg-black transition-colors shadow-lg"
                        >
                            PROCEED TO CHECKOUT
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
