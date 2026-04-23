import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import LaptopFrame from "../components/LaptopFrame";
import Sidebar, { type OpsView } from "../components/ops/Sidebar";
import OverviewView from "../components/ops/OverviewView";
import RevenueView from "../components/ops/RevenueView";
import OperationsView from "../components/ops/OperationsView";
import SustainabilityView from "../components/ops/SustainabilityView";
import GuestsView from "../components/ops/GuestsView";
import SettingsView from "../components/ops/SettingsView";
import { useFlowyStore } from "../state/store";

export default function Ops() {
  const [view, setView] = useState<OpsView>("overview");
  const alerts = useFlowyStore((s) => s.alerts);
  const acknowledgeAlert = useFlowyStore((s) => s.acknowledgeAlert);

  const unackedLeak = alerts.find(
    (a) => a.guestVisible && !a.acknowledged && a.title.toLowerCase().includes("leak")
  );

  return (
    <LaptopFrame>
      <div className="h-full flex bg-slate-50">
        <Sidebar active={view} onChange={setView} />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 bg-white border-b border-navy/10 flex items-center justify-between px-5 flex-shrink-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-navy"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Exit demo
            </Link>
            {unackedLeak && (
              <button
                onClick={() => acknowledgeAlert(unackedLeak.id)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-full hover:bg-rose-100"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                Resolve leak alert & notify guest
              </button>
            )}
          </header>

          <main className="flex-1 overflow-y-auto p-5">
            {view === "overview" && <OverviewView />}
            {view === "revenue" && <RevenueView />}
            {view === "operations" && <OperationsView />}
            {view === "sustainability" && <SustainabilityView />}
            {view === "guests" && <GuestsView />}
            {view === "settings" && <SettingsView />}
          </main>
        </div>
      </div>
    </LaptopFrame>
  );
}
