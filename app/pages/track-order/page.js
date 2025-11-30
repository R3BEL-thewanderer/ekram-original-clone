'use client';

import { useState, useEffect } from 'react';

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get logged-in user
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                // Fetch user's orders
                fetchUserOrders(parsedUser.id);
            } catch (e) {
                console.error('Failed to parse user data');
            }
        }
    }, []);

    const fetchUserOrders = async (userId) => {
        try {
            const res = await fetch(`/api/users/orders?userId=${userId}`);
            if (res.ok) {
                const data = await res.json();
                setUserOrders(data);
            }
        } catch (err) {
            console.error('Failed to fetch user orders:', err);
        }
    };

    const handleTrack = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/track?orderId=${orderId}`);
            if (!res.ok) {
                throw new Error('Order not found');
            }
            const data = await res.json();
            setOrder(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const viewOrder = (orderData) => {
        setOrder(orderData);
        setOrderId(orderData.orderId);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-[60vh]">
            <h1 className="font-serif text-4xl font-bold text-[#333333] mb-2 text-center">Track Order</h1>
            <h3 className="font-serif text-xl font-medium text-[#333333] mb-6 text-center">Real-Time Order Tracking</h3>

            {/* Manual Order Tracking */}
            <div className="max-w-md mx-auto mb-12">
                <p className="text-center text-gray-600 mb-8">
                    Enter your tracking number to monitor your delivery in real-time and stay updated on your package status.
                </p>

                <form onSubmit={handleTrack} className="mb-8">
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Your Tracking Number:</label>
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID"
                            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#333333] text-white px-8 py-4 rounded font-medium hover:bg-black transition-colors"
                    >
                        {loading ? 'TRACKING...' : 'TRACK'}
                    </button>
                </form>

                <div className="text-center space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="font-bold text-[#333333] mb-2">Need help?</p>
                        <p className="text-gray-600">
                            Contact us at <a href="mailto:contact@ekramoriginal.com" className="text-[#5A7D5C] hover:underline">contact@ekramoriginal.com</a> or call <a href="tel:9090131513" className="text-[#5A7D5C] hover:underline">9090131513</a>
                        </p>
                    </div>

                    <div className="text-left">
                        <p className="font-bold text-[#333333] mb-2">Typical Delivery Timeline:</p>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                            <li>India: 7-10 business days</li>
                            <li>International: 15-20 business days</li>
                        </ul>
                    </div>
                </div>
            </div>

            {error && (
                <div className="max-w-md mx-auto mb-8 bg-red-100 text-red-700 p-4 rounded text-center">
                    {error}
                </div>
            )}

            {/* User's Orders - Show if logged in */}
            {user && userOrders.length > 0 && !order && (
                <div className="mb-12">
                    <h2 className="font-serif text-2xl font-bold text-[#333333] mb-6 text-center">My Orders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userOrders.map((userOrder) => (
                            <div key={userOrder._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-bold text-lg text-[#333333]">Order #{userOrder.orderId}</p>
                                        <p className="text-sm text-gray-500">{new Date(userOrder.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${userOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        userOrder.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {userOrder.status}
                                    </span>
                                </div>
                                <div className="border-t pt-4">
                                    <p className="text-sm text-gray-600 mb-2">
                                        {userOrder.items?.length || 0} item(s) • ₹{userOrder.total?.toLocaleString('en-IN')}
                                    </p>
                                    <button
                                        onClick={() => viewOrder(userOrder)}
                                        className="text-[#5A7D5C] text-sm font-bold hover:underline"
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Order Details - Show when order is selected */}
            {order && (
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#333333]">Order #{order.orderId}</h2>
                            <p className="text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-[#5A7D5C]">{order.status}</p>
                            <p className="text-sm text-gray-500">Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative flex justify-between mb-12">
                        {['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, idx) => {
                            const currentStepIdx = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(order.status);
                            const isCompleted = idx <= currentStepIdx;

                            return (
                                <div key={step} className="flex flex-col items-center relative z-10 w-1/5">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${isCompleted ? 'bg-[#5A7D5C] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        {idx + 1}
                                    </div>
                                    <span className={`text-xs text-center ${isCompleted ? 'text-[#333333] font-medium' : 'text-gray-400'}`}>{step}</span>
                                </div>
                            );
                        })}
                        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-0">
                            <div
                                className="h-full bg-[#5A7D5C] transition-all duration-500"
                                style={{ width: `${(['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(order.status) / 4) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="font-bold mb-4">Items</h3>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{order.total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    {/* Add Review Button for Delivered Orders */}
                    {order.status === 'Delivered' && user && (
                        <div className="border-t mt-6 pt-6">
                            <h3 className="font-bold mb-4">Received your order?</h3>
                            <p className="text-sm text-gray-600 mb-4">Share your experience and help other customers make informed decisions.</p>
                            <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                    <ReviewButton
                                        key={idx}
                                        productName={item.name}
                                        productId={item._id || item.id}
                                        orderId={order._id}
                                        userId={user.id}
                                        userName={`${user.firstName} ${user.lastName}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {user && (
                        <button
                            onClick={() => setOrder(null)}
                            className="mt-6 text-[#5A7D5C] font-medium hover:underline"
                        >
                            ← Back to My Orders
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

// Review Button Component
function ReviewButton({ productName, productId, orderId, userId, userName }) {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    userId,
                    orderId,
                    userName,
                    rating,
                    title,
                    comment
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setHasReviewed(true);
                setTimeout(() => {
                    setShowModal(false);
                    setSuccess(false);
                }, 2000);
            } else {
                setError(data.error || 'Failed to submit review');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (hasReviewed) {
        return (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                <span className="text-sm text-green-700">✓ Review submitted for {productName}</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm font-medium">{productName}</span>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-[#5A7D5C] text-sm font-bold hover:underline"
                >
                    Write a Review
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="font-serif text-2xl font-bold text-[#333333] mb-4">Write a Review</h2>
                        <p className="text-sm text-gray-600 mb-4">for {productName}</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-3xl ${star <= rating ? 'text-[#D4AF37]' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C]"
                                    placeholder="Sum up your experience"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C]"
                                    rows="4"
                                    placeholder="Tell us about your experience with this product"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-500 text-sm p-3 rounded">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-50 text-green-600 text-sm p-3 rounded">
                                    Review submitted successfully!
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded font-medium hover:bg-gray-50"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-[#333333] text-white rounded font-medium hover:bg-black disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
