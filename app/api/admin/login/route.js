import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        console.log('===== ADMIN LOGIN ATTEMPT =====');
        console.log('Received email:', email);
        console.log('Received password:', password);
        console.log('Email match:', email === 'admin123@gmail.com');
        console.log('Password match:', password === 'admin');
        console.log('==============================');

        // Simplified admin credentials for testing
        if (email === 'admin123@gmail.com' && password === 'admin') {
            console.log('✓ Login successful!');

            // Set a cookie to keep the user logged in
            cookies().set('admin_token', 'secure-admin-token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        console.log('✗ Login failed - credentials do not match');
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
