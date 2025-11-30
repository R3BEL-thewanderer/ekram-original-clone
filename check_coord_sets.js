const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ekram-original';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true }, // 'Kurti/Tops', 'Co-Ord Sets', 'Boho Pants'
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    colors: [{
        name: { type: String },
        hex: { type: String },
    }],
    sizes: [{ type: String }],
    fabric: { type: String },
    includesEarrings: { type: Boolean, default: true },
    stock: { type: Number, default: 100 },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function checkCoordSets() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const products = await Product.find({ category: 'Co-Ord Sets' });

        console.log(`Found ${products.length} Co-Ord Sets products`);

        const fs = require('fs');
        const output = products.map(p => ({
            name: p.name,
            slug: p.slug,
            images: p.images,
            colors: p.colors
        }));
        fs.writeFileSync('coord_sets_dump.json', JSON.stringify(output, null, 2));
        console.log('Dumped to coord_sets_dump.json');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

checkCoordSets();
