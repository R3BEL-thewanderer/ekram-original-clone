import mongoose from 'mongoose';

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
    sizes: [{ type: String }], // XS, S, M, L, XL, XXL, 3XL
    fabric: { type: String },
    includesEarrings: { type: Boolean, default: true },
    stock: { type: Number, default: 100 },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
