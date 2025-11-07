import React from "react";

export default function VaultError500() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-gray-300 font-mono relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-10 animate-pulse"></div>

      {/* Title */}
      <h1 className="text-[8rem] font-bold text-emerald-400 relative glitch mb-4 select-none">
        500
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-400 mb-3 tracking-wider uppercase">
        Vault Core Overheated
      </p>
      <p className="text-sm text-gray-500 mb-8">
        The system tried to unlock too many projects at once.
      </p>

      {/* Retry Button */}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 border border-emerald-500/50 text-emerald-300 hover:text-black hover:bg-emerald-400 px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300"
      >
        Retry Boot Sequence
      </button>

      {/* Footer line */}
      <p className="mt-10 text-xs text-gray-600">
        Error ID: <span className="text-emerald-400">VAULT-CORE-500</span>
      </p>

      {/* Glitch Animation */}
      <style>{`
        .glitch {
          position: relative;
          color: #34d399;
        }
        .glitch::before,
        .glitch::after {
          content: '500';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
        }
        .glitch::before {
          animation: glitchTop 2s infinite linear alternate-reverse;
          color: #00fff9;
        }
        .glitch::after {
          animation: glitchBottom 1.5s infinite linear alternate-reverse;
          color: #ff007f;
        }
        @keyframes glitchTop {
          0% { clip: rect(0, 9999px, 0, 0); transform: translate(0, 0); }
          10% { clip: rect(10px, 9999px, 85px, 0); transform: translate(-2px, -2px); }
          20% { clip: rect(85px, 9999px, 140px, 0); transform: translate(2px, 2px); }
          30% { clip: rect(0, 9999px, 0, 0); transform: translate(0, 0); }
          100% { clip: rect(0, 9999px, 0, 0); transform: translate(0, 0); }
        }
        @keyframes glitchBottom {
          0% { clip: rect(0, 9999px, 0, 0); transform: translate(0, 0); }
          15% { clip: rect(50px, 9999px, 100px, 0); transform: translate(2px, 2px); }
          25% { clip: rect(100px, 9999px, 150px, 0); transform: translate(-2px, -2px); }
          35% { clip: rect(0, 9999px, 0, 0); transform: translate(0, 0); }
          100% { clip: rect(0, 9999px, 0, 0); transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
