'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Loader2, Lock, LogOut, Search, Download, Trash2, Users,
  UserCheck, Briefcase, TrendingUp, MapPin, Calendar, Mail, AlertCircle
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';

// ── Types ───────────────────────────────────────────────────────────────────
interface WaitlistEntry {
  id: string;
  email: string;
  name: string;
  role: string;
  city: string;
  phone?: string;
  services?: string;
  position: number;
  createdAt: string | null;
}

interface Stats {
  total: number;
  customers: number;
  providers: number;
  last7Days: number;
  topCities: { city: string; count: number }[];
}

// ═══════════════════════════════════════════════════════════════════════════
// ROOT — handles login state
// ═══════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuthed = localStorage.getItem('admin_authed');
    setAuthed(isAuthed === 'true');
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center mesh-bg">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!authed) return <LoginGate onSuccess={() => { localStorage.setItem('admin_authed', 'true'); setAuthed(true); }} />;
  return <Dashboard onLogout={() => { localStorage.removeItem('admin_authed'); setAuthed(false); }} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// LOGIN GATE
// ═══════════════════════════════════════════════════════════════════════════
function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '12345678';
      if (password === adminPass) {
        onSuccess();
      } else {
        setError('Login failed');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="orb orb-amber w-[600px] h-[600px] top-0 left-1/2 -translate-x-1/2 animate-pulse-glow" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md glass-dark rounded-3xl p-10 border border-amber-500/30 glow-amber"
      >
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center glow-amber-strong">
            <Lock className="w-7 h-7 text-ink" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold text-bg text-center mb-2">Admin Portal</h1>
        <p className="text-bg/50 text-center mb-8 text-sm">Enter your password to continue</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full px-4 py-3 rounded-xl glass text-bg placeholder-bg/30 border border-amber-500/20 focus:border-amber-500/60 focus:outline-none transition-colors mb-4"
        />

        {error && (
          <div className="mb-4 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="btn-primary w-full py-4 rounded-xl text-ink font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Sign in →</span>}
        </button>

        <p className="text-xs text-bg/40 text-center mt-6 font-mono">
          RoundU Admin · Confidential
        </p>
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'provider'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'position'>('newest');

  async function fetchData() {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'waitlist'), orderBy('position', 'desc')));
      const newEntries = snap.docs.map((d) => {
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

      const total = newEntries.length;
      const customers = newEntries.filter((e) => e.role === 'customer').length;
      const providers = newEntries.filter((e) => e.role === 'provider').length;

      const cityMap: Record<string, number> = {};
      newEntries.forEach((e) => {
        const city = (e.city || 'Unknown').trim() || 'Unknown';
        cityMap[city] = (cityMap[city] || 0) + 1;
      });
      const topCities = Object.entries(cityMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([city, count]) => ({ city, count }));

      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const last7Days = newEntries.filter((e) => {
        if (!e.createdAt) return false;
        return new Date(e.createdAt).getTime() > sevenDaysAgo;
      }).length;

      setEntries(newEntries);
      setStats({ total, customers, providers, last7Days, topCities });
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleLogout() {
    onLogout();
  }

  async function handleDelete(id: string, email: string) {
    if (!confirm(`Delete ${email} from waitlist? This cannot be undone.`)) return;
    try {
      await deleteDoc(doc(db, 'waitlist', id));
      fetchData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  }

  function exportCSV() {
    const headers = ['Position', 'Email', 'Name', 'Phone', 'Role', 'City', 'Services', 'Joined At'];
    const rows = filtered.map((e) => [
      e.position,
      e.email,
      e.name,
      e.phone || '',
      e.role,
      e.city,
      e.services || '',
      e.createdAt ? new Date(e.createdAt).toLocaleString() : '',
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roundu-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...entries];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.email.toLowerCase().includes(q) ||
          e.name.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q),
      );
    }

    if (roleFilter !== 'all') {
      list = list.filter((e) => e.role === roleFilter);
    }

    if (sortBy === 'newest') {
      list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    } else if (sortBy === 'oldest') {
      list.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
    } else {
      list.sort((a, b) => a.position - b.position);
    }

    return list;
  }, [entries, search, roleFilter, sortBy]);

  return (
    <div className="min-h-screen mesh-bg-navy relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="orb orb-amber w-[500px] h-[500px] top-0 -right-32 animate-pulse-glow" />

      {/* Header */}
      <header className="relative z-10 border-b border-amber-500/10 backdrop-blur-xl bg-navy-950/60">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-display font-bold text-ink">
              R
              <div className="absolute inset-0 rounded-xl bg-amber-500 blur-lg opacity-40"></div>
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-bg">roundu admin</div>
              <div className="text-[10px] font-mono text-amber-500/80 tracking-wider uppercase">Internal Dashboard</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-amber text-bg/80 hover:text-amber-500 hover:border-amber-500/50 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : (
          <>
            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Users} label="Total signups" value={stats.total.toLocaleString()} color="amber" />
                <StatCard icon={UserCheck} label="Customers" value={stats.customers.toLocaleString()} color="amber" />
                <StatCard icon={Briefcase} label="Providers" value={stats.providers.toLocaleString()} color="amber" />
                <StatCard icon={TrendingUp} label="Last 7 days" value={`+${stats.last7Days}`} color="amber" />
              </div>
            )}

            {/* Top cities */}
            {stats && stats.topCities.length > 0 && (
              <div className="glass-dark rounded-2xl p-6 mb-8 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <h2 className="font-display text-lg font-semibold text-bg">Top cities</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.topCities.map((c, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-full glass-amber border border-amber-500/30 text-sm"
                    >
                      <span className="text-bg font-medium">{c.city}</span>
                      <span className="text-amber-500 ml-2 font-mono text-xs">{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="glass-dark rounded-2xl p-6 mb-6 border border-amber-500/20">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bg/40" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email, name, or city..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl glass text-bg placeholder-bg/30 border border-amber-500/20 focus:border-amber-500/60 focus:outline-none transition-colors"
                  />
                </div>

                {/* Role filter */}
                <div className="flex gap-2">
                  {(['all', 'customer', 'provider'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRoleFilter(r)}
                      className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                        roleFilter === r
                          ? 'btn-primary text-ink'
                          : 'glass text-bg/60 hover:bg-amber-500/5'
                      }`}
                    >
                      {r === 'all' ? 'All' : r === 'customer' ? 'Customers' : 'Providers'}
                    </button>
                  ))}
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 rounded-xl glass text-bg border border-amber-500/20 focus:border-amber-500/60 focus:outline-none"
                >
                  <option value="newest" className="bg-navy-900">Newest first</option>
                  <option value="oldest" className="bg-navy-900">Oldest first</option>
                  <option value="position" className="bg-navy-900">By position</option>
                </select>

                {/* Export */}
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl btn-primary text-ink font-semibold text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
              <div className="mt-4 text-xs font-mono text-bg/40">
                Showing {filtered.length} of {entries.length} entries
              </div>
            </div>

            {/* Table */}
            <div className="glass-dark rounded-2xl border border-amber-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-navy-950/80 border-b border-amber-500/20">
                    <tr>
                      <Th>#</Th>
                      <Th>Email</Th>
                      <Th>Name</Th>
                      <Th>Phone</Th>
                      <Th>Role</Th>
                      <Th>City</Th>
                      <Th>Services</Th>
                      <Th>Joined</Th>
                      <Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-16 text-bg/50">
                          No entries found
                        </td>
                      </tr>
                    ) : (
                      filtered.map((entry) => (
                        <tr
                          key={entry.id}
                          className="border-b border-amber-500/10 hover:bg-amber-500/5 transition-colors"
                        >
                          <Td>
                            <span className="font-mono text-amber-500 font-semibold">
                              #{entry.position}
                            </span>
                          </Td>
                          <Td>
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-bg/40" />
                              <span className="text-bg font-medium">{entry.email}</span>
                            </div>
                          </Td>
                          <Td>
                            <span className="text-bg/80">{entry.name || '—'}</span>
                          </Td>
                          <Td>
                            <span className="text-bg/80 whitespace-nowrap">{entry.phone || '—'}</span>
                          </Td>
                          <Td>
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                entry.role === 'provider'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-navy-500/30 text-bg/80 border border-navy-400/30'
                              }`}
                            >
                              {entry.role}
                            </span>
                          </Td>
                          <Td>
                            <span className="text-bg/70">{entry.city || '—'}</span>
                          </Td>
                          <Td>
                            <div className="max-w-[150px] truncate" title={entry.services || ''}>
                              <span className="text-bg/70">{entry.services || '—'}</span>
                            </div>
                          </Td>
                          <Td>
                            <div className="flex items-center gap-1.5 text-xs text-bg/60">
                              <Calendar className="w-3 h-3" />
                              {entry.createdAt
                                ? new Date(entry.createdAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                : '—'}
                            </div>
                          </Td>
                          <Td>
                            <button
                              onClick={() => handleDelete(entry.id, entry.email)}
                              className="p-2 rounded-lg hover:bg-red-500/20 text-bg/40 hover:text-red-400 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </Td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Small Components
// ═══════════════════════════════════════════════════════════════════════════
function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="glass-dark rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/25 transition-all">
          <Icon className="w-5 h-5 text-amber-500" />
        </div>
      </div>
      <div className="font-display text-3xl font-bold text-bg">{value}</div>
      <div className="text-xs text-bg/50 mt-1 font-mono uppercase tracking-wider">{label}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-4 text-left text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500/80">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 text-sm">{children}</td>;
}
