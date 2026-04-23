import { useState } from "react";
import { Crown, Receipt, Shield } from "lucide-react";
import { useFlowyStore } from "../../state/store";

// SCRIPTED: deterministic mock for demo — visual-only consent toggles
const CONSENT_ITEMS = [
  {
    key: "personalisation",
    label: "Personalised recommendations",
    blurb: "Use my stay activity to suggest services I might enjoy.",
    initial: true,
  },
  {
    key: "marketing",
    label: "Marketing emails",
    blurb: "Send me future promotions from Bahía Azul.",
    initial: false,
  },
  {
    key: "analytics",
    label: "Anonymous usage analytics",
    blurb: "Help us improve the app by sharing anonymous usage data.",
    initial: true,
  },
];

export default function AccountTab() {
  const guest = useFlowyStore((s) => s.currentGuest);
  const bookings = useFlowyStore((s) => s.bookings);

  const totalSpend = bookings.reduce((sum, b) => sum + b.priceEur, 0);

  const [consents, setConsents] = useState<Record<string, boolean>>(
    Object.fromEntries(CONSENT_ITEMS.map((c) => [c.key, c.initial]))
  );

  return (
    <div className="px-5 pt-4 pb-6 space-y-5">
      <header>
        <p className="text-xs text-muted">Account</p>
        <h1 className="text-2xl font-bold text-navy">{guest.name}</h1>
        <p className="text-xs text-muted mt-0.5">Room {guest.room}</p>
      </header>

      {/* Loyalty */}
      <section className="rounded-2xl bg-gradient-to-br from-sand to-sand/70 text-white p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/80">Loyalty status</p>
            <p className="text-2xl font-bold mt-1">{guest.loyaltyTier}</p>
            <p className="text-xs text-white/80 mt-0.5">
              {/* SCRIPTED: deterministic mock for demo */}
              2,840 points · 1,160 to Platinum
            </p>
          </div>
          <Crown className="w-12 h-12 text-white/90" strokeWidth={1.5} />
        </div>
      </section>

      {/* In-stay spend */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <Receipt className="w-4 h-4 text-navy" />
          <h2 className="text-sm font-semibold text-navy">In-stay spend</h2>
        </div>
        <div className="rounded-2xl bg-white border border-navy/10 divide-y divide-navy/10">
          {bookings.length === 0 ? (
            <p className="p-4 text-xs text-muted text-center">
              No bookings yet. Browse Explore to add experiences.
            </p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3">
                <div className="min-w-0">
                  <p className="text-sm text-navy font-medium truncate">
                    {b.serviceName}
                  </p>
                  <p className="text-[11px] text-muted">
                    Charged to room {b.room}
                  </p>
                </div>
                <span className="text-sm font-bold text-navy whitespace-nowrap">
                  €{b.priceEur}
                </span>
              </div>
            ))
          )}
          {bookings.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-navy/5">
              <span className="text-sm font-semibold text-navy">Total</span>
              <span className="text-base font-bold text-navy">
                €{totalSpend}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Consents */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-navy" />
          <h2 className="text-sm font-semibold text-navy">Privacy & consent</h2>
        </div>
        <div className="rounded-2xl bg-white border border-navy/10 divide-y divide-navy/10">
          {CONSENT_ITEMS.map((c) => {
            const on = consents[c.key];
            return (
              <button
                key={c.key}
                onClick={() => setConsents((p) => ({ ...p, [c.key]: !on }))}
                className="w-full flex items-start gap-3 p-3 text-left hover:bg-navy/5"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy font-medium">{c.label}</p>
                  <p className="text-[11px] text-muted mt-0.5">{c.blurb}</p>
                </div>
                <span
                  className={`mt-1 w-9 h-5 rounded-full relative transition-colors flex-shrink-0 ${
                    on ? "bg-sand" : "bg-navy/15"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                      on ? "left-[18px]" : "left-0.5"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-muted mt-2 text-center">
          {/* SCRIPTED: deterministic mock for demo */}
          Visual demo only — no data is actually collected.
        </p>
      </section>
    </div>
  );
}
