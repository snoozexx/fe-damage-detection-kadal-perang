import { MetricCard } from '@/components/molecules/metric-card/metric-card'
import type { DashboardData } from '@/features/dashboard/types/dashboard.types'

export const MetricsGrid = ({ data }: { data: DashboardData }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Row 1: Primary Engine Stats */}
            <MetricCard title="RPM" value={data.rpm.value} trend={data.rpm.trend} />
            <MetricCard title="Speed" value={data.speed.value} trend={data.speed.trend} />
            <MetricCard title="Engine Temp" value={data.temperature.value} trend={data.temperature.trend} />
            <MetricCard title="Battery" value={data.battery.value} trend={data.battery.trend} />

            {/* Row 2: Secondary / Sensor Stats */}
            <MetricCard title="Throttle (TPS)" value={data.tps.value} trend={data.tps.trend} />
            <MetricCard title="MAP Pressure" value={data.map.value} trend={data.map.trend} />
            <MetricCard title="O2 Sensor" value={data.o2.value} trend={data.o2.trend} />
            <MetricCard title="Fuel Trim" value={data.fuel.value} trend={data.fuel.trend} />
        </div>
    )
}