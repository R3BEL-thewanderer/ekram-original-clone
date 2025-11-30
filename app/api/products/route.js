import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const search = searchParams.get('search');

    let query = {};
    if (category && category !== 'all') {
        // Case insensitive search for category
        query.category = { $regex: new RegExp(category, 'i') };
    }
    if (featured === 'true') {
        query.isFeatured = true;
    }
    if (search) {
        query.$or = [
            { name: { $regex: new RegExp(search, 'i') } },
            { description: { $regex: new RegExp(search, 'i') } }
        ];
    }

    let productQuery = Product.find(query);

    if (sort === 'price_asc') {
        productQuery = productQuery.sort({ price: 1 });
    } else if (sort === 'price_desc') {
        productQuery = productQuery.sort({ price: -1 });
    } else if (sort === 'newest') {
        productQuery = productQuery.sort({ createdAt: -1 });
    }

    if (limit) {
        productQuery = productQuery.limit(parseInt(limit));
    }

    const result = await productQuery.exec();
    return NextResponse.json(result);
}

export async function POST(request) {
    await dbConnect();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
}
