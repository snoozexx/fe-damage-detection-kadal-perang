export type Metric = {
  label: string;
  value: string;
  trend: number[];
  unit: string;
};

export type Fault = {
  title: string;
  confidence: number;
  description?: string;
  urgency?: string;
  costRange?: string;
  sources?: string[];
};

export type DashboardData = {
  status: 'normal' | 'warning' | 'critical';
  rpm: Metric;
  temperature: Metric;
  vibration: Metric;
  speed: Metric;
  coolant: Metric;
  fuel: Metric;
  tps: Metric;
  battery: Metric; 
  o2: Metric;      
  map: Metric;     
  faults: Fault[];
};

export type WebSocketPayload = {
  vehicle_id: string;
  rpm: number;
  timestamp: string;
  speed: number;
  temp: number;
  tps_percent: number; 
  batt_volt: number;   
  fuel_trim_short: number;
  o2_volt: number;     
  map_kpa: number;    
  dtc_code: string;
  vehicle_model: string;
  status: string[];
  ai_advice?: {
    summary: string;
    urgency: string;
    estimated_cost_text?: string;
    estimated_cost_idr?: number;
    sources?: string[];
    confidence_score?: number;
  };
};


export interface HistoryItem {
  id?: string;
  vehicle_id: string;
  vehicle_model: string;
  timestamp: string;
  dtc_code: string;
  status: string[];

  rpm: number;
  speed: number;
  temp: number;
  tps_percent: number;
  batt_volt: number;
  fuel_trim_short: number;
  o2_volt: number;
  map_kpa: number;

  ai_advice?: {
    summary: string;
    estimated_cost_idr?: number;
    estimated_cost_text?: string;
    urgency?: string;
    sources?: string[];
  };
}
