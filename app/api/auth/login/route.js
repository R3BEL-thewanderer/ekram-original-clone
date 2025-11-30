import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        await dbConnect();
        const { email, password } = await request.json();

        console.log('User login attempt:', { email });

        // Check if admin credentials
        if (email === 'admin123@gmail.com' && password === 'admin') {
            console.log('Admin login detected');
            cookies().set('admin_token', 'secure-admin-token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return NextResponse.json({
                success: true,
                isAdmin: true
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check password (plain text comparison for now)
        if (user.password !== password) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        console.log('User login successful:', user.email);

        // Set user session cookie
        cookies().set('user_token', user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed. Please try again.' },
            { status: 500 }
        );
    }
}
