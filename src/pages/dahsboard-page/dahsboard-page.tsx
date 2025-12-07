import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlayCircle } from 'lucide-react';

import { useVehicleStore } from '@/stores/use-vehicle-store';
import { useDiagnosisRecorder } from '@/features/dashboard/hooks/use-diagnosis-recorder';
import { useDashboardSocket } from '@/features/dashboard/hooks/use-dashboard-data';
import { AIDetailView } from '@/components/organisms/live-ai-detection/detail-live-ai-detection';
import { DashboardTemplate } from '@/components/templates/dahsboard-tempate';


export const DashboardPage = () => {
    const { selectedVehicleId, getSelectedVehicle } = useVehicleStore();
    const [shouldDisconnect, setShouldDisconnect] = useState(false);
    const [isScanning, setIsScanning] = useState(false);


    const { data, rawData, connectionStatus, isConnected } = useDashboardSocket(
        selectedVehicleId,
        shouldDisconnect,
        isScanning
    );

    const {
        isRecording,
        progress,
        startDiagnosis,
        hasRecorded,
        resetRecorder
    } = useDiagnosisRecorder(rawData);

    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        if (hasRecorded && !isRecording) {
            setShouldDisconnect(true);
        } else {
            setShouldDisconnect(false);
        }
    }, [hasRecorded, isRecording]);

    useEffect(() => {
  if (hasRecorded && !isRecording) {
    setIsScanning(false); // ✅ DISCONNECT
  }
}, [hasRecorded, isRecording]);


    const handleReset = () => {
        resetRecorder();
        setIsScanning(false); // pastikan WS mati
    };

    const currentVehicle = getSelectedVehicle();

    return (
        <div className="space-y-4 p-4 min-h-screen text-white">


            {showDetail ? (
                <AIDetailView
                    faults={data.faults}
                    onBack={() => setShowDetail(false)}
                />
            ) : (
                <>
                    <div className="flex flex-col md:flex-row space-y-4 items-center justify-between mb-4 animate-in fade-in slide-in-from-top-2">
                        <div>
                            <h1 className="text-2xl font-bold">Vehicle Monitor</h1>
                            <p className="text-sm text-zinc-400">
                                Monitoring: <span className="text-blue-400 font-semibold">
                                    {currentVehicle?.name || selectedVehicleId || 'Menunggu data...'}
                                </span>
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end gap-1">
                                {isRecording ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-yellow-400 animate-pulse">
                                            Auto-Diagnosing...
                                        </span>
                                        <Progress value={progress} className="w-[100px] h-2 bg-zinc-800" />
                                    </div>
                                ) : hasRecorded && !isRecording ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-green-400">Diagnosa Selesai</span>
                                        <Button
                                            onClick={handleReset}
                                            size="sm"
                                            variant="outline"
                                            className="h-7 text-xs border-zinc-700 hover:bg-zinc-800"
                                        >
                                            Scan Ulang
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            setIsScanning(true);
                                            startDiagnosis();
                                        }}
                                        disabled={isScanning}
                                        className="bg-blue-600 hover:bg-blue-700 gap-2"
                                    >
                                        <PlayCircle className="h-4 w-4" />
                                        Mulai Manual
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-center gap-2 border-l border-zinc-800 pl-4">
                                <span className="text-sm text-zinc-400">Live:</span>
                                <Badge variant={isConnected ? "default" : "destructive"} className={isConnected ? "bg-green-600" : "bg-red-600"}>
                                    {connectionStatus}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <DashboardTemplate
                        data={data}
                        onViewDetails={() => setShowDetail(true)}
                    />
                </>
            )}
        </div>
    );
};