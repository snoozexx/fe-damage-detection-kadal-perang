import { useEffect } from "react";
import { Bike, Loader2, History } from "lucide-react";

import { useVehicleStore } from "@/stores/use-vehicle-store";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import icon from "@/assets/images/OtoSense-Logo.webp"
import { Link } from "@tanstack/react-router";

export const LayoutNavbar = () => {
  const {
    vehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    getSelectedVehicle,
    fetchVehicles,
    isLoading
  } = useVehicleStore();


  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const currentVehicle = getSelectedVehicle();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/60 backdrop-blur-md text-white supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-3 select-none">
            <img src={icon} alt="OtoSense" className="h-8 w-auto object-contain" />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold tracking-tight text-zinc-100">Dashboard</h1>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-zinc-800 hidden md:block"></div>

          <div className="flex flex-col leading-tight">
            {isLoading ? (
              <div className="flex items-center gap-2 text-zinc-400 text-sm py-1 px-2 bg-zinc-900/50 rounded-md border border-zinc-800/50">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span className="text-xs font-medium">Loading Data...</span>
              </div>
            ) : (
              <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId}>
                <SelectTrigger className="w-[240px] h-auto border-none bg-transparent p-0 hover:bg-zinc-800/40 transition-all rounded-xl focus:ring-0 group">
                  <div className="flex items-center gap-3 text-left p-1 pr-2">
                    <div className="flex items-center justify-center h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300 border border-blue-500/20">
                      <Bike className="h-5 w-5 text-white" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
                        {currentVehicle?.name || 'Pilih Kendaraan'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider bg-zinc-900/80 px-1.5 rounded border border-zinc-800">
                          {currentVehicle?.plate || 'NO DATA'}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                </SelectTrigger>

                <SelectContent className="bg-zinc-950 border-zinc-800 text-white w-[260px] shadow-2xl shadow-black/80 p-0 overflow-hidden">
                  <div className="p-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-900/50 border-b border-zinc-800">
                    Daftar Armada
                  </div>
                  <ScrollArea className="h-[220px]">
                    {vehicles.length === 0 ? (
                      <div className="p-8 text-sm text-zinc-500 text-center flex flex-col items-center gap-2">
                        <Bike className="h-8 w-8 opacity-20" />
                        <span>Tidak ada kendaraan</span>
                      </div>
                    ) : (
                      vehicles.map((vehicle) => (
                        <SelectItem
                          key={vehicle.id}
                          value={vehicle.id}
                          className="focus:bg-zinc-900 focus:text-white cursor-pointer py-3 px-3 border-b border-zinc-900/50 last:border-0 data-[state=checked]:bg-blue-900/20 data-[state=checked]:text-blue-400"
                        >
                          <div className="flex flex-col text-left gap-1">
                            <span className="font-semibold text-sm">{vehicle.name}</span>
                            <div className="flex items-center justify-between w-full">
                              <span className="text-[10px] text-zinc-400 font-mono">{vehicle.plate}</span>
                              <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1 rounded">{vehicle.id}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </ScrollArea>
                </SelectContent>

              </Select>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">

          <Link
            to="/diagnosis-history/$vehicleId"
            params={{ vehicleId: selectedVehicleId! }}
            className={`hidden md:flex items-center gap-2 transition-colors ${selectedVehicleId
              ? "text-zinc-400 hover:text-white"
              : "text-zinc-600 cursor-not-allowed"
              }`}
            disabled={!selectedVehicleId}
          >
            <History className="h-4 w-4" />
            <span>Riwayat Diagnosa</span>
          </Link>
        </div>
      </div>
    </header>
  );
};