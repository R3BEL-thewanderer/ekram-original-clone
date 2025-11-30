const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ekram-original';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function checkLaavanya() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const product = await Product.findOne({ slug: 'laavanya' });

        if (product) {
            console.log(`Product: ${product.name} (${product.slug})`);
            console.log('Images:', product.images);
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

checkLaavanya();
