import { CheckCircle2, Cpu, Router, Tv2 } from "lucide-react";

// SCRIPTED: deterministic mock for demo
const DEVICES = [
  { name: "Smart thermostats", count: 120, model: "Honeywell T9" },
  { name: "Door locks (NFC)", count: 120, model: "Salto KS" },
  { name: "Water flow meters", count: 64, model: "Sensus iPERL" },
  { name: "Energy sub-meters", count: 38, model: "Schneider PM5350" },
];

const INTEGRATIONS = [
  { name: "PMS", system: "Opera Cloud", Icon: Cpu },
  { name: "ERP", system: "SAP S/4HANA", Icon: Router },
  { name: "CRM", system: "Salesforce Hospitality", Icon: Tv2 },
];

const USERS = [
  { name: "Elena Ruiz", role: "General Manager", lastLogin: "5 min ago" },
  { name: "Marc Dupont", role: "Head of Operations", lastLogin: "1 h ago" },
  { name: "Aisha Khan", role: "Sustainability Lead", lastLogin: "Yesterday" },
  { name: "Tom Becker", role: "F&B Director", lastLogin: "2 days ago" },
];

const AUDIT_LOG = [
  "23 Apr 22:14 — Elena Ruiz acknowledged leak alert (Bungalow 42)",
  "23 Apr 21:48 — System: Booking #bk_3 created — Sunset Catamaran Tour",
  "23 Apr 20:30 — Marc Dupont updated housekeeping route AI weights",
  "23 Apr 18:02 — System: HVAC anomaly detected (Wing B)",
  "23 Apr 09:11 — Aisha Khan exported sustainability scorecard",
];

export default function SettingsView() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-bold text-navy">Settings</h1>
        <p className="text-xs text-muted">
          Devices, integrations, users, and audit log.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-3">
            Device inventory
          </h2>
          <table className="w-full text-xs">
            <tbody>
              {DEVICES.map((d) => (
                <tr key={d.name} className="border-b border-navy/5 last:border-0">
                  <td className="py-2 text-navy font-medium">{d.name}</td>
                  <td className="py-2 text-muted">{d.model}</td>
                  <td className="py-2 text-right text-navy">{d.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-3">Integrations</h2>
          <div className="space-y-2">
            {INTEGRATIONS.map(({ name, system, Icon }) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-lg border border-navy/10 p-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-navy" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-navy">{name}</p>
                  <p className="text-[11px] text-muted">{system}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3 h-3" /> Connected
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-3">Users</h2>
          <table className="w-full text-xs">
            <tbody>
              {USERS.map((u) => (
                <tr key={u.name} className="border-b border-navy/5 last:border-0">
                  <td className="py-2 text-navy font-medium">{u.name}</td>
                  <td className="py-2 text-muted">{u.role}</td>
                  <td className="py-2 text-right text-muted">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-3">Audit log</h2>
          <ul className="space-y-1.5 text-[11px] text-muted font-mono">
            {AUDIT_LOG.map((line) => (
              <li key={line} className="border-l-2 border-navy/20 pl-2">
                {line}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
