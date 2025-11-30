import Image from 'next/image';

export default function AboutUsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-xl">
                    <Image
                        src="https://placehold.co/600x800/5A7D5C/FFF?text=Founders"
                        alt="EKRAM Founders"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-8">
                    <h1 className="font-serif text-5xl font-bold text-[#333333]">About Us</h1>
                    <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6">
                        <p>
                            <strong>EKRAM ORIGINAL</strong> is more than just a clothing brand; it&apos;s a heartfelt legacy woven by three generations of women—a grandmother, mother, and granddaughter—each bringing their unique flair to the tapestry of fashion.
                        </p>
                        <p>
                            Rooted in tradition yet embracing modernity, our brand celebrates the timeless bond of family and the artistry passed down through generations. Our signature offering—matching fabric earrings with every outfit—embodies our commitment to detail, ensuring that every ensemble tells a cohesive and captivating story. By integrating accessories seamlessly with attire, we provide our customers with a distinctive style statement that resonates with individuality and elegance.
                        </p>
                        <h3 className="font-serif text-2xl font-bold text-[#333333] pt-4">Our Mission and Vision</h3>
                        <p>
                            At <strong>EKRAM ORIGINAL</strong>, our mission is to democratize fashion by offering good-quality, affordable clothing that doesn&apos;t compromise on uniqueness or style. We envision a world where every woman, regardless of her background, can express herself confidently through thoughtfully designed outfits that reflect both heritage and contemporary trends.
                        </p>
                        <p>
                            Our dedication to craftsmanship ensures that each piece is not only aesthetically pleasing but also durable and comfortable. By fostering a community that values authenticity and creativity, we aim to inspire women to embrace their individuality and carry forward the legacy of empowered femininity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
