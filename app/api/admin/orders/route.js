import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

// GET: Fetch all orders
export async function GET() {
    await dbConnect();
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }); // Newest first
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

// PATCH: Update order status
export async function PATCH(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { orderId, status } = body;

        const order = await Order.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
