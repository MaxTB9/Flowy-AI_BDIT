import { useEffect, useState } from "react";
import { Sparkles, X, ShipWheel, Droplet, Eraser } from "lucide-react";
import { useFlowyStore } from "../state/store";

// SCRIPTED: deterministic mock for demo — hidden dev panel for the defense.
// Toggle visibility with the "D" key.

export default function DemoPanel() {
  const [open, setOpen] = useState(false);
  const bookService = useFlowyStore((s) => s.bookService);
  const triggerLeakAlert = useFlowyStore((s) => s.triggerLeakAlert);
  const toggleCleaning = useFlowyStore((s) => s.toggleCleaning);
  const cleaningRequest = useFlowyStore((s) => s.cleaningRequest);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "d" || e.key === "D") {
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-72 rounded-2xl bg-navy text-white shadow-2xl border border-white/10">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sand" />
          <span className="text-xs font-semibold">Demo script · press D</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-white/60 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-3 space-y-2">
        <DemoButton
          Icon={ShipWheel}
          label="Book catamaran (Maria)"
          onClick={() => bookService("svc_catamaran")}
        />
        <DemoButton
          Icon={Droplet}
          label="Trigger leak alert"
          onClick={() => triggerLeakAlert()}
        />
        <DemoButton
          Icon={Eraser}
          label={
            cleaningRequest === "skip_today"
              ? "Clear skip-cleaning"
              : "Toggle skip cleaning"
          }
          onClick={() =>
            toggleCleaning(
              cleaningRequest === "skip_today" ? null : "skip_today"
            )
          }
        />
      </div>
      <p className="px-4 pb-3 text-[10px] text-white/40">
        Hidden in production demos. Hit D to hide.
      </p>
    </div>
  );
}

interface DemoButtonProps {
  Icon: typeof Sparkles;
  label: string;
  onClick: () => void;
}

function DemoButton({ Icon, label, onClick }: DemoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 text-xs font-medium bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-left"
    >
      <Icon className="w-3.5 h-3.5 text-sand" />
      {label}
    </button>
  );
}
