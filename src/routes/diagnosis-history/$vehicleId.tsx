import { HistoryPage } from '@/pages/history-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/diagnosis-history/$vehicleId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HistoryPage/>
}
