import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';

function checkAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get('admin-auth');
  const expected = process.env.ADMIN_PASSWORD;
  return !!cookie && !!expected && cookie.value === expected;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const snap = await getDocs(query(collection(db, 'waitlist'), orderBy('position', 'desc')));

    const entries = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        email: data.email || '',
        name: data.name || '',
        role: data.role || 'customer',
        city: data.city || '',
        phone: data.phone || '',
        services: data.services || '',
        position: data.position || 0,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
      };
    });

    // Compute stats
    const total = entries.length;
    const customers = entries.filter((e) => e.role === 'customer').length;
    const providers = entries.filter((e) => e.role === 'provider').length;

    const cityMap: Record<string, number> = {};
    entries.forEach((e) => {
      const city = (e.city || 'Unknown').trim() || 'Unknown';
      cityMap[city] = (cityMap[city] || 0) + 1;
    });
    const topCities = Object.entries(cityMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([city, count]) => ({ city, count }));

    // Last 7 days
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const last7Days = entries.filter((e) => {
      if (!e.createdAt) return false;
      return new Date(e.createdAt).getTime() > sevenDaysAgo;
    }).length;

    return NextResponse.json({
      success: true,
      stats: { total, customers, providers, last7Days, topCities },
      entries,
    });
  } catch (error: any) {
    console.error('Admin waitlist fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch waitlist' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }
    await deleteDoc(doc(db, 'waitlist', id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete entry' },
      { status: 500 },
    );
  }
}
