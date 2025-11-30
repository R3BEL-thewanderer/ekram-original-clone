import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await dbConnect();
        const { firstName, lastName, email, password } = await request.json();

        console.log('Registration attempt:', { firstName, lastName, email });

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Create new user (password stored as plain text for now - not recommended for production)
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password, // In production, use bcrypt to hash this
            role: 'customer'
        });

        console.log('User registered successfully:', user.email);

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Registration failed. Please try again.' },
            { status: 500 }
        );
    }
}
