import { api } from '@/api/api';
import { create } from 'zustand';

export type Vehicle = {
  id: string;
  name: string;
  plate: string;
};

interface VehicleState {
  selectedVehicleId: string;
  vehicles: Vehicle[];
  isLoading: boolean;
  
  setSelectedVehicleId: (id: string) => void;
  getSelectedVehicle: () => Vehicle | undefined;
  fetchVehicles: () => Promise<void>; 
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  selectedVehicleId: '', 
  vehicles: [],
  isLoading: false,

  setSelectedVehicleId: (id) => set({ selectedVehicleId: id }),

  getSelectedVehicle: () => {
    const { vehicles, selectedVehicleId } = get();
    return vehicles.find((v) => v.id === selectedVehicleId);
  },

  fetchVehicles: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get<string[]>('/vehicles/db'); 
      
      if (Array.isArray(response.data)) {
        const mappedVehicles: Vehicle[] = response.data.map((item) => ({
           id: item,         
           name: item,      
           plate: 'Terdeteksi' 
        }));

        set({ 
          vehicles: mappedVehicles,
          selectedVehicleId: mappedVehicles.length > 0 ? mappedVehicles[0].id : '',
          isLoading: false 
        });
      } else {
        console.error("Format data API bukan array:", response.data);
        set({ isLoading: false });
      }

    } catch (error) {
      console.error("Gagal koneksi ke API:", error);
      set({ isLoading: false });
    }
  }
}));