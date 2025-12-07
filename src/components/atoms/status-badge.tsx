import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status: string[] }) => {
  const getStatusColor = (s: string[]) => {
    if (s.includes("CRITICAL")) return "bg-red-500/10 text-red-500 border-red-500/20";
    if (s.includes("WARNING")) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
  };

  return (
    <Badge variant="outline" className={getStatusColor(status)}>
      {status.join(" • ")}
    </Badge>
  );
};