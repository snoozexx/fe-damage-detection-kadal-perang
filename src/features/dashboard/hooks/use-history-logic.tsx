import { useState, useEffect, useMemo } from "react";
import { useHistoryStore } from "@/stores/use-history-store";
import { useVehicleStore } from "@/stores/use-vehicle-store";
import type { HistoryItem } from "../types/dashboard.types";
import { useParams } from "@tanstack/react-router";

export const useHistoryLogic = () => {
  const { selectedVehicleId } = useVehicleStore();

   const { vehicleId } = useParams({
    from: '/diagnosis-history/$vehicleId',
  });

  const { historyItems, fetchHistory, isLoading } = useHistoryStore();

  useEffect(() => {
    if (vehicleId) {
      fetchHistory(vehicleId);
    }
  }, [vehicleId, fetchHistory]);
  
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedVehicleId) {
        fetchHistory(selectedVehicleId);
    }
  }, [fetchHistory, selectedVehicleId]);

  const filteredItems = useMemo(() => {
    return historyItems.filter(item => 
      item.dtc_code.toLowerCase().includes(search.toLowerCase()) ||
      item.ai_advice?.summary.toLowerCase().includes(search.toLowerCase())
    );
  }, [historyItems, search]);

  return {
    filteredItems,
    isLoading,
    search,
    setSearch,
    selectedItem,
    setSelectedItem,
    closeDialog: () => setSelectedItem(null),
    hasSelectedVehicle: !!selectedVehicleId
  };
};