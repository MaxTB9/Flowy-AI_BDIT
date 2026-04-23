import {
  LayoutGrid,
  TrendingUp,
  Wrench,
  Leaf,
  Users,
  Settings,
  Sparkles,
} from "lucide-react";

export type OpsView =
  | "overview"
  | "revenue"
  | "operations"
  | "sustainability"
  | "guests"
  | "settings";

interface SidebarProps {
  active: OpsView;
  onChange: (v: OpsView) => void;
}

const ITEMS: { id: OpsView; label: string; Icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", Icon: LayoutGrid },
  { id: "revenue", label: "Revenue", Icon: TrendingUp },
  { id: "operations", label: "Operations", Icon: Wrench },
  { id: "sustainability", label: "Sustainability", Icon: Leaf },
  { id: "guests", label: "Guests", Icon: Users },
  { id: "settings", label: "Settings", Icon: Settings },
];

export default function Sidebar({ active, onChange }: SidebarProps) {
  return (
    <aside className="w-56 bg-navy text-white h-full flex flex-col">
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sand/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-sand" />
          </div>
          <div>
            <p className="text-sm font-bold">FLOWY AI</p>
            <p className="text-[10px] text-white/60">Bahía Azul · Ops</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-0.5">
        {ITEMS.map(({ id, label, Icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 text-[10px] text-white/50">
        <p className="font-semibold text-white/70">Demo manager</p>
        <p>ops@bahiaazul.example</p>
      </div>
    </aside>
  );
}
