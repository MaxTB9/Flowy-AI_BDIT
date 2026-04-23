import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

// Realistic phone bezel — mobile width, centered on desktop.
export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="relative">
        {/* Outer bezel */}
        <div
          className="relative bg-neutral-900 rounded-[3rem] p-3 shadow-2xl"
          style={{ width: "390px", height: "780px" }}
        >
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-neutral-800 rounded-l" />
          <div className="absolute -left-[3px] top-44 w-[3px] h-16 bg-neutral-800 rounded-l" />
          <div className="absolute -left-[3px] top-64 w-[3px] h-16 bg-neutral-800 rounded-l" />
          <div className="absolute -right-[3px] top-40 w-[3px] h-24 bg-neutral-800 rounded-r" />

          {/* Screen */}
          <div className="relative w-full h-full bg-canvas rounded-[2.25rem] overflow-hidden">
            {/* Notch / dynamic island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-neutral-900 rounded-full z-50" />
            {/* Status bar spacer */}
            <div className="h-10 w-full" />
            {/* App content */}
            <div className="h-[calc(100%-2.5rem)] w-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
