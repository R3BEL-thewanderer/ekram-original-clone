export default function PolicyPage({ params }) {
    const { policy } = params;

    const policies = {
        'returns': <ReturnPolicy />,
        'shipping': <ShippingPolicy />,
        'cancellation': <CancellationPolicy />,
        'terms': <TermsConditions />,
        'disclaimer': <Disclaimer />,
        'privacy': <PrivacyPolicy />
    };

    const content = policies[policy];

    if (!content) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="font-serif text-4xl font-bold text-[#333333] mb-4">Policy Not Found</h1>
                <p className="text-gray-600">The policy you are looking for does not exist.</p>
                <p className="text-sm text-gray-400 mt-4">Requested: {policy}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            {content}
        </div>
    );
}

function ReturnPolicy() {
    return (
        <div className="prose prose-lg max-w-none text-gray-600">
            <h1 className="font-serif text-4xl font-bold text-[#333333] mb-8">Return & Refund Policy</h1>
            <p className="font-bold">Effective Date: September 10, 2025</p>
            <p>At Ekram Original, customer satisfaction is our priority. Please read our Return & Refund Policy carefully before making a purchase.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">1. Eligibility for Returns</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Returns are accepted only for <strong>defective, damaged, or incorrect items</strong>.</li>
                <li>Customized, altered, or made-to-order items are <strong>not eligible</strong> for return.</li>
                <li>Returns are only accepted when the complimentary matching fabric earrings are included with the product.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">2. Return Window</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>You must raise a return request within <strong>3 days</strong> of receiving your order.</li>
                <li>Requests made after this period will not be accepted.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">3. Return Process</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Contact our customer service with your order details and photos of the item.</li>
                <li>Once approved, you will receive return instructions.</li>
                <li>The item must be unused, with original packaging and tags intact.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">4. Refunds</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Once we receive and inspect the returned item, we will notify you of the refund approval.</li>
                <li>Approved refunds will be processed to your original method of payment within <strong>7–10 business days</strong>.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">5. Exchanges</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>We offer exchanges only for the same item in a different size or color (subject to availability).</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">6. Shipping for Returns</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Customers are responsible for return shipping costs unless the item was damaged or incorrect.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">7. Non-Returnable Items</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Gift cards, accessories, and clearance items are not eligible for return.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">8. Contact Us</h3>
            <p>For assistance with returns or refunds, please contact:</p>
            <p className="mt-2">
                <strong>📧 Email:</strong> contact@ekramoriginal.com<br />
                <strong>📞 Phone:</strong> 9090131513
            </p>
        </div>
    );
}

function ShippingPolicy() {
    return (
        <div className="prose prose-lg max-w-none text-gray-600">
            <h1 className="font-serif text-4xl font-bold text-[#333333] mb-8">Shipping Policy</h1>
            <p className="font-bold">Effective Date: September 10, 2025</p>
            <p>Thank you for shopping with Ekram Original. This Shipping Policy outlines the terms and conditions related to the delivery of products purchased through our website.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">1. Shipping Locations</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>We currently ship across India and offer limited international shipping.</li>
                <li>For international orders, delivery times and shipping rates may vary.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">2. Shipping Timeframe</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Order Processing:</strong> 1-3 business days.</li>
                <li><strong>India Delivery:</strong> Estimated 7-10 business days.</li>
                <li><strong>International Delivery:</strong> Estimated 15-20 business days depending on location.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">3. Shipping Charges</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>For International orders, shipping charges are calculated at checkout based on weight, size, and destination.</li>
                <li>Free shipping may be offered on select orders or during promotional periods.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">4. Tracking Orders</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Once your order is shipped, you will receive a tracking number via email or SMS.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">5. Delays and Exceptions</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Delivery times are estimated and not guaranteed. Delays may occur due to weather, holidays, or courier service disruptions.</li>
                <li>Ekram Original is not responsible for delays once the product is handed over to the courier.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">6. Address Accuracy</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Please ensure all shipping details are correct. We are not responsible for orders shipped to incorrect addresses.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">7. Lost or Damaged Packages</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>If your package is lost or arrives damaged, please contact us within <strong>48 hours</strong> of delivery.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">8. Contact Us</h3>
            <p>For any shipping-related inquiries, please contact:</p>
            <p className="mt-2">
                <strong>📧 Email:</strong> contact@ekramoriginal.com<br />
                <strong>📞 Phone:</strong> 9090131513
            </p>
        </div>
    );
}

function CancellationPolicy() {
    return (
        <div className="prose prose-lg max-w-none text-gray-600">
            <h1 className="font-serif text-4xl font-bold text-[#333333] mb-8">Cancellation Policy</h1>
            <p className="font-bold">Effective Date: September 10, 2025</p>
            <p>At Ekram Original, we understand that sometimes plans change. Our cancellation policy is designed to be fair to both our customers and our business operations.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">1. Order Cancellation by Customer</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>You may request to cancel your order <strong>within 12 hours</strong> of placing it.</li>
                <li>Cancellations can only be made <strong>before</strong> the order has been processed or shipped.</li>
                <li>Once the order is packed or dispatched, it <strong>cannot be cancelled</strong>.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">2. How to Cancel</h3>
            <p>To cancel your order, please contact our customer support team immediately with your order number via:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>📧 Email:</strong> contact@ekramoriginal.com</li>
                <li><strong>📞 Phone:</strong> 9090131513</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">3. Refund for Cancelled Orders</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>If the cancellation is approved, the full amount will be refunded to your original payment method within <strong>7–10 business days</strong>.</li>
                <li>Refund timelines may vary depending on your payment provider.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">4. Order Cancellation by Ekram Original</h3>
            <p>We reserve the right to cancel orders due to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Unavailability of stock</li>
                <li>Payment failure or incomplete payment</li>
                <li>Incorrect pricing or product information</li>
                <li>Suspected fraud or abuse</li>
            </ul>
            <p className="mt-4">If we cancel your order, you will be notified and refunded in full.</p>
        </div>
    );
}

function TermsConditions() {
    return (
        <div className="prose prose-lg max-w-none text-gray-600">
            <h1 className="font-serif text-4xl font-bold text-[#333333] mb-8">Terms & Conditions</h1>
            <p className="font-bold">Effective Date: September 10, 2025</p>
            <p>Welcome to Ekram Original. By accessing and using our website (www.ekramoriginal.com), you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our site or placing an order.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">1. Company Information</h3>
            <p>Ekram Original is an Indian-based ecommerce platform that offers premium quality fabrics and exclusive women&apos;s dresses. Throughout the site, the terms “we,” “us,” and “our” refer to Ekram Original.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">2. Use of Website</h3>
            <p>You agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Use our website only for lawful purposes.</li>
                <li>Not reproduce, duplicate, copy, sell, resell, or exploit any portion of the website without express written permission by us.</li>
                <li>Not engage in any activity that interferes with the performance of the website.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">3. Products and Services</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>We offer curated collections of fine fabrics and women&apos;s apparel.</li>
                <li>All products are subject to availability.</li>
                <li>We reserve the right to limit quantities and discontinue any product at any time.</li>
                <li>Descriptions and images of products are for reference only. Colors may vary slightly due to screen resolution or lighting.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">4. Pricing and Payment</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>All prices are listed in INR and include applicable taxes.</li>
                <li>We reserve the right to modify prices without prior notice.</li>
                <li>Payments can be made via secure online payment gateways. By placing an order, you authorize us to charge your selected payment method.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">5. Shipping and Delivery</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>We offer domestic and international shipping options.</li>
                <li>Estimated delivery times are provided during checkout but may vary due to external factors.</li>
                <li>Ekram Original is not liable for delays caused by courier services or unforeseen circumstances.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">6. Return and Exchange Policy</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>We accept returns only for damaged or defective items.</li>
                <li>Customers must raise a return request within <strong>3 days</strong> of receiving the product.</li>
                <li>Customized or altered items are not eligible for return or exchange.</li>
                <li>For full details, please refer to our Returns & Refund Policy.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">7. Intellectual Property</h3>
            <p>All content on this site—including images, text, graphics, logos, and product designs—is the property of Ekram Original and is protected by intellectual property laws. Unauthorized use is strictly prohibited.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">8. User Accounts</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>We reserve the right to terminate accounts or cancel orders at our sole discretion.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">9. Limitation of Liability</h3>
            <p>Ekram Original shall not be held liable for any indirect, incidental, or consequential damages arising from your use of the site or purchase of products.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">10. Governing Law</h3>
            <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">11. Changes to Terms</h3>
            <p>We reserve the right to update, change, or replace any part of these Terms and Conditions at any time. It is your responsibility to check this page periodically.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">12. Contact Information</h3>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>📧 Email:</strong> contact@ekramoriginal.com</li>
                <li><strong>📞 Phone:</strong> 9090131513</li>
                <li><strong>🌐 Website:</strong> www.ekramoriginal.com</li>
            </ul>
        </div>
    );
}

function Disclaimer() {
    return (
        <div className="prose prose-lg max-w-none text-gray-600">
            <h1 className="font-serif text-4xl font-bold text-[#333333] mb-8">Disclaimer</h1>
            <p className="font-bold">Effective Date: September 10, 2025</p>
            <p>The information provided by <strong>Ekram Original</strong> (“we,” “our,” or “us”) on this website is for general informational purposes only. By using our website, you agree to the terms outlined in this disclaimer.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">1. Product Information</h3>
            <p>We strive to display our products as accurately as possible, including colors, textures, and descriptions. However, due to variations in screen settings and lighting, actual colors may slightly differ from what appears on your device. Fabric texture and finish may also vary slightly due to the nature of materials used.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">2. Handmade & Custom Elements</h3>
            <p>Some products may be handcrafted or custom-made, and slight variations are expected and add to the uniqueness of each item. These are not considered defects.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">3. Pricing & Availability</h3>
            <p>Prices are subject to change without notice. While we do our best to maintain accurate stock levels, availability is not guaranteed until the order is confirmed.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">4. Website Content</h3>
            <p>All content, images, product descriptions, and text on this site are the property of Ekram Original. Unauthorized use or reproduction of our material is prohibited.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">5. Limitation of Liability</h3>
            <p>We do not accept liability for any direct, indirect, incidental, or consequential damages that result from the use of our products or website. All purchases and interactions are at your own discretion and risk.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">6. External Links</h3>
            <p>Our website may contain links to third-party websites for your convenience. We do not endorse and are not responsible for the content, accuracy, or practices of these external sites.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">7. Contact Us</h3>
            <p>For any questions regarding this disclaimer, please contact us at:</p>
            <p className="mt-2">
                <strong>📧 Email:</strong> contact@ekramoriginal.com<br />
                <strong>📞 Phone:</strong> 9090131513
            </p>
        </div>
    );
}

function PrivacyPolicy() {
    return (
        <div className="prose prose-lg max-w-none text-gray-600">
            <h1 className="font-serif text-4xl font-bold text-[#333333] mb-8">Privacy Policy</h1>
            <p className="font-bold">Effective Date: September 10, 2025</p>
            <p>Ekram Original values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or make a purchase.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">1. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal details:</strong> Name, email address, shipping address, and phone number.</li>
                <li><strong>Payment information:</strong> Processed through secure payment gateways.</li>
                <li><strong>Browsing data:</strong> IP address and cookies for analytics and user experience.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">2. How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>To process your orders and provide customer service.</li>
                <li>To personalize your shopping experience.</li>
                <li>To send promotional offers and updates (if you opt-in).</li>
                <li>To improve our website and services.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">3. Sharing Your Information</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>We do not sell, trade, or rent your personal information.</li>
                <li>Your data may be shared with trusted third-party service providers (e.g., couriers, payment processors) only for order fulfillment.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">4. Cookies</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>Our site uses cookies to enhance your browsing experience.</li>
                <li>You can choose to disable cookies through your browser settings.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">5. Data Security</h3>
            <p>We implement security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">6. Your Rights</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>You may request access to, correction, or deletion of your personal data.</li>
                <li>You may opt-out of marketing emails at any time.</li>
            </ul>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">7. Third-Party Links</h3>
            <p>Our site may contain links to other websites. We are not responsible for their privacy practices.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">8. Policy Updates</h3>
            <p>We reserve the right to update this Privacy Policy. Changes will be posted on this page.</p>

            <h3 className="font-serif text-2xl font-bold text-[#333333] mt-8 mb-4">9. Contact Us</h3>
            <p>If you have questions regarding this Privacy Policy, contact us at:</p>
            <p className="mt-2">
                <strong>📧 Email:</strong> contact@ekramoriginal.com<br />
                <strong>📞 Phone:</strong> 9090131513
            </p>
        </div>
    );
}
