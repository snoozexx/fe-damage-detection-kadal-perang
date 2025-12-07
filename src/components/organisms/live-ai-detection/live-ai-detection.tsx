import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ArrowRight, Activity } from 'lucide-react'
import type { Fault } from '@/features/dashboard/types/dashboard.types'

interface LiveAIDetectionProps {
    faults: Fault[]
    status: string
    onViewDetails: () => void
}

export const LiveAIDetection = ({ faults, status, onViewDetails }: LiveAIDetectionProps) => {
    let statusColor = 'bg-emerald-500'
    let bgGradient = 'from-emerald-500/10'
    
    if (status === 'critical') {
        statusColor = 'bg-red-500'
        bgGradient = 'from-red-500/10'
    } else if (status === 'warning') {
        statusColor = 'bg-amber-500'
        bgGradient = 'from-amber-500/10'
    }

    const displayFaults = faults.slice(0, 3)

    return (
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 text-white h-full shadow-xl overflow-hidden relative group">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${bgGradient} to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none`} />
            
            <CardContent className="p-5 sm:p-6 space-y-5 relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 ${statusColor} rounded-xl shadow-lg`}>
                            <Activity className="h-5 w-5 text-white animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Live AI Detection</h3>
                            <p className="text-xs text-zinc-400">Real-time Analysis</p>
                        </div>
                    </div>
                    <Badge className={`${statusColor} px-3 py-1.5 text-white border-none shadow-lg text-xs font-bold`}>
                        {status.toUpperCase()}
                    </Badge>
                </div>

                <div className="space-y-4 min-h-[140px]">
                    {displayFaults.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-36 space-y-3 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/50 backdrop-blur-sm">
                            <div className="p-3 bg-emerald-500/10 rounded-full">
                                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-zinc-300">All Systems Normal</p>
                                <p className="text-xs text-zinc-500">No anomalies detected</p>
                            </div>
                        </div>
                    ) : (
                        displayFaults.map((f, i) => (
                            <div key={i} className="group/item space-y-2 p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-300 border border-zinc-800/50 hover:border-zinc-700">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-semibold text-zinc-100 group-hover/item:text-blue-400 transition-colors line-clamp-1">
                                        {f.title}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold text-xs px-2 py-0.5 rounded ${
                                            f.confidence > 80 ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                        }`}>
                                            {Math.round(f.confidence)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                    <div 
                                        className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg" 
                                        style={{ 
                                            width: `${f.confidence}%`, 
                                            background: f.confidence > 80 
                                                ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)' 
                                                : f.confidence > 50 
                                                ? 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)' 
                                                : 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                                        }} 
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {displayFaults.length > 0 && (
                    <button 
                        onClick={onViewDetails}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-lg hover:shadow-blue-500/50 group/btn"
                    >
                        View AI Recommendations
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                )}
            </CardContent>
        </Card>
    )
}