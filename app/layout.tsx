import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Actress Portfolio',
  description: 'Cinematic actress portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${geistSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
