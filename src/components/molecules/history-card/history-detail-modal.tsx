import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Activity, Gauge, Thermometer, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { HistoryItem } from "@/features/dashboard/types/dashboard.types";
import { StatusBadge } from "@/components/atoms/status-badge";
import { SensorGridItem } from "@/components/atoms/sensor-item";

interface HistoryDetailDialogProps {
    item: HistoryItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export const HistoryDetailDialog = ({ item, isOpen, onClose }: HistoryDetailDialogProps) => {
    if (!item) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className=" bg-zinc-950 border-zinc-800 text-white max-w-3xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-2 border-b border-zinc-800 bg-zinc-900/50">
                    <div className="flex items-center gap-3 mb-2">
                        <StatusBadge status={item.status} />
                        <span className="text-zinc-400 text-sm">
                            {format(new Date(item.timestamp), "dd MMMM yyyy, HH:mm", { locale: id })}
                        </span>
                    </div>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        {item.dtc_code}
                        <span className="text-zinc-600 font-light">|</span>
                        <span className="text-lg font-normal text-zinc-300">{item.vehicle_model}</span>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 p-6 h-60">
                    <div className="space-y-6">
                        {/* Grid Sensor */}
                        <div>
                            <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Snapshot Telemetri
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <SensorGridItem icon={Gauge} label="RPM" value={item.rpm} unit="RPM" />
                                <SensorGridItem icon={Thermometer} label="Suhu" value={item.temp} unit="°C" />
                                <SensorGridItem icon={Zap} label="Baterai" value={item.batt_volt} unit="V" />
                                <SensorGridItem icon={Gauge} label="TPS" value={item.tps_percent} unit="%" />
                                <SensorGridItem icon={Activity} label="Fuel" value={item.fuel_trim_short} unit="%" />
                                <SensorGridItem icon={Activity} label="MAP" value={item.map_kpa} unit="kPa" />
                                <SensorGridItem icon={Zap} label="O2" value={item.o2_volt} unit="V" />
                                <SensorGridItem icon={Gauge} label="Speed" value={item.speed} unit="km/h" />
                            </div>
                        </div>

                        <Separator className="bg-zinc-800" />

                        {/* AI Analysis */}
                        <div className="space-y-4">
                            <div className="bg-blue-950/20 border border-blue-900/30 p-4 rounded-lg">
                                <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                                    🤖 Analisis AI
                                </h3>
                                <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-line">
                                    {item.ai_advice?.summary}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                                    <p className="text-zinc-400 text-xs uppercase mb-1">Estimasi Biaya</p>
                                    <p className="text-xl font-bold text-white mb-1">
                                        {item.ai_advice?.estimated_cost_text}
                                    </p>
                                </div>
                                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                                    <p className="text-zinc-400 text-xs uppercase mb-1">Urgensi</p>
                                    <p className={`text-lg font-bold ${item.ai_advice?.urgency === 'Tinggi' ? 'text-red-500' : 'text-yellow-500'}`}>
                                        {item.ai_advice?.urgency}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};