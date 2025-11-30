import dbConnect from '@/lib/db';
import Review from '@/models/Review';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { NextResponse } from 'next/server';

// POST: Submit a review
export async function POST(request) {
    try {
        await dbConnect();
        const { productId, userId, orderId, userName, rating, title, comment } = await request.json();

        // Verify the order is delivered
        const order = await Order.findById(orderId);
        if (!order || order.status !== 'Delivered') {
            return NextResponse.json(
                { error: 'Can only review delivered orders' },
                { status: 400 }
            );
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({ product: productId, user: userId });
        if (existingReview) {
            return NextResponse.json(
                { error: 'You have already reviewed this product' },
                { status: 400 }
            );
        }

        // Create review
        const review = await Review.create({
            product: productId,
            user: userId,
            order: orderId,
            userName,
            rating,
            title,
            comment,
            verified: true
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json(
            { error: 'Failed to submit review' },
            { status: 500 }
        );
    }
}

// GET: Get reviews for a product
export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
        }

        const reviews = await Review.find({ product: productId })
            .sort({ createdAt: -1 })
            .lean();

        // Calculate average rating
        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;

        return NextResponse.json({
            reviews,
            count: reviews.length,
            averageRating: Math.round(avgRating * 10) / 10
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}
