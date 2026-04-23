import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle, Download, Zap } from "lucide-react";
import { useFlowyStore } from "../../state/store";
import {
  ELECTRICITY_BY_ZONE,
  WATER_BY_ZONE,
} from "../../data/opsData";
import { WATER_LAST_7_DAYS } from "../../data/scripted";

const COLORS = ["#0B3B5C", "#C9A36A", "#3D7BA5"];

function buildSeries(zones: typeof WATER_BY_ZONE) {
  return WATER_LAST_7_DAYS.map((d, i) => {
    const row: Record<string, number | string> = { day: d.day };
    zones.forEach((z) => {
      row[z.zone] = z.data[i];
    });
    return row;
  });
}

export default function SustainabilityView() {
  const alerts = useFlowyStore((s) => s.alerts);
  const triggerLeakAlert = useFlowyStore((s) => s.triggerLeakAlert);

  const waterSeries = buildSeries(WATER_BY_ZONE);
  const electricitySeries = buildSeries(ELECTRICITY_BY_ZONE);

  const leakAlerts = alerts.filter((a) => a.title.toLowerCase().includes("leak"));

  function downloadScorecardPdf() {
    // SCRIPTED: deterministic mock for demo — fake PDF download
    const blob = new Blob(
      [
        "Bahía Azul Resort — Sustainability Scorecard\n" +
          "Period: Apr 17–23, 2026\n\n" +
          "Water consumption: 1,007.4 m³ (-3% vs prev. week)\n" +
          "Electricity: 20,875 kWh (+1% vs prev. week)\n" +
          "Open anomalies resolved within SLA: 96%\n\n" +
          "(Demo mock-up — not a real report.)\n",
      ],
      { type: "application/pdf" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flowy-sustainability-scorecard.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy">Sustainability</h1>
          <p className="text-xs text-muted">
            Water and electricity by zone, plus AI anomaly detection.
          </p>
        </div>
        <button
          onClick={triggerLeakAlert}
          className="text-[10px] text-muted hover:text-navy underline"
          title="Demo control"
        >
          Trigger leak alert
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Water by zone (m³)" data={waterSeries} zones={WATER_BY_ZONE} />
        <ChartCard
          title="Electricity by zone (kWh)"
          data={electricitySeries}
          zones={ELECTRICITY_BY_ZONE}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <section className="col-span-2 rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            Anomalies
          </h2>
          {leakAlerts.length === 0 ? (
            <p className="text-xs text-muted">No leak anomalies detected.</p>
          ) : (
            <div className="space-y-2">
              {leakAlerts.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 border border-rose-100 bg-rose-50/40 rounded-lg p-3"
                >
                  <Zap className="w-4 h-4 text-rose-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">{a.title}</p>
                    <p className="text-[11px] text-muted">{a.location}</p>
                    {a.acknowledged && (
                      <p className="text-[10px] text-emerald-700 mt-1">
                        Resolved · guest notified
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-2">Scorecard</h2>
          <div className="space-y-1.5 text-[11px]">
            <ScoreRow label="Water efficiency" value="A-" />
            <ScoreRow label="Energy efficiency" value="B+" />
            <ScoreRow label="Waste diversion" value="B" />
            <ScoreRow label="Guest satisfaction" value="A" />
          </div>
          <button
            onClick={downloadScorecardPdf}
            className="mt-3 w-full inline-flex items-center justify-center gap-1.5 bg-navy text-white text-xs font-semibold py-2 rounded-lg hover:bg-navy/90"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </section>
      </div>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  data: Record<string, number | string>[];
  zones: { zone: string }[];
}

function ChartCard({ title, data, zones }: ChartCardProps) {
  return (
    <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
      <h2 className="text-sm font-semibold text-navy mb-2">{title}</h2>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            {zones.map((z, i) => (
              <Line
                key={z.zone}
                type="monotone"
                dataKey={z.zone}
                stroke={COLORS[i % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function ScoreRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-bold text-navy">{value}</span>
    </div>
  );
}
