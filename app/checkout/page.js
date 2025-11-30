'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { items, getCartTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (items.length === 0 && step !== 3) {
        return <div className="p-12 text-center">Your cart is empty.</div>;
    }

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Get logged-in user
            const userData = localStorage.getItem('user');
            let userId = null;
            if (userData) {
                try {
                    const user = JSON.parse(userData);
                    userId = user.id;
                } catch (e) {
                    console.error('Failed to parse user data');
                }
            }

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId, // Include user ID if logged in
                    items,
                    shippingAddress: data,
                    subtotal: getCartTotal(),
                    tax: 0,
                    total: getCartTotal(),
                }),
            });

            if (res.ok) {
                const order = await res.json();
                setOrderId(order.orderId);
                clearCart();
                setStep(3);
            } else {
                alert('Failed to place order');
            }
        } catch (error) {
            console.error(error);
            alert('Error placing order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="mb-8 flex justify-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#5A7D5C] text-white' : 'bg-gray-200'}`}>1</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#5A7D5C] text-white' : 'bg-gray-200'}`}>2</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#5A7D5C] text-white' : 'bg-gray-200'}`}>3</div>
            </div>

            {step === 1 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-2xl font-serif font-bold">Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input {...register('name', { required: true })} placeholder="Full Name" className="p-3 border rounded w-full" />
                        <input {...register('email', { required: true })} placeholder="Email" type="email" className="p-3 border rounded w-full" />
                        <input {...register('phone', { required: true })} placeholder="Phone" className="p-3 border rounded w-full" />
                        <input {...register('address', { required: true })} placeholder="Address" className="p-3 border rounded w-full md:col-span-2" />
                        <input {...register('city', { required: true })} placeholder="City" className="p-3 border rounded w-full" />
                        <input {...register('postalCode', { required: true })} placeholder="Postal Code" className="p-3 border rounded w-full" />
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-serif font-bold mb-4">Order Review</h2>
                        <div className="space-y-2 mb-4">
                            {items.map(item => (
                                <div key={`${item.slug}-${item.color}-${item.size}`} className="flex justify-between text-sm">
                                    <span>{item.name} ({item.size}, {item.color}) x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                            <div className="border-t pt-2 font-bold flex justify-between">
                                <span>Total</span>
                                <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#333333] text-white py-4 rounded font-medium hover:bg-black transition-colors"
                        >
                            {loading ? 'Processing...' : 'PLACE ORDER'}
                        </button>
                    </div>
                </form>
            )}

            {step === 3 && (
                <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#333333]">Order Confirmed!</h2>
                    <p className="text-gray-600">Thank you for your purchase. Your order ID is:</p>
                    <div className="bg-gray-100 p-4 rounded text-xl font-mono font-bold select-all">
                        {orderId}
                    </div>
                    <p className="text-sm text-gray-500">Use this ID to track your order.</p>
                    <button onClick={() => router.push('/')} className="text-[#5A7D5C] font-medium underline">
                        Return to Home
                    </button>
                </div>
            )}
        </div>
    );
}
