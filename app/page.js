import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

import CollectionCard from '@/components/CollectionCard';

async function getFeaturedProducts() {
    await dbConnect();
    // In a real app, we'd fetch from API or DB directly. Since this is a server component, we can use DB directly.
    // We use lean() to get plain JS objects.
    try {
        const products = await Product.find({ isFeatured: true }).limit(8).lean();
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export default async function Home() {
    const featuredProducts = await getFeaturedProducts();

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full bg-[#EAE6DE] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-r from-[#EAE6DE] to-[#F8F6F1]" />
                </div>

                <div className="relative z-10 text-center space-y-6 max-w-3xl px-4">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#333333] leading-tight">
                        Heritage Woven in <span className="text-[#5A7D5C]">Style</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover the timeless bond of family and fashion. Handcrafted ethnic wear for the modern woman.
                    </p>
                    <Link
                        href="/collections/all"
                        className="inline-block bg-[#5A7D5C] text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-[#4a6b4c] transition-all transform hover:scale-105 shadow-lg"
                    >
                        EXPLORE COLLECTION
                    </Link>
                </div>
            </section>


            {/* Featured Collections */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-[#333333]">Curated Collections</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Kurti & Tops',
                            images: [
                                '/images/KURTI/INDRANI/INDRANI%20(BLUE)1.webp',
                                '/images/KURTI/INDRANI/INDRANI%20(LILAC)1.webp',
                                '/images/KURTI/INDRANI/INDRANI%20(MULTICOLOUR)1.webp'
                            ],
                            link: '/collections/kurti-tops'
                        },
                        {
                            name: 'Co-Ord Sets',
                            images: [
                                '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(TURQUOISE%20BLUE)1.webp',
                                '/images/CO-ORD%20SETS/VARDHANA/VARDHANA%20(BROWN)1.webp',
                                '/images/CO-ORD%20SETS/JIVIDHA/JIVIDA%20(BUBLEGUM-PINK)1.webp'
                            ],
                            link: '/collections/co-ord-sets'
                        },
                        {
                            name: 'Boho Pants',
                            images: [
                                '/images/BOHO-PANTS/VIKROTI-%20BLACK%201.webp',
                                '/images/BOHO-PANTS/VIKROTI-%20BLUE%201.webp',
                                '/images/BOHO-PANTS/VIKROTI-%20NAVY%20BLUE%201.webp'
                            ],
                            link: '/collections/boho-pants'
                        },
                    ].map((collection, idx) => (
                        <CollectionCard key={idx} collection={collection} />
                    ))}
                </div>
            </section>

            {/* Best Sellers */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#333333]">Best Sellers</h2>
                    <Link href="/collections/all" className="text-[#5A7D5C] font-medium hover:text-[#D4AF37] transition-colors border-b border-[#5A7D5C] pb-1">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.length > 0 ? featuredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    )) : (
                        <p className="col-span-4 text-center text-gray-500">No products found. Please seed the database.</p>
                    )}
                </div>
            </section>

            {/* Brand Story Snippet */}
            <section className="bg-[#F3F0E9] py-20">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#333333]">Our Legacy</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        &quot;EKRAMORIGINAL is more than just a clothing brand; it&apos;s a heartfelt legacy woven by three generations of women...&quot;
                    </p>
                    <Link href="/pages/about-us" className="inline-block text-[#5A7D5C] font-bold hover:text-[#D4AF37] transition-colors mt-4">
                        READ OUR STORY &rarr;
                    </Link>
                </div>
            </section>
        </div>
    );
}
