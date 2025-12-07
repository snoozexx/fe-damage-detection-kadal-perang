import { useState, useRef, useEffect } from "react";
import { calculatePeakValues } from "@/utils/diagnosis-utils";
import { useVehicleStore } from "@/stores/use-vehicle-store";
import type { WebSocketPayload } from "../types/dashboard.types";
import { api } from "@/api/api";
import { toast } from "sonner";

export const useDiagnosisRecorder = (
  currentRawData: WebSocketPayload | null
) => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<WebSocketPayload | null>(null);

  const [hasRecorded, setHasRecorded] = useState(false);

  const { selectedVehicleId } = useVehicleStore();
  const dataBuffer = useRef<WebSocketPayload[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentRawData) {
      const shouldAutoStart = !isRecording && !hasRecorded && true;

      if (shouldAutoStart) {
        startDiagnosis();
      }
    }
  }, [currentRawData, isRecording, hasRecorded]);

  useEffect(() => {
    if (isRecording && currentRawData) {
      dataBuffer.current.push(currentRawData);
    }
  }, [isRecording, currentRawData]);

  const startDiagnosis = () => {
    if (!selectedVehicleId) return;

    setIsRecording(true);
    setHasRecorded(true);
    setResult(null);
    setProgress(0);
    dataBuffer.current = [];


    let seconds = 0;
    const progressInterval = setInterval(() => {
      seconds++;
      setProgress((seconds / 15) * 100);
      if (seconds >= 15) clearInterval(progressInterval);
    }, 1000);

    timerRef.current = setTimeout(async () => {
      stopAndSave();
      clearInterval(progressInterval);
    }, 15000);
  };

  const stopAndSave = async () => {
    setIsRecording(false);

    const peakData = calculatePeakValues(dataBuffer.current);
    if (peakData) {
      peakData.vehicle_id = selectedVehicleId;
      setResult(peakData);
      localStorage.setItem("LAST_DIAGNOSIS_RESULT", JSON.stringify(peakData));

      try {
        const toastId = toast.loading("Mengupload data diagnosa...");
        await api.post("/telemetry/db", peakData);
        toast.success("Diagnosa Berhasil Disimpan", {
          id: toastId,
          description: `Data kendaraan ${selectedVehicleId} telah tersimpan di database.`,
          duration: 4000,
        });
      } catch (error) {
        console.error(error);
        toast.error("Gagal Upload ke Server", {
          description:
            "Data tersimpan di Local Storage, namun gagal dikirim ke server.",
          duration: 5000,
          action: {
            label: "Coba Lagi",
            onClick: () => stopAndSave(),
          },
        });
      }
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
    result,
    hasRecorded,
    startDiagnosis,
    resetRecorder,
  };
};
