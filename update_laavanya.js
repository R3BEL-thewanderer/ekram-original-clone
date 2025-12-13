const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ekram-original';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function updateLaavanya() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const product = await Product.findOne({ slug: 'laavanya' });

        if (product) {
            console.log(`Updating images for: ${product.name}`);

            // Map the old paths to the new correct paths
            const newImages = product.images.map(img => {
                // Example: /images/products/laavanya/black-and-blue-1.webp -> /images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20BLUE)1.webp
                // This mapping is tricky because filenames changed completely.
                // Let's manually construct the correct array based on the file listing we saw earlier.
                return img;
            });

            // Hardcoding the correct paths based on the file listing of public/images/KURTI/LAAVANYA
            const correctImages = [
                '/images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20BLUE)1.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20BLUE)2.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20BLUE)3.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20RED)1.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20RED)2.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20WHITE%20DRAGON%20PRINT)1.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20WHITE%20DRAGON%20PRINT)2.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(BLACK%20AND%20WHITE%20DRAGON%20PRINT)3.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(PEACH)1.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(PEACH)2.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(PEACH)3.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(PINK)1.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(PINK)2.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(PINK)3.webp',
                '/images/KURTI/LAAVANYA/LAAVANYA%20(PINK)4.webp'
            ];

            product.images = correctImages;
            await product.save();
            console.log('Updated Laavanya images successfully');
            console.log('New Images:', product.images);
        } else {
            console.log('Product Laavanya not found');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

updateLaavanya();
