import type {QueryClient} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Outlet, createRootRouteWithContext} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {Fragment} from 'react'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return <h1>404 notFound</h1>
  }
})

export default function RootComponent() {
  return (
    	<Fragment>
			<Outlet />
			<Fragment>
				<ReactQueryDevtools initialIsOpen={false} />
				<TanStackRouterDevtools />
			</Fragment>
		</Fragment>
  )
}
