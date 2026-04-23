import { Link } from "react-router-dom";
import { Smartphone, LayoutDashboard, ArrowRight, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* Hero */}
      <section
        className="flex-1 flex items-center justify-center px-6 py-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,59,92,0.04) 0%, rgba(201,163,106,0.06) 100%)",
        }}
      >
        <div className="max-w-5xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-navy/10 text-xs font-medium text-navy/70 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-sand" />
            FLOWY AI · Academic concept
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-navy tracking-tight leading-[1.05]">
            The operating system
            <br />
            for all-inclusive resorts.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            One AI platform connecting{" "}
            <span className="text-navy font-semibold">guest experience</span>,{" "}
            <span className="text-navy font-semibold">operations</span>, and{" "}
            <span className="text-navy font-semibold">sustainability</span> —
            so the whole resort runs in flow.
          </p>

          {/* Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <Link
              to="/guest"
              className="group rounded-2xl bg-white border border-navy/10 p-8 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-navy" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted group-hover:text-sand group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-navy">
                Open the Guest App
              </h3>
              <p className="mt-2 text-muted">
                The mobile experience your guests carry in their pocket —
                room control, concierge, recommendations.
              </p>
            </Link>

            <Link
              to="/ops"
              className="group rounded-2xl bg-white border border-navy/10 p-8 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-sand/15 flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-sand" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted group-hover:text-sand group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-2xl font-bold text-navy">
                Open the Operations Dashboard
              </h3>
              <p className="mt-2 text-muted">
                The control room for managers — revenue, alerts, energy &
                water, staffing, sustainability.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="border-t border-navy/10 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 text-center text-xs text-muted">
          Academic mock-up — scripted data. Not a working product. No real AI,
          no live data, no backend.
        </div>
      </footer>
    </div>
  );
}
