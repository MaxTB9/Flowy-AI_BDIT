import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFlowyStore } from "../../state/store";
import {
  BASE_TOP_SERVICES,
  CHANNEL_BOOKINGS,
  REVENUE_FUNNEL,
} from "../../data/opsData";

export default function RevenueView() {
  const bookings = useFlowyStore((s) => s.bookings);

  // SCRIPTED: deterministic mock for demo — merge live demo bookings into base list
  const services = [...BASE_TOP_SERVICES];
  for (const b of bookings) {
    const existing = services.find((s) => s.name === b.serviceName);
    if (existing) {
      existing.bookings += 1;
      existing.revenue += b.priceEur;
    } else {
      services.push({
        name: b.serviceName,
        bookings: 1,
        revenue: b.priceEur,
      });
    }
  }
  services.sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-bold text-navy">Revenue</h1>
        <p className="text-xs text-muted">
          Conversion, channel mix, and live top sellers.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-2">
            Recommendation funnel
          </h2>
          <p className="text-[11px] text-muted mb-2">
            From AI impression to booked service.
          </p>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={REVENUE_FUNNEL} isAnimationActive>
                  <LabelList
                    position="right"
                    fill="#0B3B5C"
                    stroke="none"
                    dataKey="name"
                    style={{ fontSize: 11 }}
                  />
                  <LabelList
                    position="left"
                    fill="#fff"
                    stroke="none"
                    dataKey="value"
                    style={{ fontSize: 11, fontWeight: 700 }}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-2">
            Inside Flowy AI vs estimated external leakage
          </h2>
          <p className="text-[11px] text-muted mb-2">
            Bookings the resort captured vs spent off-property.
          </p>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={CHANNEL_BOOKINGS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="channel" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="inside" name="Inside Flowy" fill="#0B3B5C" />
                <Bar dataKey="external" name="External" fill="#C9A36A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
        <h2 className="text-sm font-semibold text-navy mb-3">Top services</h2>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted border-b border-navy/10">
              <th className="py-2 font-medium">Service</th>
              <th className="py-2 font-medium text-right">Bookings</th>
              <th className="py-2 font-medium text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {services.slice(0, 6).map((s) => (
              <tr key={s.name} className="border-b border-navy/5 last:border-0">
                <td className="py-2 text-navy">{s.name}</td>
                <td className="py-2 text-right text-navy">{s.bookings}</td>
                <td className="py-2 text-right font-semibold text-navy">
                  €{s.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
