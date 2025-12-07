import { create } from 'zustand';
import { api } from '@/api/api';
import type { HistoryItem } from '@/features/dashboard/types/dashboard.types';

interface HistoryState {
  historyItems: HistoryItem[];
  isLoading: boolean;
  fetchHistory: (vehicleId?: string) => Promise<void>;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  historyItems: [],
  isLoading: false,

  fetchHistory: async (vehicleId) => {
    if (!vehicleId) {
      console.warn('[HistoryStore] vehicleId kosong');
      set({ historyItems: [], isLoading: false });
      return;
    }

    set({ isLoading: true });

    try {
      const response = await api.get(`/status/${vehicleId}`);

      const rawData = response.data;

      const normalizedData: HistoryItem[] = Array.isArray(rawData)
        ? rawData
        : rawData
          ? [rawData]
          : [];

      const sanitizedData: HistoryItem[] = normalizedData.map((item) => ({
        ...item,
        ai_advice: {
          summary: item.ai_advice?.summary ?? '-',
          urgency: item.ai_advice?.urgency ?? 'normal',
          estimated_cost_idr: item.ai_advice?.estimated_cost_idr ?? 0,
          estimated_cost_text: item.ai_advice?.estimated_cost_text ?? '-',
          sources: item.ai_advice?.sources ?? [],
        },
      }));

      const sortedData = [...sanitizedData].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() -
          new Date(a.timestamp).getTime()
      );

      set({ historyItems: sortedData, isLoading: false });

    } catch (error) {
      console.error('[HistoryStore] Gagal ambil history:', error);
      set({ historyItems: [], isLoading: false });
    }
  },
}));
