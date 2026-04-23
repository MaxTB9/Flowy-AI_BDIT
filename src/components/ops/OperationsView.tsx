import { useMemo } from "react";
import { CheckCircle2, Clock, Wrench } from "lucide-react";
import { useFlowyStore } from "../../state/store";
import { PREDICTIVE_MAINTENANCE } from "../../data/opsData";
import RoomGrid from "./RoomGrid";

interface Task {
  id: string;
  title: string;
  room: number;
  state: "queued" | "in_progress" | "done";
}

// SCRIPTED: deterministic mock for demo
const BASE_TASKS: Task[] = [
  { id: "t1", title: "Stayover clean", room: 117, state: "in_progress" },
  { id: "t2", title: "Stayover clean", room: 308, state: "queued" },
  { id: "t3", title: "Turn-down service", room: 422, state: "queued" },
  { id: "t4", title: "Towel restock", room: 233, state: "done" },
];

export default function OperationsView() {
  const cleaningRequest = useFlowyStore((s) => s.cleaningRequest);
  const guest = useFlowyStore((s) => s.currentGuest);

  const tasks = useMemo<Task[]>(() => {
    const list = [...BASE_TASKS];
    if (cleaningRequest === "clean_now") {
      list.unshift({
        id: "t_guest_now",
        title: "Guest-requested clean (priority)",
        room: guest.room,
        state: "queued",
      });
    } else if (cleaningRequest === "skip_today") {
      list.unshift({
        id: "t_guest_skip",
        title: "Guest opted to skip cleaning",
        room: guest.room,
        state: "done",
      });
    }
    return list;
  }, [cleaningRequest, guest.room]);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-bold text-navy">Operations</h1>
        <p className="text-xs text-muted">
          Housekeeping routes, live tasks, and predictive maintenance.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <section className="col-span-2 rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-navy">
              Housekeeping route
            </h2>
            <span className="text-[11px] text-muted">
              Optimized by Flowy AI · 4 staff on shift
            </span>
          </div>
          <RoomGrid highlightRoom={guest.room} showStaff />
        </section>

        <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
          <h2 className="text-sm font-semibold text-navy mb-3">Task list</h2>
          <div className="space-y-2">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 rounded-lg border border-navy/10 p-2.5"
              >
                <TaskIcon state={t.state} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-navy truncate">
                    {t.title}
                  </p>
                  <p className="text-[11px] text-muted">Room {t.room}</p>
                </div>
                <StateBadge state={t.state} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-navy">
            Predictive maintenance
          </h2>
          <span className="text-[11px] text-muted">
            {/* SCRIPTED: deterministic mock for demo */}
            AI-ranked by failure risk
          </span>
        </div>
        <div className="space-y-3">
          {PREDICTIVE_MAINTENANCE.map((m) => (
            <div key={m.id} className="border border-navy/10 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-navy">{m.asset}</p>
                  <p className="text-[11px] text-muted">{m.prediction}</p>
                </div>
                <span className="text-[11px] text-muted whitespace-nowrap">
                  ETA ~{m.etaDays}d
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-navy/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sand"
                    style={{ width: `${Math.round(m.confidence * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-navy w-10 text-right">
                  {Math.round(m.confidence * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TaskIcon({ state }: { state: Task["state"] }) {
  if (state === "done")
    return (
      <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      </div>
    );
  if (state === "in_progress")
    return (
      <div className="w-7 h-7 rounded-lg bg-sand/15 flex items-center justify-center">
        <Wrench className="w-4 h-4 text-sand" />
      </div>
    );
  return (
    <div className="w-7 h-7 rounded-lg bg-navy/5 flex items-center justify-center">
      <Clock className="w-4 h-4 text-navy" />
    </div>
  );
}

function StateBadge({ state }: { state: Task["state"] }) {
  const map: Record<Task["state"], string> = {
    queued: "bg-navy/5 text-navy",
    in_progress: "bg-sand/15 text-sand",
    done: "bg-emerald-50 text-emerald-700",
  };
  const label: Record<Task["state"], string> = {
    queued: "Queued",
    in_progress: "In progress",
    done: "Done",
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${map[state]}`}
    >
      {label[state]}
    </span>
  );
}
