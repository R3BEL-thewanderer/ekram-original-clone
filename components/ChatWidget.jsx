'use client';

import { useState } from 'react';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) return;

        // Format the message for WhatsApp
        const phoneNumber = '919090131513'; // Using the number from the footer
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        // Clear input and close (optional)
        setMessage('');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="bg-[#5A7D5C] p-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold font-serif">Ekram Original</h3>
                                <p className="text-white/80 text-xs">Typically replies within an hour</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 bg-[#F8F6F1] h-64 overflow-y-auto flex flex-col gap-3">
                            <div className="bg-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-sm self-start max-w-[85%]">
                                <p className="text-sm text-gray-700">
                                    Hello! 👋 <br />
                                    Welcome to Ekram Original. How can we help you with your order or styling today?
                                </p>
                                <span className="text-[10px] text-gray-400 mt-1 block">Just now</span>
                            </div>
                        </div>

                        {/* Footer / Input */}
                        <div className="p-3 bg-white border-t border-gray-100">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#5A7D5C] focus:bg-white transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-[#5A7D5C] text-white p-2 rounded-full hover:bg-[#4a6b4c] transition-colors shadow-md flex-shrink-0"
                                >
                                    <FiSend size={18} className="ml-0.5" />
                                </button>
                            </div>
                            <p className="text-[10px] text-center text-gray-400 mt-2">
                                We'll continue this chat on WhatsApp
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#5A7D5C] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            >
                {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </motion.button>
        </div>
    );
}
