import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductPage({ params }) {
    await dbConnect();
    const { slug } = params;
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
        return <div>Product not found</div>;
    }

    const serializedProduct = JSON.parse(JSON.stringify(product));

    // Fetch related products
    const relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: product._id }
    }).limit(4).lean();
    const serializedRelated = JSON.parse(JSON.stringify(relatedProducts));

    return (
        <ProductDetailClient product={serializedProduct} relatedProducts={serializedRelated} />
    );
}
