'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, Star, MapPin, Clock, CheckCircle2, Navigation, Zap, Droplets, Car, Wrench, Sparkles, UserCheck } from 'lucide-react';

const mockCategories = [
  { id: 'housekeeping', label: 'Housekeeping', icon: Sparkles, color: 'from-amber-500/20 to-orange-500/20', activeProvider: { name: 'Priya Sharma', role: 'Housekeeping Specialist', rating: 4.9, jobs: 340, dist: '1.2 km away', time: '12 min', photo: 'PS', verified: true, price: '₹349/hr' } },
  { id: 'plumbing', label: 'Plumbing', icon: Droplets, color: 'from-blue-500/20 to-cyan-500/20', activeProvider: { name: 'Karthik Raja', role: 'Master Plumber', rating: 4.8, jobs: 420, dist: '0.8 km away', time: '9 min', photo: 'KR', verified: true, price: '₹299 onwards' } },
  { id: 'electrician', label: 'Electrician', icon: Zap, color: 'from-yellow-500/20 to-amber-500/20', activeProvider: { name: 'Rajesh Kumar', role: 'Certified Electrician', rating: 4.9, jobs: 510, dist: '1.5 km away', time: '14 min', photo: 'RK', verified: true, price: '₹199 onwards' } },
  { id: 'carwash', label: 'Car Wash', icon: Car, color: 'from-emerald-500/20 to-teal-500/20', activeProvider: { name: 'Venkatesh S.', role: 'Doorstep Auto Detailing', rating: 4.9, jobs: 280, dist: '2.1 km away', time: '15 min', photo: 'VS', verified: true, price: '₹399' } },
  { id: 'mechanic', label: 'Mechanic', icon: Wrench, color: 'from-indigo-500/20 to-violet-500/20', activeProvider: { name: 'Arun Prakash', role: 'Two & Four Wheeler Pro', rating: 4.7, jobs: 190, dist: '1.8 km away', time: '18 min', photo: 'AP', verified: true, price: '₹249 onwards' } },
];

export default function AppPreview() {
  const [selectedCat, setSelectedCat] = useState(mockCategories[0].id);
  const currentCategory = mockCategories.find((c) => c.id === selectedCat) || mockCategories[0];
  const provider = currentCategory.activeProvider;

  return (
    <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[380px]">
      {/* Subtle outer backdrop glow */}
      <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-amber-500/15 via-blue-500/10 to-amber-500/15 blur-2xl pointer-events-none" />

      {/* Modern Phone Container */}
      <div className="relative rounded-[40px] p-3 bg-slate-900 border border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Phone Inner Screen */}
        <div className="rounded-[32px] bg-[#0A0E17] border border-slate-800/80 p-4 text-slate-100 flex flex-col min-h-[580px] select-none">
          
          {/* Top Status Bar */}
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono mb-4 px-2">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-300">Vellore, TN</span>
            </div>
          </div>

          {/* App Header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <p className="text-[11px] text-amber-400 font-medium">Verified Doorstep Service</p>
              <h4 className="text-lg font-bold text-white tracking-tight">Need help at home?</h4>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400">
              RU
            </div>
          </div>

          {/* Search Box */}
          <div className="relative mb-4">
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 text-xs shadow-inner">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search housekeepers, plumbers...</span>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
            {mockCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = cat.id === selectedCat;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Provider Card Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-4 bg-slate-900/90 border border-slate-800 shadow-lg mb-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-bold text-slate-950 text-sm shadow-md">
                  {provider.photo}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-sm font-bold text-white truncate">{provider.name}</h5>
                    {provider.verified && (
                      <span title="DigiLocker Verified">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{provider.role}</p>

                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {provider.rating} ({provider.jobs})
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {provider.dist}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action bar inside provider card */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Standard Rate</span>
                  <span className="font-bold text-amber-400">{provider.price}</span>
                </div>
                <button className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors">
                  Instant Book
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Live Dispatch Tracker Banner */}
          <div className="rounded-xl p-3 bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">Hyperlocal Dispatch</p>
                <p className="text-[10px] text-emerald-400">Average match in &lt;15 mins</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live
            </span>
          </div>

        </div>
      </div>

      {/* Floating Trust Pill Accent */}
      <div className="hidden sm:flex absolute -left-12 bottom-12 items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md">
        <UserCheck className="w-4 h-4 text-emerald-400" />
        <div className="text-[11px]">
          <span className="font-bold text-white block">DigiLocker Verified</span>
          <span className="text-slate-400 text-[10px]">Aadhaar & Background Checked</span>
        </div>
      </div>
    </div>
  );
}
