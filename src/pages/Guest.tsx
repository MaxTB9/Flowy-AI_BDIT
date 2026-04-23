import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import TabBar, { type GuestTab } from "../components/guest/TabBar";
import HomeTab from "../components/guest/HomeTab";
import RoomTab from "../components/guest/RoomTab";
import ExploreTab from "../components/guest/ExploreTab";
import ConciergeTab from "../components/guest/ConciergeTab";
import AccountTab from "../components/guest/AccountTab";

export default function Guest() {
  const [tab, setTab] = useState<GuestTab>("home");

  return (
    <PhoneFrame>
      <div className="h-full flex flex-col bg-slate-50">
        {/* Floating back link, sits over content */}
        <Link
          to="/"
          className="absolute top-12 right-3 z-40 inline-flex items-center gap-1 text-[10px] text-muted bg-white/80 backdrop-blur px-2 py-1 rounded-full hover:text-navy"
        >
          <ArrowLeft className="w-3 h-3" />
          Exit
        </Link>

        <main className="flex-1 overflow-y-auto bg-slate-50">
          {tab === "home" && <HomeTab goTo={setTab} />}
          {tab === "room" && <RoomTab />}
          {tab === "explore" && <ExploreTab />}
          {tab === "concierge" && <ConciergeTab />}
          {tab === "account" && <AccountTab />}
        </main>

        <TabBar active={tab} onChange={setTab} />
      </div>
    </PhoneFrame>
  );
}
