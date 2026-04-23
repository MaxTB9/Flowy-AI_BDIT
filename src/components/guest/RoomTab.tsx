import { useState } from "react";
import {
  Lightbulb,
  Blinds,
  Tv,
  BellOff,
  KeyRound,
  Snowflake,
  Sparkles,
  CalendarX,
  Check,
} from "lucide-react";
import { useFlowyStore } from "../../state/store";

export default function RoomTab() {
  const guest = useFlowyStore((s) => s.currentGuest);
  const cleaningRequest = useFlowyStore((s) => s.cleaningRequest);
  const toggleCleaning = useFlowyStore((s) => s.toggleCleaning);

  const [temp, setTemp] = useState(22);
  const [lights, setLights] = useState(true);
  const [blinds, setBlinds] = useState(false);
  const [tv, setTv] = useState(false);
  const [dnd, setDnd] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  function handleUnlock() {
    if (unlocking) return;
    setUnlocking(true);
    setUnlocked(false);
    // SCRIPTED: deterministic mock for demo
    window.setTimeout(() => {
      setUnlocking(false);
      setUnlocked(true);
      window.setTimeout(() => setUnlocked(false), 2200);
    }, 1100);
  }

  return (
    <div className="px-5 pt-4 pb-6 space-y-5">
      <header>
        <p className="text-xs text-muted">Smart room</p>
        <h1 className="text-2xl font-bold text-navy">Room {guest.room}</h1>
      </header>

      {/* Climate */}
      <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Snowflake className="w-4 h-4 text-navy" />
            <span className="text-sm font-semibold text-navy">Temperature</span>
          </div>
          <span className="text-2xl font-bold text-navy">{temp}°</span>
        </div>
        <input
          type="range"
          min={16}
          max={28}
          value={temp}
          onChange={(e) => setTemp(parseInt(e.target.value))}
          className="w-full accent-sand"
        />
        <div className="flex justify-between text-[10px] text-muted mt-1">
          <span>16°</span>
          <span>28°</span>
        </div>
      </section>

      {/* Toggles */}
      <section className="grid grid-cols-2 gap-2">
        <Toggle Icon={Lightbulb} label="Lights" on={lights} setOn={setLights} />
        <Toggle Icon={Blinds} label="Blinds" on={blinds} setOn={setBlinds} />
        <Toggle Icon={Tv} label="TV" on={tv} setOn={setTv} />
        <Toggle Icon={BellOff} label="Do not disturb" on={dnd} setOn={setDnd} />
      </section>

      {/* Cleaning */}
      <section>
        <h2 className="text-sm font-semibold text-navy mb-2">Housekeeping</h2>
        <div className="grid grid-cols-2 gap-2">
          <CleaningButton
            Icon={Sparkles}
            label="Clean now"
            active={cleaningRequest === "clean_now"}
            onClick={() =>
              toggleCleaning(cleaningRequest === "clean_now" ? null : "clean_now")
            }
          />
          <CleaningButton
            Icon={CalendarX}
            label="Skip today"
            active={cleaningRequest === "skip_today"}
            onClick={() =>
              toggleCleaning(cleaningRequest === "skip_today" ? null : "skip_today")
            }
          />
        </div>
        {cleaningRequest && (
          <p className="text-[11px] text-muted mt-2 italic">
            {/* SCRIPTED: deterministic mock for demo */}
            Sent to housekeeping. They've been notified instantly.
          </p>
        )}
      </section>

      {/* Digital key */}
      <section>
        <button
          onClick={handleUnlock}
          disabled={unlocking}
          className={`w-full rounded-2xl py-5 flex flex-col items-center justify-center gap-2 transition-all shadow-soft ${
            unlocked
              ? "bg-emerald-500 text-white"
              : unlocking
              ? "bg-navy/80 text-white"
              : "bg-navy text-white hover:bg-navy/90"
          }`}
        >
          {unlocked ? (
            <>
              <Check className="w-7 h-7" />
              <span className="text-sm font-semibold">Door unlocked</span>
            </>
          ) : (
            <>
              <KeyRound
                className={`w-7 h-7 ${unlocking ? "animate-pulse" : ""}`}
              />
              <span className="text-sm font-semibold">
                {unlocking ? "Unlocking…" : "Tap to unlock"}
              </span>
            </>
          )}
        </button>
      </section>
    </div>
  );
}

interface ToggleProps {
  Icon: typeof Lightbulb;
  label: string;
  on: boolean;
  setOn: (v: boolean) => void;
}

function Toggle({ Icon, label, on, setOn }: ToggleProps) {
  return (
    <button
      onClick={() => setOn(!on)}
      className={`rounded-2xl p-3 flex flex-col items-start gap-3 border transition-all ${
        on
          ? "bg-sand/15 border-sand/40"
          : "bg-white border-navy/10 hover:bg-navy/5"
      }`}
    >
      <Icon className={`w-5 h-5 ${on ? "text-sand" : "text-navy/60"}`} />
      <div className="w-full flex items-center justify-between">
        <span className="text-xs font-semibold text-navy">{label}</span>
        <span
          className={`w-8 h-4 rounded-full relative transition-colors ${
            on ? "bg-sand" : "bg-navy/15"
          }`}
        >
          <span
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
              on ? "left-[18px]" : "left-0.5"
            }`}
          />
        </span>
      </div>
    </button>
  );
}

interface CleaningButtonProps {
  Icon: typeof Sparkles;
  label: string;
  active: boolean;
  onClick: () => void;
}

function CleaningButton({ Icon, label, active, onClick }: CleaningButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl p-3 flex items-center gap-2 border transition-all ${
        active
          ? "bg-navy text-white border-navy"
          : "bg-white text-navy border-navy/10 hover:bg-navy/5"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}
