
import React, { useEffect, useState } from 'react';

interface PulseLoaderProps {
  onFinish?: () => void;
  isLoading: boolean;
}

const PulseLoader: React.FC<PulseLoaderProps> = ({ onFinish, isLoading }) => {
  const [phase, setPhase] = useState<'drawing' | 'approaching' | 'done'>('drawing');

  useEffect(() => {
    if (isLoading) {
      setPhase('drawing');
      
      // Phase 1: Drawing the ECG (1.2s)
      const approachTimer = setTimeout(() => {
        setPhase('approaching');
      }, 1200);

      // Phase 2: Logo approach (1.3s)
      const finishTimer = setTimeout(() => {
        setPhase('done');
        if (onFinish) onFinish();
      }, 2500);

      return () => {
        clearTimeout(approachTimer);
        clearTimeout(finishTimer);
      };
    } else {
      setPhase('done');
    }
  }, [isLoading, onFinish]);

  // If phase is 'done', we unmount the component early.
  // This causes TypeScript to narrow the type of 'phase' to exclude 'done' in the code below.
  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center transition-opacity duration-700">
      <div className="relative w-full max-w-md h-64 flex items-center justify-center perspective-1000">
        
        {/* Main Logo (Horizontal) with 3D Approach Effect */}
        <div className={`absolute transition-all duration-1000 transform-gpu flex flex-col items-center ${
          phase === 'approaching' 
            ? 'opacity-100 scale-100 translate-z-0 rotate-y-0' 
            : 'opacity-0 scale-50 -translate-z-500 rotate-y-12'
        }`}>
          <img 
            src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" 
            alt="MEDVIDA Logo" 
            className="h-12 md:h-16 w-auto drop-shadow-[0_15px_40px_rgba(0,102,204,0.2)]"
          />
        </div>
        
        {/* ECG Pulse Animation */}
        <svg 
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${phase === 'drawing' ? 'opacity-100' : 'opacity-0'}`} 
          viewBox="0 0 400 200" 
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M0,100 L150,100 L160,120 L180,20 L200,180 L220,70 L230,100 L400,100"
            fill="none"
            stroke="#00B366"
            strokeWidth="4"
            strokeLinecap="round"
            className="ecg-line-path"
          />
        </svg>
      </div>
      
      {/* Fix: Removed the ternary comparison 'phase !== done' because 'phase' is narrowed to exclude 'done' here */}
      <div className="mt-8 transition-all duration-500 flex flex-col items-center gap-4 opacity-100 translate-y-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-ping"></div>
          <p className="text-[#003B73] font-black text-xs tracking-[0.6em] uppercase">Sincronizando</p>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .translate-z-0 {
          transform: translateZ(0);
        }
        
        .-translate-z-500 {
          transform: translateZ(-500px);
        }

        .ecg-line-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-ecg-path 1.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
        }

        @keyframes draw-ecg-path {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default PulseLoader;
