"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Landmark,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  Loader2
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

type Step = 'aadhaar' | 'aadhaar_otp' | 'pan' | 'bank';
type VerifiedSteps = { aadhaar: boolean; pan: boolean; bank: boolean };

export default function KycScreen() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<Step>('aadhaar');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Aadhaar
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [aadhaarName, setAadhaarName] = useState('');

  // PAN
  const [panNumber, setPanNumber] = useState('');

  // Bank
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [showAccount, setShowAccount] = useState(false);

  // Verification status
  const [verified, setVerified] = useState<VerifiedSteps>({
    aadhaar: false,
    pan: false,
    bank: false,
  });

  const allVerified = verified.aadhaar && verified.pan && verified.bank;

  // ── Aadhaar Step 1: Send OTP ──
  const handleVerifyAadhaar = async () => {
    if (aadhaarNumber.replace(/\s/g, '').length !== 12) {
      setError('Enter a valid 12-digit Aadhaar number');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 1500)); // Simulate API
      setCurrentStep('aadhaar_otp');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to verify Aadhaar');
    } finally {
      setLoading(false);
    }
  };

  // ── Aadhaar Step 2: Confirm OTP ──
  const handleConfirmAadhaarOtp = async () => {
    if (aadhaarOtp.length !== 6) {
      setError('Enter the 6-digit OTP sent to your Aadhaar-linked mobile');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setAadhaarName('Arjun R'); // Simulated response
      setVerified((v) => ({ ...v, aadhaar: true }));
      setCurrentStep('pan');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Invalid OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── PAN Verification ──
  const handleVerifyPan = async () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panRegex.test(panNumber.toUpperCase())) {
      setError('Enter a valid PAN (e.g., ABCDE1234F)');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setVerified((v) => ({ ...v, pan: true }));
      setAccountName(aadhaarName); // Auto-fill from Aadhaar
      setCurrentStep('bank');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'PAN verification failed');
    } finally {
      setLoading(false);
    }
  };

  // ── Bank Verification ──
  const handleVerifyBank = async () => {
    if (!accountNumber || accountNumber.length < 9) {
      setError('Enter a valid account number');
      return;
    }
    if (accountNumber !== confirmAccountNumber) {
      setError('Account numbers do not match');
      return;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.toUpperCase())) {
      setError('Enter a valid IFSC code (e.g., SBIN0001234)');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 2000)); // Penny drop takes longer
      setVerified((v) => ({ ...v, bank: true }));
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Bank verification failed');
    } finally {
      setLoading(false);
    }
  };

  // ── Format Aadhaar with spaces ──
  const formatAadhaar = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 12);
    const parts = digits.match(/.{1,4}/g);
    return parts ? parts.join(' ') : digits;
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-gray-100 sticky top-0 z-10">
        <button
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ArrowLeft size={22} color={colors.brand} strokeWidth={2.5} />
        </button>
        <h1 className="text-[17px] font-bold text-[#152E4B]">Identity Verification</h1>
        <div className="w-[38px]" />
      </header>

      <main className="flex-1 w-full max-w-md mx-auto p-5 pb-16 overflow-y-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 gap-1 relative z-0">
          <StepIndicator
            icon={
              <ShieldCheck
                size={18}
                color={verified.aadhaar ? '#FFFFFF' : '#152E4B'}
              />
            }
            label="Aadhaar"
            done={verified.aadhaar}
            active={currentStep === 'aadhaar' || currentStep === 'aadhaar_otp'}
          />
          <div
            className={`w-8 h-[2px] mx-0.5 mt-[-18px] transition-colors ${
              verified.aadhaar ? 'bg-[#059669]' : 'bg-[#E5E7EB]'
            }`}
          />
          <StepIndicator
            icon={
              <CreditCard
                size={18}
                color={verified.pan ? '#FFFFFF' : '#152E4B'}
              />
            }
            label="PAN"
            done={verified.pan}
            active={currentStep === 'pan'}
          />
          <div
            className={`w-8 h-[2px] mx-0.5 mt-[-18px] transition-colors ${
              verified.pan ? 'bg-[#059669]' : 'bg-[#E5E7EB]'
            }`}
          />
          <StepIndicator
            icon={
              <Landmark
                size={18}
                color={verified.bank ? '#FFFFFF' : '#152E4B'}
              />
            }
            label="Bank"
            done={verified.bank}
            active={currentStep === 'bank'}
          />
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-1.5 mb-5 py-2 px-4 bg-[#ECFDF5] border border-[#A7F3D0] rounded-full mx-auto w-max shadow-sm">
          <Lock size={14} color={colors.success} />
          <span className="text-xs font-semibold text-[#059669]">
            Secured by DigiLocker · Government of India
          </span>
        </div>

        {/* Error message */}
        {error ? (
          <div className="flex items-center gap-2 p-3.5 bg-[#FEF2F2] rounded-xl mb-4 text-[#DC2626]">
            <AlertCircle size={16} className="shrink-0" />
            <p className="text-[13px] leading-snug font-medium flex-1">{error}</p>
          </div>
        ) : null}

        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(3,9,22,0.06)] relative overflow-hidden">
          {/* ═══ AADHAAR STEP ═══ */}
          {currentStep === 'aadhaar' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-[22px] font-bold text-[#152E4B] mb-2">Aadhaar Verification</h2>
              <p className="text-[14px] text-[#6B7280] leading-[20px] mb-6">
                Enter your 12-digit Aadhaar number. We'll send an OTP to your
                Aadhaar-linked mobile number.
              </p>

              <label className="block text-[12px] font-semibold text-[#152E4B] mb-1.5 mt-3">
                Aadhaar Number
              </label>
              <input
                type="text"
                className="w-full bg-[#F3F4F6] rounded-xl py-3.5 px-4 text-[16px] text-[#030916] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#152E4B] focus:border-transparent transition-all placeholder-[#9CA3AF]"
                placeholder="XXXX XXXX XXXX"
                value={aadhaarNumber}
                onChange={(e) => {
                  setAadhaarNumber(formatAadhaar(e.target.value));
                  setError('');
                }}
                maxLength={14}
              />

              <button
                className={`w-full bg-[#152E4B] text-white rounded-xl py-3.5 mt-6 flex items-center justify-center font-bold text-[15px] transition-all hover:bg-[#1a385b] active:scale-[0.98] ${
                  loading ? 'opacity-70 pointer-events-none' : ''
                }`}
                onClick={handleVerifyAadhaar}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send OTP'}
              </button>
            </div>
          )}

          {/* ═══ AADHAAR OTP STEP ═══ */}
          {currentStep === 'aadhaar_otp' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-[22px] font-bold text-[#152E4B] mb-2">Enter Aadhaar OTP</h2>
              <p className="text-[14px] text-[#6B7280] leading-[20px] mb-6">
                A 6-digit OTP has been sent to your Aadhaar-linked mobile
                number.
              </p>

              <label className="block text-[12px] font-semibold text-[#152E4B] mb-1.5 mt-3">
                OTP
              </label>
              <input
                type="text"
                autoFocus
                className="w-full bg-[#F3F4F6] rounded-xl py-3.5 px-4 text-[22px] text-center tracking-[8px] text-[#030916] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#152E4B] focus:border-transparent transition-all placeholder-[#9CA3AF]"
                placeholder="• • • • • •"
                value={aadhaarOtp}
                onChange={(e) => {
                  setAadhaarOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                maxLength={6}
              />

              <button
                className={`w-full bg-[#152E4B] text-white rounded-xl py-3.5 mt-6 flex items-center justify-center font-bold text-[15px] transition-all hover:bg-[#1a385b] active:scale-[0.98] ${
                  loading ? 'opacity-70 pointer-events-none' : ''
                }`}
                onClick={handleConfirmAadhaarOtp}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify Aadhaar'}
              </button>

              <button
                className="w-full mt-4 flex justify-center py-2 text-[14px] font-semibold text-[#152E4B] hover:opacity-80 transition-opacity"
                onClick={() => {
                  setCurrentStep('aadhaar');
                  setAadhaarOtp('');
                }}
              >
                Resend OTP
              </button>
            </div>
          )}

          {/* ═══ PAN STEP ═══ */}
          {currentStep === 'pan' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Aadhaar success banner */}
              <div className="flex items-center gap-2 p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl mb-5">
                <CheckCircle2 size={18} className="text-[#059669]" fill="#A7F3D0" />
                <span className="text-[13px] font-semibold text-[#059669]">
                  Aadhaar verified as {aadhaarName}
                </span>
              </div>

              <h2 className="text-[22px] font-bold text-[#152E4B] mb-2">PAN Verification</h2>
              <p className="text-[14px] text-[#6B7280] leading-[20px] mb-6">
                Enter your 10-character PAN number. We'll verify it matches your
                Aadhaar name.
              </p>

              <label className="block text-[12px] font-semibold text-[#152E4B] mb-1.5 mt-3">
                PAN Number
              </label>
              <input
                type="text"
                autoFocus
                className="w-full bg-[#F3F4F6] rounded-xl py-3.5 px-4 text-[16px] uppercase tracking-[2px] text-[#030916] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#152E4B] focus:border-transparent transition-all placeholder-[#9CA3AF]"
                placeholder="ABCDE1234F"
                value={panNumber}
                onChange={(e) => {
                  setPanNumber(e.target.value.toUpperCase().slice(0, 10));
                  setError('');
                }}
                maxLength={10}
              />

              <button
                className={`w-full bg-[#152E4B] text-white rounded-xl py-3.5 mt-6 flex items-center justify-center font-bold text-[15px] transition-all hover:bg-[#1a385b] active:scale-[0.98] ${
                  loading ? 'opacity-70 pointer-events-none' : ''
                }`}
                onClick={handleVerifyPan}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify PAN'}
              </button>
            </div>
          )}

          {/* ═══ BANK STEP ═══ */}
          {currentStep === 'bank' && !verified.bank && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {/* PAN success banner */}
              <div className="flex items-center gap-2 p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl mb-5">
                <CheckCircle2 size={18} className="text-[#059669]" fill="#A7F3D0" />
                <span className="text-[13px] font-semibold text-[#059669]">
                  PAN verified successfully
                </span>
              </div>

              <h2 className="text-[22px] font-bold text-[#152E4B] mb-2">Bank Account</h2>
              <p className="text-[14px] text-[#6B7280] leading-[20px] mb-6">
                Add your bank account for payouts. We'll verify with a ₹1 test
                transfer.
              </p>

              <label className="block text-[12px] font-semibold text-[#152E4B] mb-1.5 mt-3">
                Account Holder Name
              </label>
              <input
                type="text"
                disabled
                className="w-full bg-[#E5E7EB] rounded-xl py-3.5 px-4 text-[16px] text-[#6B7280] border border-[#E5E7EB] cursor-not-allowed font-medium"
                value={accountName}
              />

              <label className="block text-[12px] font-semibold text-[#152E4B] mb-1.5 mt-4">
                Account Number
              </label>
              <div className="relative">
                <input
                  type={showAccount ? 'text' : 'password'}
                  className="w-full bg-[#F3F4F6] rounded-xl py-3.5 pl-4 pr-12 text-[16px] text-[#030916] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#152E4B] focus:border-transparent transition-all placeholder-[#9CA3AF]"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#6B7280] hover:text-[#030916] transition-colors"
                  onClick={() => setShowAccount(!showAccount)}
                >
                  {showAccount ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <label className="block text-[12px] font-semibold text-[#152E4B] mb-1.5 mt-4">
                Confirm Account Number
              </label>
              <input
                type="text"
                className="w-full bg-[#F3F4F6] rounded-xl py-3.5 px-4 text-[16px] text-[#030916] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#152E4B] focus:border-transparent transition-all placeholder-[#9CA3AF]"
                placeholder="Re-enter account number"
                value={confirmAccountNumber}
                onChange={(e) => {
                  setConfirmAccountNumber(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
              />

              <label className="block text-[12px] font-semibold text-[#152E4B] mb-1.5 mt-4">
                IFSC Code
              </label>
              <input
                type="text"
                className="w-full bg-[#F3F4F6] rounded-xl py-3.5 px-4 text-[16px] uppercase tracking-[1px] text-[#030916] border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#152E4B] focus:border-transparent transition-all placeholder-[#9CA3AF]"
                placeholder="SBIN0001234"
                value={ifscCode}
                onChange={(e) => {
                  setIfscCode(e.target.value.toUpperCase().slice(0, 11));
                  setError('');
                }}
                maxLength={11}
              />

              <button
                className={`w-full bg-[#152E4B] text-white rounded-xl py-3.5 mt-6 flex items-center justify-center font-bold text-[15px] transition-all hover:bg-[#1a385b] active:scale-[0.98] ${
                  loading ? 'opacity-70 pointer-events-none' : ''
                }`}
                onClick={handleVerifyBank}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  'Verify Bank Account'
                )}
              </button>

              <p className="text-[11px] text-[#9CA3AF] text-center mt-3 leading-[16px]">
                A ₹1 test deposit will be made to verify your account. This may
                take up to 30 seconds.
              </p>
            </div>
          )}

          {/* ═══ ALL VERIFIED ═══ */}
          {allVerified && (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="flex justify-center mb-4 mt-2">
                <CheckCircle2 size={56} className="text-[#059669]" fill="#A7F3D0" />
              </div>
              <h2 className="text-[22px] font-bold text-[#152E4B] mb-2 text-center">
                All Verified!
              </h2>
              <p className="text-[14px] text-[#6B7280] leading-[20px] mb-6 text-center">
                Your identity and bank account are verified. You can now proceed
                to upload your video portfolio.
              </p>

              <div className="bg-[#F3F4F6] rounded-2xl p-4 mb-6 flex flex-col gap-3">
                <SummaryRow
                  label="Aadhaar"
                  value={`•••• •••• ${aadhaarNumber.slice(-4)}`}
                />
                <SummaryRow
                  label="PAN"
                  value={`${panNumber.slice(0, 3)}•••••${panNumber.slice(-1)}`}
                />
                <SummaryRow
                  label="Bank"
                  value={`A/C ••••${accountNumber.slice(-4)}`}
                />
              </div>

              <button
                className="w-full bg-[#152E4B] text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-[15px] transition-all hover:bg-[#1a385b] active:scale-[0.98]"
                onClick={() => router.push('/provider/video-portfolio')}
              >
                <span>Continue to Video Portfolio</span>
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Small Components ──

function StepIndicator({
  icon,
  label,
  done,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  done: boolean;
  active: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-14">
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${
          done
            ? 'border-[#059669] bg-[#059669]'
            : active
            ? 'border-[#152E4B] bg-[#152E4B] bg-opacity-5'
            : 'border-[#E5E7EB] bg-white'
        }`}
      >
        {done ? (
          <CheckCircle2 size={20} className="text-white" fill="#059669" />
        ) : (
          icon
        )}
      </div>
      <span
        className={`text-[11px] whitespace-nowrap transition-colors ${
          done
            ? 'text-[#059669] font-bold'
            : active
            ? 'text-[#152E4B] font-bold'
            : 'text-[#6B7280] font-medium'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 size={16} className="text-[#059669]" fill="#A7F3D0" />
        <span className="text-[14px] font-bold text-[#152E4B]">{label}</span>
      </div>
      <span className="text-[13px] text-[#6B7280] font-mono tracking-tight font-medium">
        {value}
      </span>
    </div>
  );
}
