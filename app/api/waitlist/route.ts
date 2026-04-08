import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { email, name, role, city, phone, services } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email.' }, { status: 400 });
    }

    const existing = await getDocs(query(collection(db, 'waitlist'), where('email', '==', email.toLowerCase())));
    if (!existing.empty) {
      return NextResponse.json({ success: false, message: "You're already on the waitlist!" }, { status: 409 });
    }

    const allDocs = await getDocs(collection(db, 'waitlist'));
    const position = allDocs.size + 101;

    await addDoc(collection(db, 'waitlist'), {
      email: email.toLowerCase(),
      name: name || '',
      role: role || 'customer',
      city: city || '',
      phone: phone || '',
      services: services || '',
      position,
      createdAt: serverTimestamp(),
      userAgent: req.headers.get('user-agent') || '',
    });

    return NextResponse.json({
      success: true,
      message: "You're in! We'll notify you when RoundU launches.",
      position,
    });
  } catch (error: any) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
