import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { success: false, message: 'Admin password not configured on server' },
        { status: 500 },
      );
    }

    if (password !== correctPassword) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password' },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-auth', correctPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin-auth');
  return response;
}
