import type { LucideIcon } from "lucide-react";

interface SensorGridItemProps {
  label: string;
  value: number;
  unit: string;
  icon: LucideIcon;
}

export const SensorGridItem = ({ label, value, unit, icon: Icon }: SensorGridItemProps) => (
  <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
    <div className="p-2 bg-blue-500/10 rounded-full">
      <Icon className="h-4 w-4 text-blue-400" />
    </div>
    <div>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="text-sm font-bold text-zinc-100">
        {value} <span className="text-xs font-normal text-zinc-500">{unit}</span>
      </p>
    </div>
  </div>
);