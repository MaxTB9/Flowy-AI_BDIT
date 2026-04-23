import { Sun, CloudSun, Sparkles, Waves, BedDouble, ChevronRight } from "lucide-react";
import { useFlowyStore } from "../../state/store";
import { RECOMMENDED_SERVICES } from "../../data/scripted";
import type { GuestTab } from "./TabBar";

interface HomeTabProps {
  goTo: (tab: GuestTab) => void;
}

// SCRIPTED: deterministic mock for demo
const TODAYS_ACTIVITIES = [
  { time: "10:30", title: "Sunrise yoga on the beach", icon: Waves },
  { time: "13:00", title: "Paella cooking class", icon: Sparkles },
  { time: "19:30", title: "Live flamenco at Bar Azul", icon: Sun },
];

export default function HomeTab({ goTo }: HomeTabProps) {
  const guest = useFlowyStore((s) => s.currentGuest);
  const bookService = useFlowyStore((s) => s.bookService);
  const bookings = useFlowyStore((s) => s.bookings);

  const firstName = guest.name.split(" ")[0];

  return (
    <div className="px-5 pt-4 pb-6 space-y-5">
      {/* Greeting */}
      <header>
        <p className="text-xs text-muted">Good morning</p>
        <h1 className="text-2xl font-bold text-navy">{firstName} 👋</h1>
      </header>

      {/* Weather */}
      <div className="rounded-2xl bg-gradient-to-br from-navy to-navy/80 text-white p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70">Today · Mallorca</p>
            <p className="text-3xl font-bold mt-1">26°</p>
            <p className="text-xs text-white/70 mt-0.5">Sunny · light breeze</p>
          </div>
          <CloudSun className="w-14 h-14 text-sand" strokeWidth={1.5} />
        </div>
      </div>

      {/* What's on today */}
      <section>
        <h2 className="text-sm font-semibold text-navy mb-2">What's on today</h2>
        <div className="rounded-2xl bg-white border border-navy/10 divide-y divide-navy/10">
          {TODAYS_ACTIVITIES.map(({ time, title, icon: Icon }) => (
            <div key={title} className="flex items-center gap-3 p-3">
              <div className="w-9 h-9 rounded-lg bg-sand/15 flex items-center justify-center">
                <Icon className="w-4 h-4 text-sand" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted">{time}</p>
                <p className="text-sm text-navy font-medium">{title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI recommendations */}
      <section>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-sand" />
          <h2 className="text-sm font-semibold text-navy">Picked for you</h2>
        </div>
        <div className="space-y-2">
          {RECOMMENDED_SERVICES.map((svc) => {
            const alreadyBooked = bookings.some((b) => b.serviceId === svc.id);
            return (
              <div
                key={svc.id}
                className="rounded-2xl bg-white border border-navy/10 p-3 shadow-soft"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy">{svc.name}</p>
                    <p className="text-[11px] text-muted mt-0.5 italic">
                      {/* SCRIPTED: deterministic mock for demo */}
                      AI: {svc.matchReason}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-navy whitespace-nowrap">
                    €{svc.priceEur}
                  </span>
                </div>
                <button
                  onClick={() => bookService(svc.id)}
                  disabled={alreadyBooked}
                  className={`mt-2 w-full text-xs font-semibold py-2 rounded-lg transition-colors ${
                    alreadyBooked
                      ? "bg-navy/5 text-muted cursor-not-allowed"
                      : "bg-navy text-white hover:bg-navy/90"
                  }`}
                >
                  {alreadyBooked ? "Booked ✓" : "Book now"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Smart room shortcut */}
      <button
        onClick={() => goTo("room")}
        className="w-full rounded-2xl bg-white border border-navy/10 p-3 flex items-center gap-3 hover:bg-navy/5 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center">
          <BedDouble className="w-5 h-5 text-navy" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-navy">Smart room</p>
          <p className="text-[11px] text-muted">Lights, climate, key</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted" />
      </button>
    </div>
  );
}
