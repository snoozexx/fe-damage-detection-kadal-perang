// src/features/dashboard/templates/dashboard-template.tsx

import type { DashboardData } from "@/features/dashboard/types/dashboard.types";
import { LiveAIDetection } from "../organisms/live-ai-detection/live-ai-detection";
import { MetricsGrid } from "../organisms/matric-grid/matric-grid";

interface DashboardTemplateProps {
    data: DashboardData;
    onViewDetails: () => void; 
}

export const DashboardTemplate = ({ data, onViewDetails }: DashboardTemplateProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2fr] gap-4">
            <LiveAIDetection 
                faults={data.faults} 
                status={data.status} 
                onViewDetails={onViewDetails} 
            />
            
            <MetricsGrid data={data} />
        </div>
    );
};