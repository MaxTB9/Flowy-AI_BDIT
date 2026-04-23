import type { ReactNode } from "react";
import AnimatedNumber from "../AnimatedNumber";

interface KpiCardProps {
  label: string;
  value: number;
  formatter?: (n: number) => string;
  delta?: string;
  positive?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  children?: ReactNode;
}

export default function KpiCard({
  label,
  value,
  formatter,
  delta,
  positive,
  Icon,
  children,
}: KpiCardProps) {
  return (
    <div className="rounded-2xl bg-white border border-navy/10 p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-wide">
          {label}
        </p>
        <div className="w-8 h-8 rounded-lg bg-navy/5 flex items-center justify-center">
          <Icon className="w-4 h-4 text-navy" />
        </div>
      </div>
      <p className="text-2xl font-bold text-navy mt-2 tabular-nums">
        <AnimatedNumber value={value} formatter={formatter} />
      </p>
      {delta && (
        <p
          className={`text-[11px] font-medium mt-1 ${
            positive ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {delta}
        </p>
      )}
      {children}
    </div>
  );
}
