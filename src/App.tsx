import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { createRouter, ErrorComponent, RouterProvider } from '@tanstack/react-router'
import {routeTree} from './routeTree.gen'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="progress-loader__container">
      <div className="progress-loader">
        <p>Getting Hackathon Page</p>
        <progress className="pure-material-progress-linear text-primary" />
      </div>
    </div>
  ),
  defaultErrorComponent: ({error}) => <ErrorComponent error={error} />,
  context: {
    queryClient,
  },
  basepath: '/demage-detection',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{queryClient}} />
    </QueryClientProvider>
  )

}