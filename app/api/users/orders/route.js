import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        // Find all orders for this user
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
