import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import AuthGuard from '@/components/auth/AuthGuard'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cogniview',
  description: 'Purchase Data Analytics Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased selection:bg-primary selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthGuard>
            {children}
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  )
}
