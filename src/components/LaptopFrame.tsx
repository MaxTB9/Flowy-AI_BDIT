import type { ReactNode } from "react";

interface LaptopFrameProps {
  children: ReactNode;
}

// Realistic laptop bezel — 1280px screen, centered on desktop.
export default function LaptopFrame({ children }: LaptopFrameProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="w-full" style={{ maxWidth: "1360px" }}>
        {/* Lid / bezel */}
        <div className="relative bg-neutral-900 rounded-t-2xl p-3 pb-4 shadow-2xl">
          {/* Camera dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-700 rounded-full" />
          {/* Screen */}
          <div
            className="w-full bg-canvas rounded overflow-hidden"
            style={{ height: "780px" }}
          >
            <div className="w-full h-full overflow-auto">{children}</div>
          </div>
        </div>
        {/* Hinge / base */}
        <div className="relative">
          <div className="h-3 bg-neutral-800 rounded-b-md mx-[-2%]" />
          <div className="h-1.5 bg-neutral-700 rounded-b-2xl mx-[-3%]" />
          {/* Trackpad notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-neutral-950 rounded-b-md" />
        </div>
      </div>
    </div>
  );
}
