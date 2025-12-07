import { Card, CardContent } from '@/components/ui/card'
import { ChartLine } from '@/components/atoms/chart-line-card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export const MetricCard = ({ title, value, trend }: { title: string; value: string; trend: number[] }) => {
    const getTrendDirection = () => {
        if (trend.length < 2) return 'neutral'
        const last = trend[trend.length - 1]
        const prev = trend[trend.length - 2]
        if (last > prev) return 'up'
        if (last < prev) return 'down'
        return 'neutral'
    }

    const direction = getTrendDirection()
    const trendColors = {
        up: 'text-emerald-400',
        down: 'text-red-400',
        neutral: 'text-zinc-400'
    }

    return (
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-lg hover:shadow-blue-900/20 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
            <CardContent className="p-4 sm:p-5 relative">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="text-xs sm:text-sm text-zinc-400 font-medium mb-1.5">{title}</div>
                        <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{value}</div>
                    </div>
                    <div className={`${trendColors[direction]} p-2 bg-zinc-800/50 rounded-lg`}>
                        {direction === 'up' && <TrendingUp className="h-4 w-4" />}
                        {direction === 'down' && <TrendingDown className="h-4 w-4" />}
                        {direction === 'neutral' && <Minus className="h-4 w-4" />}
                    </div>
                </div>
                <div className="mt-2 -mx-2">
                    <ChartLine data={trend} />
                </div>
            </CardContent>
        </Card>
    )
}