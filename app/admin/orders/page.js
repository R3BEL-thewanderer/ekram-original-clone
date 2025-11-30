'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Simple client-side check
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            router.push('/admin/login');
            return;
        }
        fetchOrders();
    }, [router]);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch('/api/admin/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus }),
            });

            if (res.ok) {
                // Refresh orders locally
                setOrders(orders.map(order =>
                    order.orderId === orderId ? { ...order, status: newStatus } : order
                ));
            }
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    const statusOptions = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

    if (loading) return <div className="p-12 text-center">Loading orders...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-[#333333]">Order Management</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem('isAdmin');
                        window.dispatchEvent(new Event('storage'));
                        router.push('/');
                    }}
                    className="text-red-500 hover:underline text-sm font-medium"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{order.orderId}</td>
                                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{order.shippingAddress?.name}</div>
                                        <div className="text-xs text-gray-500">{order.shippingAddress?.email}</div>
                                    </td>
                                    <td className="px-6 py-4">₹{order.total?.toLocaleString('en-IN')}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.orderId, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#5A7D5C]"
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
