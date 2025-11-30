'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiUser, FiPackage, FiMapPin, FiLogOut, FiShoppingBag } from 'react-icons/fi';

export default function AccountPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        // Check if user is logged in
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                console.error('Failed to parse user data');
            }
        }
    }, []);

    if (!mounted) return null;

    // If user is logged in, show dashboard
    if (user) {
        return <AccountDashboard user={user} />;
    }

    // Otherwise show login/signup
    return (
        <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-[#F8F6F1]">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-[#5A7D5C]/10">
                {/* Header Toggle */}
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-4 text-center font-serif font-bold text-lg transition-colors ${isLogin ? 'bg-[#5A7D5C] text-white' : 'text-gray-500 hover:text-[#5A7D5C] hover:bg-gray-50'}`}
                    >
                        LOGIN
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-4 text-center font-serif font-bold text-lg transition-colors ${!isLogin ? 'bg-[#5A7D5C] text-white' : 'text-gray-500 hover:text-[#5A7D5C] hover:bg-gray-50'}`}
                    >
                        SIGN UP
                    </button>
                </div>

                <div className="p-8">
                    <motion.div
                        key={isLogin ? 'login' : 'signup'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isLogin ? <LoginForm /> : <SignupForm />}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function AccountDashboard({ user }) {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`/api/users/orders?userId=${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        window.dispatchEvent(new Event('storage'));
        router.push('/');
    };

    return (
        <div className="min-h-[80vh] py-12 px-4 bg-[#F8F6F1]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="font-serif text-3xl font-bold text-[#333333] mb-2">Welcome back, {user.firstName}!</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-500 border border-red-200 rounded hover:bg-red-50 transition-colors"
                        >
                            <FiLogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link href="/pages/track-order" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#5A7D5C]/10 rounded-full flex items-center justify-center">
                                <FiPackage size={24} className="text-[#5A7D5C]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#333333]">My Orders</h3>
                                <p className="text-sm text-gray-500">{orders.length} order(s)</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/collections/all" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                                <FiShoppingBag size={24} className="text-[#D4AF37]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#333333]">Shop Now</h3>
                                <p className="text-sm text-gray-500">Browse products</p>
                            </div>
                        </div>
                    </Link>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <FiUser size={24} className="text-gray-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#333333]">Account Info</h3>
                                <p className="text-sm text-gray-500">View details</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#333333] mb-6">Recent Orders</h2>
                    {loading ? (
                        <p className="text-gray-500 text-center py-8">Loading orders...</p>
                    ) : orders.length > 0 ? (
                        <div className="space-y-4">
                            {orders.slice(0, 5).map((order) => (
                                <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:border-[#5A7D5C] transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-bold text-[#333333]">Order #{order.orderId}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">
                                            {order.items?.length || 0} item(s) • ₹{order.total?.toLocaleString('en-IN')}
                                        </p>
                                        <Link href="/pages/track-order" className="text-[#5A7D5C] text-sm font-bold hover:underline">
                                            Track Order →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {orders.length > 5 && (
                                <Link href="/pages/track-order" className="block text-center text-[#5A7D5C] font-medium hover:underline mt-4">
                                    View All Orders →
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FiPackage size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 mb-4">No orders yet</p>
                            <Link href="/collections/all" className="inline-block bg-[#333333] text-white px-6 py-3 rounded font-medium hover:bg-black transition-colors">
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// LoginForm and SignupForm remain the same...
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Check if admin
                if (data.isAdmin) {
                    localStorage.setItem('isAdmin', 'true');
                    window.dispatchEvent(new Event('storage'));
                    router.push('/admin/orders');
                } else {
                    // Regular user login
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.dispatchEvent(new Event('storage'));
                    window.location.reload(); // Reload to show dashboard
                }
            } else {
                setError(data.error || 'Invalid email or password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C] focus:ring-1 focus:ring-[#5A7D5C]"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <a href="#" className="text-xs text-[#5A7D5C] hover:underline">Forgot Password?</a>
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C] focus:ring-1 focus:ring-[#5A7D5C] pr-10"
                        placeholder="Enter your password"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#5A7D5C]"
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
            </div>
            {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded text-center border border-red-100">
                    {error}
                </div>
            )}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#333333] text-white py-4 rounded font-bold hover:bg-black transition-colors shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
        </form>
    );
}

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    window.location.reload(); // Reload to show login form
                }, 1500);
            } else {
                setError(data.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C] focus:ring-1 focus:ring-[#5A7D5C]"
                        placeholder="First Name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C] focus:ring-1 focus:ring-[#5A7D5C]"
                        placeholder="Last Name"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C] focus:ring-1 focus:ring-[#5A7D5C]"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C] focus:ring-1 focus:ring-[#5A7D5C] pr-10"
                        placeholder="Create a password"
                        required
                        minLength={6}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#5A7D5C]"
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>
            {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded text-center border border-red-100">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-50 text-green-600 text-sm p-3 rounded text-center border border-green-100">
                    {success}
                </div>
            )}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#333333] text-white py-4 rounded font-bold hover:bg-black transition-colors shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
        </form>
    );
}
