"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Video,
  Camera,
  ImagePlus,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Upload,
  Trash2,
  Plus,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const colors = {
  primaryText: '#030916',
  background: '#EEF2F7',
  brand: '#152E4B',
  secondary: '#A95D06',
  accent: '#F59E0B',
  surface: '#FFFFFF',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  success: '#059669',
  successBg: '#ECFDF5',
  successBorder: '#A7F3D0',
  error: '#DC2626',
  errorBg: '#FEF2F2',
};

interface PhotoPair {
  id: string;
  before: string | null;
  after: string | null;
  caption: string;
}

interface Certificate {
  id: string;
  name: string;
  uri: string;
}

export default function VideoPortfolioScreen() {
  const router = useRouter();

  // Video state
  const [videoState, setVideoState] = useState<'idle' | 'recording' | 'recorded' | 'uploaded'>('idle');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  // Photos state
  const [photoPairs, setPhotoPairs] = useState<PhotoPair[]>([]);

  // Certificates state
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Recording simulation
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setVideoState('recording');
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 30) {
          stopRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setVideoState('recorded');
    setVideoUri('file://simulated-video.mp4'); 
  };

  const resetRecording = () => {
    setVideoState('idle');
    setRecordingSeconds(0);
    setVideoUri(null);
  };

  const acceptVideo = async () => {
    setVideoState('uploaded');
  };

  // Photo pair management
  const addPhotoPair = () => {
    if (photoPairs.length >= 5) {
      alert('Limit Reached: You can upload up to 5 before/after photo pairs.');
      return;
    }
    const id = Date.now().toString();
    setPhotoPairs([...photoPairs, { id, before: null, after: null, caption: '' }]);
  };

  const removePhotoPair = (id: string) => {
    setPhotoPairs(photoPairs.filter((p) => p.id !== id));
  };

  // Certificate management
  const addCertificate = () => {
    if (certificates.length >= 5) {
      alert('Limit Reached: You can upload up to 5 certificates.');
      return;
    }
    const id = Date.now().toString();
    setCertificates([...certificates, { id, name: 'ITI Certificate.pdf', uri: 'file://cert.pdf' }]);
  };

  const removeCertificate = (id: string) => {
    setCertificates(certificates.filter((c) => c.id !== id));
  };

  const canProceed = videoState === 'uploaded';

  const handleNext = () => {
    router.push('/provider/gps-consent');
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-gray-100 sticky top-0 z-10 w-full">
        <button
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ArrowLeft size={22} color={colors.brand} strokeWidth={2.5} />
        </button>
        <h1 className="text-[17px] font-bold text-[#152E4B]">Video Portfolio</h1>
        <span className="text-[12px] font-semibold text-[#6B7280]">Step 4 of 6</span>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto p-5 pb-16 overflow-y-auto">
        {/* ═══ SECTION 1: VIDEO INTRODUCTION ═══ */}
        <div className="flex items-center gap-3 mb-3.5">
          <div className="w-8 h-8 rounded-xl bg-[#152E4B] flex items-center justify-center">
            <Video size={14} color={colors.surface} />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-[#152E4B]">Video Introduction</h2>
            <p className="text-[12px] text-[#6B7280] mt-0.5">Required · 30 seconds max</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(3,9,22,0.06)] mb-8">
          {/* Idle state */}
          {videoState === 'idle' && (
            <div className="animate-in fade-in duration-300">
              <div className="h-[260px] rounded-2xl overflow-hidden mb-4 bg-[#1a1a1a]">
                <div className="w-full h-full bg-[#F3F4F6] flex flex-col items-center justify-center gap-3">
                  <Camera size={48} color={colors.gray400} strokeWidth={1.5} />
                  <p className="text-[13px] text-[#6B7280]">Camera preview will appear here</p>
                </div>
              </div>

              {/* Teleprompter tips */}
              <div className="flex bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-xl p-3.5 mb-4 items-start">
                <Sparkles size={16} color={colors.accent} className="mt-0.5 shrink-0" />
                <div className="flex-1 ml-2.5">
                  <h3 className="text-[12px] font-bold text-[#152E4B] mb-1">What to say:</h3>
                  <p className="text-[12px] text-[#6B7280] leading-[18px] italic">
                    "Hi, I'm [your name]. I've been a [your service] for [X] years. I specialize in [your specialty]. I'm reliable and always clean up after the job."
                  </p>
                </div>
              </div>

              <button
                className="w-full bg-[#DC2626] text-white rounded-xl py-3.5 flex items-center justify-center gap-2.5 font-bold text-[15px] transition-all hover:bg-[#b91c1c] active:scale-[0.98]"
                onClick={startRecording}
              >
                <span className="w-3 h-3 rounded-full bg-white block" />
                <span>Start Recording</span>
              </button>
            </div>
          )}

          {/* Recording state */}
          {videoState === 'recording' && (
            <div className="animate-in fade-in duration-300">
              <div className="h-[260px] rounded-2xl overflow-hidden mb-4 bg-[#1a1a1a] relative">
                <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center gap-3 relative">
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[rgba(220,38,38,0.9)] px-2.5 py-1 rounded-md">
                    <span className="w-2 h-2 rounded-full bg-white block animate-pulse" />
                    <span className="text-[11px] font-[800] text-white tracking-[1px]">REC</span>
                  </div>
                  <Camera size={48} color={colors.gray500} strokeWidth={1.5} />
                  <p className="text-[13px] text-[#9CA3AF]">Recording...</p>
                </div>
              </div>

              {/* Timer + progress */}
              <div className="flex items-center justify-center gap-1.5 mb-2.5">
                <Clock size={18} color={colors.error} />
                <span className="text-[28px] font-bold text-[#DC2626] tabular-nums tracking-tight">
                  {formatTime(recordingSeconds)}
                </span>
                <span className="text-[16px] text-[#9CA3AF] font-medium"> / 00:30</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-[#E5E7EB] rounded-full mb-4 overflow-hidden w-full">
                <div
                  className="h-full bg-[#DC2626] rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(recordingSeconds / 30) * 100}%` }}
                />
              </div>

              <button
                className="w-full bg-[#030916] text-white rounded-xl py-3.5 flex items-center justify-center gap-2.5 font-bold text-[15px] transition-all hover:bg-black active:scale-[0.98]"
                onClick={stopRecording}
              >
                <span className="w-3.5 h-3.5 rounded-sm bg-[#DC2626] block" />
                <span>Stop Recording</span>
              </button>
            </div>
          )}

          {/* Recorded state */}
          {videoState === 'recorded' && (
            <div className="animate-in fade-in duration-300">
              <div className="h-[260px] rounded-2xl overflow-hidden mb-4 bg-[#1a1a1a]">
                <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center gap-3">
                  <Play size={48} color={colors.surface} strokeWidth={1.5} />
                  <p className="text-[13px] text-[#9CA3AF]">{formatTime(recordingSeconds)} recorded</p>
                </div>
              </div>

              <div className="flex gap-2.5 mt-4">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] transition-colors hover:bg-gray-200 text-[#152E4B] font-bold text-[13px]">
                  <Play size={18} />
                  <span>Play</span>
                </button>

                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] transition-colors hover:bg-gray-200 text-[#152E4B] font-bold text-[13px]"
                  onClick={resetRecording}
                >
                  <RotateCcw size={18} />
                  <span>Re-record</span>
                </button>

                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-[#059669] border border-[#059669] transition-colors hover:bg-emerald-700 text-white font-bold text-[13px] shadow-sm transform active:scale-[0.98]"
                  onClick={acceptVideo}
                >
                  <CheckCircle2 size={18} />
                  <span>Accept</span>
                </button>
              </div>
            </div>
          )}

          {/* Uploaded state */}
          {videoState === 'uploaded' && (
            <div className="flex flex-col items-center py-6 gap-2 animate-in zoom-in-95 duration-500">
              <CheckCircle2 size={40} className="text-[#059669] mb-1" fill="#A7F3D0" />
              <h3 className="text-[20px] font-bold text-[#152E4B]">Video uploaded!</h3>
              <p className="text-[13px] text-[#6B7280] text-center leading-[20px] max-w-[280px]">
                Your {recordingSeconds}-second intro is ready. Customers will see this before booking you.
              </p>
              <button
                className="flex items-center gap-1.5 mt-2 text-[#152E4B] hover:opacity-75 transition-opacity"
                onClick={resetRecording}
              >
                <RotateCcw size={14} />
                <span className="text-[13px] font-semibold">Re-record video</span>
              </button>
            </div>
          )}
        </div>

        {/* ═══ SECTION 2: BEFORE/AFTER PHOTOS ═══ */}
        <div className="flex items-center gap-3 mb-3.5 mt-8">
          <div className="w-8 h-8 rounded-xl bg-[#A95D06] flex items-center justify-center">
            <ImagePlus size={14} color={colors.surface} />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-[#152E4B]">Before & After Photos</h2>
            <p className="text-[12px] text-[#6B7280] mt-0.5">Optional · Up to 5 pairs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(3,9,22,0.06)] mb-8">
          <p className="text-[13px] text-[#6B7280] leading-[20px] mb-4">
            Show your best work. Upload before and after photos from past jobs to build trust with customers.
          </p>

          {/* Existing photo pairs */}
          {photoPairs.map((pair, index) => (
            <div key={pair.id} className="bg-[#F3F4F6] rounded-xl p-3.5 mb-3">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[13px] font-bold text-[#152E4B]">Job {index + 1}</span>
                <button onClick={() => removePhotoPair(pair.id)} className="p-1 hover:bg-gray-200 rounded-md transition-colors">
                  <Trash2 size={16} color={colors.error} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2.5">
                <div className="flex-1">
                  <div className="h-[90px] rounded-[10px] bg-white border border-[#E5E7EB] border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Camera size={20} color={colors.gray400} />
                    <span className="text-[10px] font-semibold text-[#9CA3AF]">Before</span>
                  </div>
                </div>
                <ChevronRight size={20} color={colors.gray400} />
                <div className="flex-1">
                  <div className="h-[90px] rounded-[10px] bg-white border border-[#E5E7EB] border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Camera size={20} color={colors.gray400} />
                    <span className="text-[10px] font-semibold text-[#9CA3AF]">After</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add pair button */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-[1.5px] border-[#152E4B] border-dashed text-[#152E4B] font-bold text-[14px] hover:bg-gray-50 transition-colors active:scale-[0.98]"
            onClick={addPhotoPair}
          >
            <Plus size={18} />
            <span>{photoPairs.length === 0 ? 'Add Before & After Photos' : 'Add Another Pair'}</span>
          </button>
        </div>

        {/* ═══ SECTION 3: CERTIFICATES ═══ */}
        <div className="flex items-center gap-3 mb-3.5 mt-8">
          <div className="w-8 h-8 rounded-xl bg-[#F59E0B] flex items-center justify-center">
            <FileText size={14} color={colors.primaryText} />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-[#152E4B]">Certificates & Licenses</h2>
            <p className="text-[12px] text-[#6B7280] mt-0.5">Optional · PDF or image</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(3,9,22,0.06)] mb-8">
          <p className="text-[13px] text-[#6B7280] leading-[20px] mb-4">
            Upload any professional certifications, trade licenses, or training certificates. These boost your profile credibility.
          </p>

          {/* Existing certificates */}
          {certificates.map((cert) => (
            <div key={cert.id} className="flex items-center gap-3 bg-[#F3F4F6] rounded-xl p-3.5 mb-2.5 animate-in slide-in-from-bottom-2 duration-300">
              <div className="w-9 h-9 rounded-lg bg-[rgba(21,46,75,0.08)] flex items-center justify-center shrink-0">
                <FileText size={18} color={colors.brand} />
              </div>
              <span className="flex-1 text-[14px] font-semibold text-[#152E4B] truncate">
                {cert.name}
              </span>
              <button
                onClick={() => removeCertificate(cert.id)}
                className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
              >
                <X size={18} color={colors.gray400} />
              </button>
            </div>
          ))}

          {/* Add certificate button */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-[1.5px] border-[#152E4B] border-dashed text-[#152E4B] font-bold text-[14px] mt-2 mb-3.5 hover:bg-gray-50 transition-colors active:scale-[0.98]"
            onClick={addCertificate}
          >
            <Upload size={18} />
            <span>Upload Certificate</span>
          </button>

          {/* Examples */}
          <div className="mt-1 bg-[#F3F4F6] p-3 rounded-[10px]">
            <span className="block text-[11px] font-bold text-[#152E4B] mb-1">Examples:</span>
            <span className="block text-[11px] text-[#6B7280] leading-[16px]">
              ITI certificate, electrician license, pest control certification, plumbing trade certificate, safety training diploma
            </span>
          </div>
        </div>

        {/* ═══ CONTINUE BUTTON ═══ */}
        <button
          className={`w-full rounded-2xl py-4 flex items-center justify-center gap-2 font-bold text-[16px] transition-all my-2 ${
            canProceed
              ? 'bg-[#152E4B] text-white hover:bg-[#1a385b] active:scale-[0.98] shadow-md shadow-[rgba(21,46,75,0.2)]'
              : 'bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed'
          }`}
          onClick={handleNext}
          disabled={!canProceed}
        >
          <span>Continue to GPS Consent</span>
          <ChevronRight size={18} color={canProceed ? '#FFFFFF' : '#9CA3AF'} />
        </button>

        {!canProceed && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <AlertCircle size={14} color={colors.gray400} />
            <span className="text-[12px] text-[#9CA3AF]">Record and accept your video introduction to continue</span>
          </div>
        )}
      </main>
    </div>
  );
}
