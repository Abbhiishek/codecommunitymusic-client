'use client'

import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';




export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    )
}