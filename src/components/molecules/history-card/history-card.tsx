import { format } from "date-fns";
import { id } from "date-fns/locale";
import { AlertTriangle, CheckCircle2, Car, Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { HistoryItem } from "@/features/dashboard/types/dashboard.types";
import { StatusBadge } from "@/components/atoms/status-badge";

interface HistoryCardProps {
    item: HistoryItem;
    onClick: () => void;
}

export const HistoryCard = ({ item, onClick }: HistoryCardProps) => {
    const isCritical = item.status.includes('CRITICAL');

    return (
        <Card
            className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
            onClick={onClick}
        >
            <CardContent className="p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <div className="flex gap-4 items-start">
                    <div className={`p-3 rounded-xl ${isCritical ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                        {isCritical ? (
                            <AlertTriangle className={`h-6 w-6 ${isCritical ? 'text-red-500' : 'text-emerald-500'}`} />
                        ) : (
                            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        )}
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-lg text-white">{item.dtc_code}</span>
                            <StatusBadge status={item.status} />
                            <span className="text-xs text-zinc-500 flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                                <Car className="h-3 w-3" /> {item.vehicle_model}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-400 line-clamp-1 max-w-xl">
                            {item.ai_advice?.summary}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[200px]">
                    <div className="flex flex-col items-end text-right">
                        <div className="flex items-center gap-1.5 text-zinc-300 text-sm font-medium">
                            <Calendar className="h-3.5 w-3.5" />
                            {format(new Date(item.timestamp), "dd MMM yyyy", { locale: id })}
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                            <Clock className="h-3.5 w-3.5" />
                            {format(new Date(item.timestamp), "HH:mm 'WIB'", { locale: id })}
                        </div>

                    </div>
                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};