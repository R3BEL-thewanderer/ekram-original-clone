import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[#5A7D5C] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl font-bold text-[#D4AF37]">EKRAM ORIGINAL</h3>
                        <p className="text-gray-200 text-sm leading-relaxed">
                            Heritage meets modern fashion. A legacy woven by three generations of women.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors"><FaFacebookF /></a>
                            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors"><FaInstagram /></a>
                            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors"><FaTwitter /></a>
                            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors"><FaPinterest /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6 text-[#D4AF37]">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-200">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/collections/all" className="hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link href="/pages/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/pages/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/pages/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6 text-[#D4AF37]">Policies</h4>
                        <ul className="space-y-3 text-sm text-gray-200">
                            <li><Link href="/policies/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/policies/returns" className="hover:text-white transition-colors">Returns & Exchange</Link></li>
                            <li><Link href="/policies/cancellation" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
                            <li><Link href="/policies/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-6 text-[#D4AF37]">Newsletter</h4>
                        <p className="text-sm text-gray-200 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 bg-[#4a6b4c] border border-[#6b8c6d] rounded focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-300"
                            />
                            <button className="px-4 py-2 bg-[#D4AF37] text-white font-medium rounded hover:bg-[#c4a030] transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-[#6b8c6d] mt-12 pt-8 text-center text-sm text-gray-300">
                    <p>&copy; {new Date().getFullYear()} EKRAM ORIGINAL. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
