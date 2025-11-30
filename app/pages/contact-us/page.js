'use client';

import { useForm } from 'react-hook-form';

export default function ContactUsPage() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        alert('Message sent! We will get back to you soon.');
        reset();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="font-serif text-4xl font-bold text-[#333333] mb-8 text-center">Contact Us</h1>
                <p className="text-center text-gray-600 mb-12">
                    We’d love to hear from you! Whether you have a question about our products, your order, or anything else, our team is here to help.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Name</label>
                            <input {...register('name', { required: true })} className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C]" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input {...register('email', { required: true })} type="email" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C]" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Subject</label>
                        <input {...register('subject', { required: true })} className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C]" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <textarea {...register('message', { required: true })} rows={6} className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#5A7D5C]" />
                    </div>

                    <button type="submit" className="w-full bg-[#333333] text-white py-4 rounded font-medium hover:bg-black transition-colors">
                        SEND MESSAGE
                    </button>
                </form>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    <div>
                        <h3 className="font-bold text-[#333333] mb-2">Email</h3>
                        <p className="text-gray-600">support@ekramoriginal.com</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#333333] mb-2">Phone</h3>
                        <p className="text-gray-600">9090131513</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#333333] mb-2">Website</h3>
                        <p className="text-gray-600">www.ekramoriginal.com</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#333333] mb-2">Address</h3>
                        <p className="text-gray-600">G-1 104/105 Bhoomi Park Phase 2, Malad (West), Mumbai 400095</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <h3 className="font-bold text-[#333333] mb-2">Availability</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We are available 24/7 — we’re just a message away, any day, any time. We do our best to respond to all inquiries within 24–48 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}
