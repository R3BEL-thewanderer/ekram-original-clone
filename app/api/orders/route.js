import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await dbConnect();
    const body = await request.json();

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const order = await Order.create({
        ...body,
        orderId,
        user: body.userId || null, // Save user ID if provided
        status: 'Placed',
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

    return NextResponse.json(order, { status: 201 });
}
