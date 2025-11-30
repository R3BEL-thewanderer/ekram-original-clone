import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await dbConnect();
    const { slug } = params;
    const product = await Product.findOne({ slug });
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
}
