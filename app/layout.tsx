import type { Metadata } from 'next'
import './globals.css'
import { auth } from '@/lib/auth'
import SessionProvider from '@/components/sessionProvider'

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
      </body>
    </html>
  )
}
