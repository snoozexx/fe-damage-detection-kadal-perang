import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import type {
  DashboardData,
  WebSocketPayload,
  Metric,
  Fault,
} from "../types/dashboard.types";

const createMetric = (label: string, unit: string): Metric => ({
  label,
  value: `0 ${unit}`,
  trend: Array(10).fill(0),
  unit,
});

const initialData: DashboardData = {
  status: "normal",
  rpm: createMetric("RPM", "rpm"),
  temperature: createMetric("Temperature", "°C"),
  vibration: createMetric("Vibration", "Hz"),
  speed: createMetric("Speed", "km/h"),
  coolant: createMetric("Coolant", "°C"),
  fuel: createMetric("Fuel Rate", "L/h"),
  tps: createMetric("TPS", "%"),
  battery: createMetric("Battery", "V"),
  o2: createMetric("O2 Sensor", "V"),
  map: createMetric("MAP", "kPa"),
  faults: [],
};

export const useDashboardSocket = (vehicleId: string, isPaused: boolean = false) => {
  const baseSocketUrl = `wss://be-damage-detection-kadal-perang-production.up.railway.app/ws/${vehicleId || 'ARMADA-001'}`;
  const socketUrl = (isPaused || !vehicleId) ? null : baseSocketUrl;

  const [data, setData] = useState<DashboardData>(initialData);
  const [rawData, setRawData] = useState<WebSocketPayload | null>(null);

  const calculateConfidence = (raw: WebSocketPayload): number => {
    let score = 45; 
    if (raw.temp > 90) {
        score += (raw.temp - 90) * 2; 
    }
    score += (raw.rpm / 10000) * 15; 
    score += (raw.tps_percent / 100) * 5;
    if (raw.batt_volt < 12 && raw.batt_volt > 0) {
        score += (12 - raw.batt_volt) * 10;
    }
    const noise = (Math.random() * 4) - 2; 
    score += noise;

    return Math.min(99, Math.max(10, score));
  };

  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    onClose: () => console.log("🔌 WebSocket Disconnected"),
    onOpen: () => console.log("🟢 WebSocket Connected"),
  });

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const raw = JSON.parse(lastMessage.data) as WebSocketPayload;
        setRawData(raw);

        setData((prev) => {
          const updateMetric = (prevMetric: Metric, newValue: number, customUnit?: string): Metric => {
            const safeValue = typeof newValue === "number" ? newValue : 0;
            const formattedValue = safeValue % 1 !== 0 ? safeValue.toFixed(1) : safeValue;
            
            const newTrend = [...prevMetric.trend.slice(1), safeValue];
            const unit = customUnit || prevMetric.unit;
            return {
              ...prevMetric,
              value: `${formattedValue} ${unit}`,
              trend: newTrend,
            };
          };

          let currentStatus: "normal" | "warning" | "critical" = "normal";
          const urgency = raw.ai_advice?.urgency || "Low";

          const isBackendCritical = raw.status?.some(s => 
              s.toUpperCase().includes("CRITICAL") || s.toUpperCase().includes("DANGER") || s.toUpperCase().includes("HIGH") 
          );
          const isBackendWarning = raw.status?.some(s => 
              s.toUpperCase().includes("WARNING") || s.toUpperCase().includes("CAUTION")
          );

          if (isBackendCritical || urgency === "High" || raw.temp > 105) {
            currentStatus = "critical";
          } else if (isBackendWarning || urgency === "Medium" || raw.temp > 95) {
            currentStatus = "warning";
          }

          const dynamicScore = calculateConfidence(raw);

          const newFaults: Fault[] = raw.ai_advice
            ? [
                {
                  title: raw.ai_advice.summary.split(".")[0] || "Analisis Sistem Berjalan",
                  description: raw.ai_advice.summary,
                  confidence: dynamicScore, 
                  urgency: raw.ai_advice.urgency,
                  costRange: raw.ai_advice.estimated_cost_text,
                  sources: raw.ai_advice.sources,
                },
              ]
            : [];

          return {
            ...prev,
            status: currentStatus,
            faults: newFaults,
            rpm: updateMetric(prev.rpm, raw.rpm),
            speed: updateMetric(prev.speed, raw.speed),
            temperature: updateMetric(prev.temperature, raw.temp),
            coolant: updateMetric(prev.coolant, raw.temp),
            fuel: updateMetric(prev.fuel, raw.fuel_trim_short, "%"),
            vibration: updateMetric(prev.vibration, 0),
            tps: updateMetric(prev.tps, raw.tps_percent),
            battery: updateMetric(prev.battery, raw.batt_volt),
            o2: updateMetric(prev.o2, raw.o2_volt),
            map: updateMetric(prev.map, raw.map_kpa),
          };
        });
      } catch (error) {
        console.error("Gagal parsing data:", error);
      }
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return {
    data,
    rawData,
    connectionStatus,
    isConnected: readyState === ReadyState.OPEN,
  };
};