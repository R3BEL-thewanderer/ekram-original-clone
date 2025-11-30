'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Set a local storage flag for the UI to know we are admin
                localStorage.setItem('isAdmin', 'true');
                // Dispatch a custom event so Navbar updates immediately
                window.dispatchEvent(new Event('storage'));
                router.push('/admin/orders');
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
        <div className="min-h-[60vh] flex items-center justify-center bg-[#F8F6F1]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-100">
                <h1 className="text-2xl font-serif font-bold text-[#333333] mb-6 text-center">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Admin Email"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Admin Password"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C] pr-10"
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
                        className="w-full bg-[#333333] text-white py-3 rounded font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'LOGGING IN...' : 'LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    );
}
