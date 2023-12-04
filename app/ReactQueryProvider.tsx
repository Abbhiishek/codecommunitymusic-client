'use client'

import { MessagesProvider } from '@/context/messages';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';

export const queryClient = new QueryClient();


export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <MessagesProvider>
                {children}
            </MessagesProvider>
        </QueryClientProvider>
    )
}