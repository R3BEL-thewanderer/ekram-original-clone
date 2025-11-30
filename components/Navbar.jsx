'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, useCurrencyStore } from '@/lib/store';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const cartItems = useCartStore((state) => state.items);
    const [mounted, setMounted] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
    const { currency, setCurrency, symbol, rate } = useCurrencyStore();
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');

        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                console.error('Failed to parse user data');
            }
        }

        // Listen for storage events to update admin status immediately
        const handleStorageChange = () => {
            setIsAdmin(localStorage.getItem('isAdmin') === 'true');
            const userData = localStorage.getItem('user');
            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (e) {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/collections/all?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-[#F8F6F1]/90 backdrop-blur-md border-b border-[#5A7D5C]/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Mobile Menu Button - Hover to open */}
                        <div
                            className="md:hidden flex items-center"
                            onMouseEnter={() => setIsOpen(true)}
                        >
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-[#333333] hover:text-[#5A7D5C] transition-colors p-2"
                            >
                                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>

                        {/* Logo */}
                        <div className={`flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start transition-all duration-300 ${isSearchOpen ? 'w-12' : ''}`}>
                            <Link href="/" className="flex items-center gap-2">
                                <div className="relative w-12 h-12">
                                    <Image src="/logo.png" alt="EKRAM ORIGINAL" fill className="object-contain" />
                                </div>
                                <span className={`font-serif text-2xl font-bold text-[#5A7D5C] tracking-wider hidden md:block transition-all duration-300 ${isSearchOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                                    EKRAM ORIGINAL
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu - Shrinks when search is open */}
                        <div className={`hidden md:flex items-center transition-all duration-300 ${isSearchOpen ? 'space-x-4 text-sm' : 'space-x-8'}`}>
                            <Link href="/" className="text-[#333333] hover:text-[#5A7D5C] transition-colors font-medium">Home</Link>
                            <div
                                className="relative h-full flex items-center"
                                onMouseEnter={() => setIsCollectionsOpen(true)}
                                onMouseLeave={() => setIsCollectionsOpen(false)}
                            >
                                <button
                                    className="text-[#333333] hover:text-[#5A7D5C] transition-colors font-medium flex items-center gap-1 h-full"
                                    onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                                >
                                    Collections
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${isCollectionsOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Transparent bridge to prevent closing when moving mouse to dropdown */}
                                <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>

                                <div
                                    className={`absolute top-[calc(100%+0.5rem)] left-0 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100 z-50 transition-all duration-200 origin-top-left
                                    ${isCollectionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                                >
                                    <Link href="/collections/kurti-tops" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F8F6F1] hover:text-[#5A7D5C] transition-colors">Kurti/Tops</Link>
                                    <Link href="/collections/co-ord-sets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F8F6F1] hover:text-[#5A7D5C] transition-colors">Co-Ord Sets</Link>
                                    <Link href="/collections/boho-pants" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F8F6F1] hover:text-[#5A7D5C] transition-colors">Boho Pants</Link>
                                    <Link href="/collections/all" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F8F6F1] hover:text-[#5A7D5C] transition-colors">All Products</Link>
                                </div>
                            </div>
                            <Link href="/pages/about-us" className="text-[#333333] hover:text-[#5A7D5C] transition-colors font-medium">About Us</Link>
                            <Link href="/pages/contact-us" className="text-[#333333] hover:text-[#5A7D5C] transition-colors font-medium">Contact</Link>
                            <Link href="/pages/track-order" className="text-[#333333] hover:text-[#5A7D5C] transition-colors font-medium">Track Order</Link>
                            {mounted && isAdmin && (
                                <Link href="/admin/orders" className="text-[#D4AF37] hover:text-[#5A7D5C] transition-colors font-bold">New Orders</Link>
                            )}
                        </div>

                        {/* Icons & Search Bar */}
                        <div className="flex items-center space-x-6 relative">
                            {/* Currency Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                    className="text-[#333333] hover:text-[#5A7D5C] transition-colors font-medium text-sm flex items-center gap-1"
                                >
                                    {currency}
                                    <svg
                                        className={`w-3 h-3 transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isCurrencyOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-24 bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100">
                                        {['INR', 'USD', 'GBP', 'EUR'].map((curr) => (
                                            <button
                                                key={curr}
                                                onClick={() => {
                                                    setCurrency(curr);
                                                    setIsCurrencyOpen(false);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#F8F6F1] hover:text-[#5A7D5C] transition-colors ${currency === curr ? 'font-bold text-[#5A7D5C]' : 'text-gray-700'}`}
                                            >
                                                {curr}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Expandable Search Bar */}
                            <div
                                className="flex items-center"
                                onMouseEnter={() => setIsSearchOpen(true)}
                                onMouseLeave={() => {
                                    if (!searchQuery) setIsSearchOpen(false);
                                }}
                            >
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: isSearchOpen ? 300 : 0, opacity: isSearchOpen ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-visible mr-2 relative"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            if (e.target.value.length > 1) {
                                                fetch(`/api/products?search=${e.target.value}&limit=5`)
                                                    .then(res => res.json())
                                                    .then(data => setSuggestions(data));
                                            } else {
                                                setSuggestions([]);
                                            }
                                        }}
                                        onKeyDown={handleKeyDown}
                                        className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:border-[#5A7D5C] text-sm"
                                    />
                                    {/* Search Suggestions Dropdown */}
                                    {suggestions.length > 0 && isSearchOpen && (
                                        <>
                                            <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                                            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 py-2 z-50 border border-gray-100">
                                                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Products</div>
                                                {suggestions.map((product) => (
                                                    <Link
                                                        key={product._id}
                                                        href={`/products/${product.slug}`}
                                                        className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
                                                        onClick={() => {
                                                            setIsSearchOpen(false);
                                                            setSuggestions([]);
                                                        }}
                                                    >
                                                        <div className="relative w-10 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden mr-3">
                                                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-[#333333]">{product.name}</p>
                                                            <p className="text-xs text-[#5A7D5C]">{symbol}{(product.price * rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                                <button
                                                    onClick={handleSearch}
                                                    className="w-full text-left px-4 py-2 text-xs text-[#5A7D5C] font-bold border-t border-gray-100 hover:bg-gray-50"
                                                >
                                                    Search for &quot;{searchQuery}&quot; &rarr;
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                                <button
                                    onClick={handleSearch}
                                    className="text-[#333333] hover:text-[#5A7D5C] transition-colors"
                                >
                                    <FiSearch size={20} />
                                </button>
                            </div>


                            {/* User Account with Dropdown */}
                            <div className="relative group">
                                <Link href="/account" className="text-[#333333] hover:text-[#5A7D5C] transition-colors">
                                    <FiUser size={20} />
                                </Link>

                                {/* User Dropdown */}
                                {mounted && user && (
                                    <div className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-lg p-4 hidden group-hover:block transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                        <div className="border-b pb-3 mb-3">
                                            <p className="text-sm font-bold text-[#333333]">Hi, {user.firstName}!</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link href="/pages/track-order" className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#F8F6F1] hover:text-[#5A7D5C] rounded transition-colors">
                                            My Orders
                                        </Link>
                                        <Link href="/account" className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#F8F6F1] hover:text-[#5A7D5C] rounded transition-colors">
                                            Account Settings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('user');
                                                localStorage.removeItem('isAdmin');
                                                window.dispatchEvent(new Event('storage'));
                                                window.location.href = '/';
                                            }}
                                            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded transition-colors mt-2 border-t pt-3"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>


                            {/* Cart with Hover Preview */}
                            <div className="relative group">
                                <Link href="/cart" className="text-[#333333] hover:text-[#5A7D5C] transition-colors relative block">
                                    <FiShoppingBag size={20} />
                                    {mounted && cartItems.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>

                                {/* Cart Hover Preview Dropdown */}
                                <div className="absolute top-full right-0 w-72 bg-white shadow-xl rounded-lg p-4 hidden group-hover:block transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                                    <h3 className="font-serif font-bold text-[#333333] mb-3 border-b pb-2">Cart Preview</h3>
                                    {mounted && cartItems.length > 0 ? (
                                        <div className="space-y-4">
                                            {cartItems.slice(-2).reverse().map((item, idx) => (
                                                <div key={`${item.slug}-${idx}`} className="flex gap-3">
                                                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                                                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-[#333333] truncate">{item.name}</p>
                                                        <p className="text-xs text-gray-500">{item.size} | {item.color}</p>
                                                        <p className="text-sm font-bold text-[#5A7D5C]">{symbol}{(item.price * rate).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {cartItems.length > 2 && (
                                                <p className="text-xs text-center text-gray-500 pt-2">and {cartItems.length - 2} more items...</p>
                                            )}
                                            <Link href="/cart" className="block w-full bg-[#333333] text-white text-center py-2 rounded text-sm font-bold hover:bg-black transition-colors mt-3">
                                                VIEW CART
                                            </Link>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">Your cart is empty.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Sidebar & Backdrop - Moved outside nav to avoid backdrop-filter issues */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black z-[60] md:hidden"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[70] md:hidden overflow-y-auto"
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            {/* Sidebar Header */}
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#F8F6F1]">
                                <span className="font-serif text-xl font-bold text-[#5A7D5C]">MENU</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="py-4">
                                <Link href="/" onClick={() => setIsOpen(false)} className="block px-6 py-3 text-base font-medium text-[#333333] hover:bg-[#F8F6F1] hover:text-[#5A7D5C] border-l-4 border-transparent hover:border-[#5A7D5C] transition-all">
                                    Home
                                </Link>

                                {/* Mobile Collections Dropdown */}
                                <div className="px-6 py-3">
                                    <div className="text-base font-medium text-[#333333] mb-2">Collections</div>
                                    <div className="pl-4 space-y-1 border-l-2 border-[#5A7D5C]/20">
                                        <Link href="/collections/kurti-tops" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#5A7D5C] hover:bg-[#F8F6F1] rounded-md transition-colors">Kurti/Tops</Link>
                                        <Link href="/collections/co-ord-sets" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#5A7D5C] hover:bg-[#F8F6F1] rounded-md transition-colors">Co-Ord Sets</Link>
                                        <Link href="/collections/boho-pants" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#5A7D5C] hover:bg-[#F8F6F1] rounded-md transition-colors">Boho Pants</Link>
                                        <Link href="/collections/all" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#5A7D5C] hover:bg-[#F8F6F1] rounded-md transition-colors">All Products</Link>
                                    </div>
                                </div>

                                <Link href="/pages/about-us" onClick={() => setIsOpen(false)} className="block px-6 py-3 text-base font-medium text-[#333333] hover:bg-[#F8F6F1] hover:text-[#5A7D5C] border-l-4 border-transparent hover:border-[#5A7D5C] transition-all">
                                    About Us
                                </Link>
                                <Link href="/pages/contact-us" onClick={() => setIsOpen(false)} className="block px-6 py-3 text-base font-medium text-[#333333] hover:bg-[#F8F6F1] hover:text-[#5A7D5C] border-l-4 border-transparent hover:border-[#5A7D5C] transition-all">
                                    Contact
                                </Link>
                                <Link href="/pages/track-order" onClick={() => setIsOpen(false)} className="block px-6 py-3 text-base font-medium text-[#333333] hover:bg-[#F8F6F1] hover:text-[#5A7D5C] border-l-4 border-transparent hover:border-[#5A7D5C] transition-all">
                                    Track Order
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
