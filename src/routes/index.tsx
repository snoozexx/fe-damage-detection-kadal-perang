import { Layout } from '@/components/templates/layouts/layout-dashboard-main'
import { DashboardPage } from '@/pages/dahsboard-page/dahsboard-page'
import { createFileRoute } from '@tanstack/react-router'
import { Toaster } from 'sonner'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      <DashboardPage/>
      <Toaster position="bottom-right" richColors />
    </Layout>
  )
}
