import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import CollectionClient from './CollectionClient';

export default async function CollectionPage({ params, searchParams }) {
    await dbConnect();
    const { category } = params;
    const { search } = searchParams;

    let query = {};
    if (category !== 'all') {
        const categoryMap = {
            'kurti-tops': 'Kurti/Tops',
            'co-ord-sets': 'Co-Ord Sets',
            'boho-pants': 'Boho Pants'
        };

        const dbCategory = categoryMap[category] || category;
        if (dbCategory) {
            // Case insensitive regex for category matching
            query.category = { $regex: new RegExp(dbCategory, 'i') };
        }
    }

    if (search) {
        query.$or = [
            { name: { $regex: new RegExp(search, 'i') } },
            { description: { $regex: new RegExp(search, 'i') } },
            { slug: { $regex: new RegExp(search, 'i') } }
        ];
    }

    const products = await Product.find(query).lean();
    const serializedProducts = JSON.parse(JSON.stringify(products));

    const descriptions = {
        'kurti-tops': "Discover our exclusive range of kurtis and tops, designed to blend tradition with contemporary style. Each piece comes with a complementary matching fabric earring.",
        'co-ord-sets': "Experience the perfect coordination with our co-ord sets – matching tops and bottoms designed to elevate your wardrobe. Complete your look with the complimentary fabric earring that matches your outfit.",
        'boho-pants': "Embrace comfort and style with our bohemian pants collection. Perfect for casual outings, beach days, and relaxed gatherings. Each pair is a statement of effortless elegance."
    };

    const description = descriptions[category] || "";

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="font-serif text-4xl font-bold text-[#333333] mb-4 uppercase">
                    {category === 'all' ? 'All Products' : category.replace(/-/g, ' ')} COLLECTION
                </h1>
                {description && (
                    <p className="text-gray-600 max-w-3xl text-lg leading-relaxed mb-4">
                        {description}
                    </p>
                )}
                <p className="font-bold text-[#333333]">
                    {serializedProducts.length} Products Available
                </p>
            </div>
            <CollectionClient initialProducts={serializedProducts} />
        </div>
    );
}
