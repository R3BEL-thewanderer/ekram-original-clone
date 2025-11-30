import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
        return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    const order = await Order.findOne({ orderId });

    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
}
