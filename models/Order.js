import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String },
        quantity: { type: Number },
        price: { type: Number },
        color: { type: String },
        size: { type: String },
        image: { type: String }
    }],
    shippingAddress: {
        name: { type: String },
        address: { type: String },
        city: { type: String },
        postalCode: { type: String },
        country: { type: String },
        phone: { type: String },
        email: { type: String }
    },
    subtotal: { type: Number },
    tax: { type: Number },
    total: { type: Number },
    status: { type: String, default: 'Placed', enum: ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'] },
    estimatedDelivery: { type: Date },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
