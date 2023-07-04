
import AuthProvider from '@/app/NextAuthProvider';
import NavBar from '@/components/navbar/navBar';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from 'next/font/google';

import NextTopLoader from 'nextjs-toploader';
import { ReactQueryProvider } from './ReactQueryProvider';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });


export const metadata = {
  title: 'code community music',
  description: 'CodeCommunityMusic is a community of developers and musicians who are passionate about music and code.',
};

export default function RootLayout({
  children,
  Session
}: {
  children: React.ReactNode;
  Session: any
}) {
  return (

    <html lang="en" className='h-full dark'>
      <head>
        <meta name="google-site-verification" content="vWn1Ffc2bb-SMbm6Xka70exCU4hyITuirnjRNsDzcMs" />
      </head>
      <body className={inter.className}>
        <NextTopLoader />
        <ReactQueryProvider>
          <AuthProvider session={Session}>
            <NavBar />
            <main className='h-full'>{children}</main>
            <Toaster />
            <ReactQueryDevtools />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
