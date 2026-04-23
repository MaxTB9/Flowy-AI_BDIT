import { RESORT } from "../../data/scripted";

// SCRIPTED: deterministic mock for demo — derive a reproducible status per room.
type RoomStatus = "occupied" | "vacant" | "cleaning" | "maintenance";

function statusForRoom(idx: number, occupiedCount: number): RoomStatus {
  if (idx < occupiedCount) {
    if (idx % 17 === 0) return "cleaning";
    if (idx % 23 === 0) return "maintenance";
    return "occupied";
  }
  return "vacant";
}

const COLORS: Record<RoomStatus, string> = {
  occupied: "bg-navy",
  vacant: "bg-navy/10",
  cleaning: "bg-sand",
  maintenance: "bg-rose-400",
};

interface RoomGridProps {
  highlightRoom?: number;
  showStaff?: boolean;
}

export default function RoomGrid({ highlightRoom, showStaff }: RoomGridProps) {
  const rooms = Array.from({ length: RESORT.totalRooms }, (_, i) => i);

  return (
    <div className="rounded-xl bg-slate-50 border border-navy/10 p-3">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}
      >
        {rooms.map((i) => {
          const status = statusForRoom(i, RESORT.occupiedRooms);
          const roomNumber = 100 + i;
          const isHighlight = highlightRoom === roomNumber;
          return (
            <div
              key={i}
              title={`Room ${roomNumber} · ${status}`}
              className={`aspect-square rounded ${COLORS[status]} ${
                isHighlight ? "ring-2 ring-sand ring-offset-1" : ""
              }`}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] text-muted">
        <Legend color="bg-navy" label="Occupied" />
        <Legend color="bg-navy/10" label="Vacant" />
        <Legend color="bg-sand" label="Cleaning" />
        <Legend color="bg-rose-400" label="Maintenance" />
        {showStaff && <Legend color="bg-emerald-400" label="Staff route" />}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded ${color}`} />
      {label}
    </span>
  );
}
