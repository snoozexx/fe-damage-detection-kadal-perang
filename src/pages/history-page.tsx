import { ArrowLeft, Clock } from "lucide-react";
import { HistoryTemplate } from "../components/templates/history-template";
import { useHistoryLogic } from "@/features/dashboard/hooks/use-history-logic";
import { HistoryCard } from "@/components/molecules/history-card/history-card";
import { HistorySearchBar } from "@/components/molecules/history-card/history-search";
import { HistoryDetailDialog } from "@/components/molecules/history-card/history-detail-modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";

export const HistoryPage = () => {
  const { 
    filteredItems, 
    isLoading, 
    search, 
    setSearch, 
    selectedItem, 
    setSelectedItem, 
    closeDialog,
    hasSelectedVehicle
  } = useHistoryLogic();

  const router = useRouter();
  // Bagian Header
  const HeaderComponent = (
    <div>
      <div className="flex items-center gap-3">
        <Button
        size={"icon"}
        variant={"link"}
        className="text-white hover:bg-primary"
        onClick={() => router.history.back()}
        >
        <ArrowLeft className="w-5 h-5"/>
        </Button>
        <h1 className="text-2xl font-bold">Riwayat Diagnosa</h1>
      </div>
        <p className="text-zinc-400 text-sm">Arsip hasil scan AI kendaraan Anda</p>
    </div>
  );

  // Bagian Konten
  let ContentComponent;

  if (!hasSelectedVehicle) {
      ContentComponent = (
        <div className="text-center text-zinc-500 py-20">
            Silakan pilih kendaraan terlebih dahulu di Navbar.
        </div>
      );
  } else if (isLoading) {
      ContentComponent = (
        <div className="text-center text-zinc-500 py-20 animate-pulse">
            Memuat riwayat...
        </div>
      );
  } else if (filteredItems.length === 0) {
      ContentComponent = (
        <div className="text-center text-zinc-500 py-20 flex flex-col items-center gap-2">
            <Clock className="h-10 w-10 opacity-20" />
            <p>Belum ada riwayat diagnosa.</p>
        </div>
      );
  } else {
      ContentComponent = (
        <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item, idx) => (
                <HistoryCard 
                    key={idx} 
                    item={item} 
                    onClick={() => setSelectedItem(item)} 
                />
            ))}
        </div>
      );
  }

  return (
    <HistoryTemplate 
        header={HeaderComponent}
        searchBar={<HistorySearchBar value={search} onChange={setSearch} />}
        content={ContentComponent}
        dialog={
            <HistoryDetailDialog 
                item={selectedItem} 
                isOpen={!!selectedItem} 
                onClose={closeDialog} 
            />
        }
    />
  );
};