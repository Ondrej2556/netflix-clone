import type { Metadata } from 'next'
import './globals.css'
import { auth } from '@/lib/auth'
import SessionProvider from '@/components/sessionProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Netflix - Watch TV Shows Online ',
  description: 'Netlfix Clone',
  
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
