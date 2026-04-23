import { Euro, Droplet, AlertTriangle, BedDouble } from "lucide-react";
import { useFlowyStore } from "../../state/store";
import { RESORT } from "../../data/scripted";
import KpiCard from "./KpiCard";
import RoomGrid from "./RoomGrid";

const SEV_COLOR: Record<"low" | "medium" | "high", string> = {
  low: "bg-amber-100 text-amber-700",
  medium: "bg-orange-100 text-orange-700",
  high: "bg-rose-100 text-rose-700",
};

export default function OverviewView() {
  const kpis = useFlowyStore((s) => s.kpis);
  const alerts = useFlowyStore((s) => s.alerts);

  const occupancyPct = Math.round(
    (RESORT.occupiedRooms / RESORT.totalRooms) * 100
  );

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy">Overview</h1>
          <p className="text-xs text-muted">
            {RESORT.name} · {RESORT.location}
          </p>
        </div>
        <p className="text-[11px] text-muted">
          {/* SCRIPTED: deterministic mock for demo */}
          Updated just now · Wed 23 Apr 2026
        </p>
      </header>

      <div className="grid grid-cols-4 gap-3">
        <KpiCard
          label="Revenue today"
          value={kpis.revenueToday}
          formatter={(n) => `€${Math.round(n).toLocaleString()}`}
          delta="+8.2% vs avg"
          positive
          Icon={Euro}
        />
        <KpiCard
          label="Utilities today"
          value={kpis.waterToday}
          formatter={(n) => `${n.toFixed(1)} m³`}
          delta={`${kpis.electricityToday.toLocaleString()} kWh`}
          Icon={Droplet}
        />
        <KpiCard
          label="Alerts open"
          value={kpis.alertsOpen}
          delta={kpis.alertsOpen > 2 ? "Above threshold" : "Within target"}
          positive={kpis.alertsOpen <= 2}
          Icon={AlertTriangle}
        />
        <KpiCard
          label="Occupancy"
          value={occupancyPct}
          formatter={(n) => `${Math.round(n)}%`}
          delta={`${RESORT.occupiedRooms}/${RESORT.totalRooms} rooms`}
          positive
          Icon={BedDouble}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <section className="col-span-2 rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-navy">Resort map</h2>
            <span className="text-[11px] text-muted">120 rooms</span>
          </div>
          <RoomGrid highlightRoom={214} />
        </section>

        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft flex flex-col">
          <h2 className="text-sm font-semibold text-navy mb-3">Live alerts</h2>
          <div className="flex-1 space-y-2 overflow-y-auto">
            {alerts.length === 0 && (
              <p className="text-xs text-muted">No open alerts.</p>
            )}
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`rounded-lg p-2.5 border ${
                  a.acknowledged
                    ? "bg-slate-50 border-slate-200 opacity-60"
                    : "bg-white border-navy/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase ${SEV_COLOR[a.severity]}`}
                  >
                    {a.severity}
                  </span>
                  {a.acknowledged && (
                    <span className="text-[10px] text-muted">resolved</span>
                  )}
                </div>
                <p className="text-xs font-semibold text-navy mt-1.5">
                  {a.title}
                </p>
                <p className="text-[11px] text-muted">{a.location}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
