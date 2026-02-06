import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'

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
    <html lang="en" className={`${playfair.variable} ${geistSans.variable}`}>
      <body className="min-h-screen bg-[#050505] text-white antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
