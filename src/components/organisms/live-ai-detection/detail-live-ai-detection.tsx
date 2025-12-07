import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Wrench,
    Wallet,
    AlertTriangle,
    BrainCircuit,
    Activity,
    ThermometerSnowflake,
    Zap
} from "lucide-react"
import type { Fault } from "@/features/dashboard/types/dashboard.types"
import { Separator } from "@/components/ui/separator"
import { extractAIInsights } from "@/features/dashboard/hooks/use-parsing-ai-detection"

interface AIDetailViewProps {
    faults: Fault[]
    onBack: () => void
}

export const AIDetailView = ({ faults, onBack }: AIDetailViewProps) => {
    const mainFault = faults[0]
    const { actions, impacts } = extractAIInsights(mainFault.description || "")
    if (!mainFault) return <div>No Data</div>

    const getUrgencyConfig = (urgency?: string) => {
        const u = urgency?.toLowerCase() || ''
        if (u.includes('tinggi') || u.includes('high')) 
            return { color: 'bg-red-500', gradient: 'from-red-500/20', text: 'text-red-400' }
        if (u.includes('sedang') || u.includes('medium')) 
            return { color: 'bg-amber-500', gradient: 'from-amber-500/20', text: 'text-amber-400' }
        return { color: 'bg-emerald-500', gradient: 'from-emerald-500/20', text: 'text-emerald-400' }
    }

    const urgencyConfig = getUrgencyConfig(mainFault.urgency)

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-10">
            <div className="flex items-center gap-4">
                <Button 
                    variant="ghost" 
                    onClick={onBack} 
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2"
                >
                    <ArrowLeft className="h-4 w-4" /> 
                    Back to Dashboard
                </Button>
            </div>

            <div className="space-y-3 p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl border border-zinc-800 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${urgencyConfig.gradient} to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none`} />
                <div className="flex items-center gap-3 flex-wrap relative">
                    <Badge className={`${urgencyConfig.color} px-4 py-1.5 text-sm font-bold border-none shadow-lg`}>
                        {mainFault.urgency?.toUpperCase() || 'UNKNOWN'}
                    </Badge>
                    <Badge variant="outline" className="text-blue-400 border-blue-800 bg-blue-900/30 px-4 py-1.5">
                        Confidence: {Math.round(mainFault.confidence)}%
                    </Badge>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight relative">
                    {mainFault.title}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 text-white shadow-xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <BrainCircuit className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-blue-400">AI Diagnostic Analysis</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative">
                            <div className="bg-zinc-950/80 p-5 rounded-xl border border-zinc-800 text-zinc-300 leading-relaxed whitespace-pre-line backdrop-blur-sm">
                                {mainFault.description}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 text-white shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-amber-500 rounded-lg">
                                    <Wrench className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-amber-400">Recommended Actions</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative">
                            <ul className="space-y-3">
                                {actions.map((action, idx) => (
                                    <li 
                                        key={idx} 
                                        className="flex gap-3 items-start p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800/50 transition-all border border-zinc-800/50 hover:border-zinc-700 animate-in fade-in slide-in-from-left-2" 
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 h-7 w-7 flex items-center justify-center rounded-lg text-xs font-bold text-white mt-0.5 shrink-0 shadow-lg">
                                            {idx + 1}
                                        </div>
                                        <span className="text-zinc-300 flex-1">{action}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 text-white overflow-hidden relative shadow-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg">
                                <div className="p-2 bg-emerald-500 rounded-lg">
                                    <Wallet className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-emerald-400">Cost Estimate</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 relative">
                            <div className="text-3xl font-bold text-white">
                                {mainFault.costRange || "Contact Workshop"}
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                *Estimated price including parts & labor (Subject to change)
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 text-white shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg">
                                <div className="p-2 bg-red-500 rounded-lg">
                                    <AlertTriangle className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-red-400">Potential Impact</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 relative">
                            {impacts.map((impact, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-red-950/30 rounded-lg border border-red-900/30 hover:bg-red-950/40 transition-all">
                                    <div className="p-2 bg-red-500/20 rounded-lg">
                                        {idx === 0 ? <Activity className="h-4 w-4 text-red-400" /> : 
                                         idx === 1 ? <ThermometerSnowflake className="h-4 w-4 text-red-400" /> :
                                         <Zap className="h-4 w-4 text-red-400" />}
                                    </div>
                                    <span className="text-sm text-zinc-300">{impact}</span>
                                </div>
                            ))}
                            
                            <Separator className="bg-zinc-800 my-3" />
                            
                            <div className="text-xs text-zinc-500 italic flex items-center gap-2">
                                <BrainCircuit className="h-3 w-3" />
                                Source: {mainFault.sources?.join(', ') || 'AI Analysis'}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}