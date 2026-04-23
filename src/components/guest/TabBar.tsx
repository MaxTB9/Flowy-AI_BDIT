import { Home, BedDouble, Compass, MessageCircle, User } from "lucide-react";

export type GuestTab = "home" | "room" | "explore" | "concierge" | "account";

interface TabBarProps {
  active: GuestTab;
  onChange: (tab: GuestTab) => void;
}

const TABS: { id: GuestTab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "room", label: "Room", Icon: BedDouble },
  { id: "explore", label: "Explore", Icon: Compass },
  { id: "concierge", label: "Concierge", Icon: MessageCircle },
  { id: "account", label: "Account", Icon: User },
];

export default function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="flex items-stretch justify-around bg-white border-t border-navy/10 h-16 px-1">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive ? "text-navy" : "text-muted hover:text-navy/70"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.4]" : ""}`} />
            <span
              className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
