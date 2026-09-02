'use client';

// Clean background ambient accent component
export default function FloatingServices() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
    </div>
  );
}