const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ekram-original';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function listAllProducts() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const products = await Product.find({}, 'name slug category');

        console.log('All Products:');
        products.forEach(p => {
            console.log(`${p.name} (${p.slug}) - ${p.category}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

listAllProducts();
