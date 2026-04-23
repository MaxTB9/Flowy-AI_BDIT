import { useState } from "react";
import { X } from "lucide-react";
import { DEMO_GUEST_ROWS, type DemoGuestRow } from "../../data/opsData";
import { useFlowyStore } from "../../state/store";

export default function GuestsView() {
  const bookings = useFlowyStore((s) => s.bookings);
  const [selected, setSelected] = useState<DemoGuestRow | null>(null);

  // SCRIPTED: deterministic mock for demo — Maria's spend tracks live store
  const mariaSpend = bookings
    .filter((b) => b.room === 214)
    .reduce((sum, b) => sum + b.priceEur, 0);

  const rows = DEMO_GUEST_ROWS.map((g) =>
    g.id === "g_maria" ? { ...g, spend: mariaSpend } : g
  );

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-bold text-navy">Guests</h1>
        <p className="text-xs text-muted">
          5 active guests · click a row for details.
        </p>
      </header>

      <section className="rounded-2xl bg-white border border-navy/10 shadow-soft overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-navy/5 text-muted">
            <tr className="text-left">
              <th className="px-4 py-2 font-medium">Guest</th>
              <th className="px-4 py-2 font-medium">Room</th>
              <th className="px-4 py-2 font-medium">Tier</th>
              <th className="px-4 py-2 font-medium">Day</th>
              <th className="px-4 py-2 font-medium">Preferences</th>
              <th className="px-4 py-2 font-medium text-right">Spend</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((g) => (
              <tr
                key={g.id}
                onClick={() => setSelected(g)}
                className="border-t border-navy/5 hover:bg-navy/5 cursor-pointer"
              >
                <td className="px-4 py-2.5 text-navy font-medium">{g.name}</td>
                <td className="px-4 py-2.5 text-navy">{g.room}</td>
                <td className="px-4 py-2.5">
                  <TierBadge tier={g.loyaltyTier} />
                </td>
                <td className="px-4 py-2.5 text-muted">Day {g.checkInDays}</td>
                <td className="px-4 py-2.5 text-muted">
                  {g.preferences.join(", ")}
                </td>
                <td className="px-4 py-2.5 text-right font-semibold text-navy">
                  €{g.spend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selected && (
        <Drawer guest={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const map: Record<string, string> = {
    Silver: "bg-slate-100 text-slate-600",
    Gold: "bg-sand/20 text-sand",
    Platinum: "bg-navy/10 text-navy",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
        map[tier] ?? "bg-slate-100"
      }`}
    >
      {tier}
    </span>
  );
}

function Drawer({
  guest,
  onClose,
}: {
  guest: DemoGuestRow;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative w-96 max-w-full bg-white shadow-2xl h-full p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted hover:text-navy"
        >
          <X className="w-4 h-4" />
        </button>
        <p className="text-[11px] text-muted">Guest profile</p>
        <h2 className="text-xl font-bold text-navy">{guest.name}</h2>
        <p className="text-xs text-muted mt-0.5">
          Room {guest.room} · Day {guest.checkInDays} of stay
        </p>

        <div className="mt-5 space-y-3 text-xs">
          <Row label="Loyalty tier" value={guest.loyaltyTier} />
          <Row label="In-stay spend" value={`€${guest.spend}`} />
          <Row label="Preferences" value={guest.preferences.join(", ")} />
        </div>

        <div className="mt-6 rounded-lg bg-sand/10 border border-sand/30 p-3">
          <p className="text-[11px] font-semibold text-navy mb-1">
            {/* SCRIPTED: deterministic mock for demo */}
            AI suggestion
          </p>
          <p className="text-[11px] text-muted">
            Offer a complimentary {guest.preferences[0]} session — high
            propensity to upgrade based on tier and stay-day patterns.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-navy/5 pb-2">
      <span className="text-muted">{label}</span>
      <span className="text-navy font-medium text-right">{value}</span>
    </div>
  );
}
