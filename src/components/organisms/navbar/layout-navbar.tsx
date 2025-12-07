import { useEffect } from "react";
import { Bike, Loader2, History } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useVehicleStore } from "@/stores/use-vehicle-store";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import icon from "@/assets/images/OtoSense-Logo.webp";

export const LayoutNavbar = () => {
  const {
    vehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    getSelectedVehicle,
    fetchVehicles,
    isLoading,
  } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const currentVehicle = getSelectedVehicle();
  const hasVehicle = Boolean(selectedVehicleId);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/60 backdrop-blur-md text-white">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 select-none">
            <img src={icon} alt="OtoSense" className="h-8 w-auto" />
            <h1 className="hidden md:block text-lg font-bold text-zinc-100">
              Dashboard
            </h1>
          </div>

          <div className="hidden md:block h-8 w-px bg-zinc-800" />

          {/* Vehicle Selector */}
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/50 px-3 py-2 rounded">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading…
            </div>
          ) : (
            <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId}>
              <SelectTrigger className="w-[220px] border-none bg-transparent hover:bg-zinc-800/40 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                    <Bike className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold">
                      {currentVehicle?.name || "Pilih Kendaraan"}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {currentVehicle?.plate || "—"}
                    </span>
                  </div>
                </div>
              </SelectTrigger>

              <SelectContent className="bg-zinc-950 border-zinc-800 w-[260px]">
                <ScrollArea className="h-[220px]">
                  {vehicles.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{v.name}</span>
                        <span className="text-[10px] text-zinc-400">
                          {v.plate}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* DESKTOP */}
          <Link
            to="/diagnosis-history/$vehicleId"
            params={{ vehicleId: selectedVehicleId! }}
            className={`
              hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition
              ${hasVehicle
                ? "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                : "text-zinc-600 pointer-events-none"}
            `}
          >
            <History className="h-4 w-4" />
            <span>Riwayat</span>
          </Link>

          {/* MOBILE */}
          <Button
            size="icon"
            variant="ghost"
            disabled={!hasVehicle}
            asChild={hasVehicle}
            className="md:hidden"
          >
            {hasVehicle ? (
              <Link
                to="/diagnosis-history/$vehicleId"
                params={{ vehicleId: selectedVehicleId! }}
              >
                <History className="h-5 w-5" />
              </Link>
            ) : (
              <History className="h-5 w-5 text-zinc-600" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
