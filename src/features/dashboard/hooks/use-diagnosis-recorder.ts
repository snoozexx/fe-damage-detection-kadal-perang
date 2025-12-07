import { useState, useRef, useEffect } from "react";
import { calculatePeakValues } from "@/utils/diagnosis-utils";
import { useVehicleStore } from "@/stores/use-vehicle-store";
import type { WebSocketPayload } from "../types/dashboard.types";
import { api } from "@/api/api";
import { toast } from "sonner";

export const useDiagnosisRecorder = (currentRawData: WebSocketPayload | null) => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<WebSocketPayload | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);

  const { selectedVehicleId } = useVehicleStore();
  const dataBuffer = useRef<WebSocketPayload[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isRecording && currentRawData) {
      dataBuffer.current.push(currentRawData);
    }
  }, [isRecording, currentRawData]);

  const startDiagnosis = () => {
    if (!selectedVehicleId || isRecording) return;

    setIsRecording(true);
    setHasRecorded(false);
    setProgress(0);
    setResult(null);
    dataBuffer.current = [];

    console.log("▶️ Diagnosa Manual Dimulai");

    let seconds = 0;

    const interval = setInterval(() => {
      seconds++;
      setProgress((seconds / 15) * 100);
      if (seconds >= 15) clearInterval(interval);
    }, 1000);

    timerRef.current = setTimeout(() => {
      stopAndSave();
      clearInterval(interval);
    }, 15000);
  };

  const stopAndSave = async () => {
    setIsRecording(false);
    setHasRecorded(true);

    const peakData = calculatePeakValues(dataBuffer.current);
    if (!peakData) return;

    peakData.vehicle_id = selectedVehicleId!;
    setResult(peakData);
    localStorage.setItem("LAST_DIAGNOSIS_RESULT", JSON.stringify(peakData));

    try {
      await api.post("/telemetry/db", peakData);
      toast.success("Diagnosa Berhasil Disimpan");
    } catch {
      toast.error("Gagal upload, data tersimpan lokal");
    }
  };

  const resetRecorder = () => {
    setHasRecorded(false);
    setResult(null);
    setProgress(0);
  };

  return {
    isRecording,
    progress,
    startDiagnosis,
    hasRecorded,
    resetRecorder,
    result,
  };
};
