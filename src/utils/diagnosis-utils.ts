// src/utils/diagnosis-utils.ts

import type { WebSocketPayload } from "@/features/dashboard/types/dashboard.types";

export const calculatePeakValues = (dataStream: WebSocketPayload[]): WebSocketPayload | null => {
  if (dataStream.length === 0) return null;

  // Inisialisasi dengan data pertama
  const peakData = { ...dataStream[0] };

  // Loop semua data yang terekam selama 10 detik
  dataStream.forEach((current) => {
    // Ambil nilai tertinggi untuk setiap sensor penting
    if (current.rpm > peakData.rpm) peakData.rpm = current.rpm;
    if (current.speed > peakData.speed) peakData.speed = current.speed;
    if (current.temp > peakData.temp) peakData.temp = current.temp;
    if (current.tps_percent > peakData.tps_percent) peakData.tps_percent = current.tps_percent;
    
    // Untuk Battery, biasanya kita cari DROP terendah (saat starter), 
    // tapi jika cari voltage charging tertinggi, pakai >. Kita pakai Max dulu.
    if (current.batt_volt > peakData.batt_volt) peakData.batt_volt = current.batt_volt; 
    
    // Update timestamp ke waktu terakhir recording
    peakData.timestamp = new Date().toISOString();
  });

  return peakData;
};