import { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";
import { useFlowyStore } from "../../state/store";
import { RECOMMENDED_SERVICES } from "../../data/scripted";
import type { RecommendedService } from "../../data/scripted";

// SCRIPTED: deterministic mock for demo — external-partner offerings
const EXTERNAL_PARTNERS: RecommendedService[] = [
  {
    id: "ext_jeep",
    name: "Tramuntana Jeep Safari",
    category: "tour",
    priceEur: 110,
    description: "Half-day off-road tour through the Tramuntana mountains.",
    durationMinutes: 240,
    matchReason: "Popular with adventure-seeking guests this week.",
  },
  {
    id: "ext_diving",
    name: "Discover Scuba Diving",
    category: "tour",
    priceEur: 95,
    description: "Beginner-friendly intro dive at Cala Marsal reef.",
    durationMinutes: 180,
    matchReason: "Matches your water-sports preference.",
  },
  {
    id: "ext_winery",
    name: "Binissalem Winery Tasting",
    category: "dining",
    priceEur: 65,
    description: "Guided tasting of four DO Binissalem wines with charcuterie.",
    durationMinutes: 90,
    matchReason: "Pairs well with tonight's free evening.",
  },
];

type Section = "on_resort" | "external";

export default function ExploreTab() {
  const [section, setSection] = useState<Section>("on_resort");
  const [bookedJustNow, setBookedJustNow] = useState<RecommendedService | null>(
    null
  );
  const bookService = useFlowyStore((s) => s.bookService);
  const bookings = useFlowyStore((s) => s.bookings);

  const items = section === "on_resort" ? RECOMMENDED_SERVICES : EXTERNAL_PARTNERS;

  function handleBook(svc: RecommendedService) {
    if (section === "on_resort") {
      bookService(svc.id);
    }
    // SCRIPTED: external partners shown as confirmed visually only
    setBookedJustNow(svc);
  }

  return (
    <div className="px-5 pt-4 pb-6 space-y-4">
      <header>
        <p className="text-xs text-muted">Explore</p>
        <h1 className="text-2xl font-bold text-navy">Things to do</h1>
      </header>

      {/* Section tabs */}
      <div className="flex bg-navy/5 rounded-xl p-1">
        <SectionPill
          active={section === "on_resort"}
          onClick={() => setSection("on_resort")}
        >
          On-resort
        </SectionPill>
        <SectionPill
          active={section === "external"}
          onClick={() => setSection("external")}
        >
          External partners
        </SectionPill>
      </div>

      {/* Service cards */}
      <div className="space-y-3">
        {items.map((svc) => {
          const alreadyBooked = bookings.some((b) => b.serviceId === svc.id);
          return (
            <article
              key={svc.id}
              className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-navy">{svc.name}</h3>
                  <p className="text-[11px] text-muted mt-1">{svc.description}</p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    section === "on_resort"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-sand/20 text-sand"
                  }`}
                >
                  {section === "on_resort" ? "Available today" : "Partner"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-muted italic">
                <Sparkles className="w-3 h-3 text-sand" />
                {/* SCRIPTED: deterministic mock for demo */}
                AI: {svc.matchReason}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-navy/5">
                <span className="text-base font-bold text-navy">
                  €{svc.priceEur}
                </span>
                <button
                  onClick={() => handleBook(svc)}
                  disabled={alreadyBooked && section === "on_resort"}
                  className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                    alreadyBooked && section === "on_resort"
                      ? "bg-navy/5 text-muted"
                      : "bg-navy text-white hover:bg-navy/90"
                  }`}
                >
                  {alreadyBooked && section === "on_resort"
                    ? "Booked ✓"
                    : "Book now"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Success modal */}
      {bookedJustNow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
          onClick={() => setBookedJustNow(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-xs w-full shadow-2xl text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBookedJustNow(null)}
              className="absolute top-2 right-2 text-muted hover:text-navy"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-navy mt-3">Booked!</h3>
            <p className="text-xs text-muted mt-1">{bookedJustNow.name}</p>
            <p className="text-[11px] text-muted mt-2">
              {/* SCRIPTED: deterministic mock for demo */}
              Confirmation sent · charged to room.
            </p>
            <button
              onClick={() => setBookedJustNow(null)}
              className="mt-4 w-full bg-navy text-white text-xs font-semibold py-2 rounded-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface SectionPillProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function SectionPill({ active, onClick, children }: SectionPillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors ${
        active ? "bg-white text-navy shadow-sm" : "text-muted"
      }`}
    >
      {children}
    </button>
  );
}
