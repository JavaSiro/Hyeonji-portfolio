'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslations } from '@/lib/translations'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'

const navPaths = [
  { href: '/', key: 'home' as const },
  { href: '/portfolio', key: 'portfolio' as const },
  { href: '/about', key: 'about' as const },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { locale } = useLanguage()
  const t = getTranslations(locale)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-serif text-xl font-medium tracking-wide text-[var(--foreground)] transition hover:text-[var(--accent)]"
          >
            {t.nav.portfolio}
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            {navPaths.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm tracking-wide transition hover:text-[var(--accent)] ${
                  pathname === href ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
                }`}
              >
                {t.nav[key]}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            <Link
              href="/contact"
              className="rounded border border-[var(--accent)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:bg-[var(--accent-muted)]"
            >
              {t.cta.contact}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex items-center justify-center p-2 text-[var(--foreground)] md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--background)]/95 backdrop-blur-md md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex min-h-full flex-col items-center justify-center gap-8 px-6">
              <button
                type="button"
                className="absolute right-6 top-6 p-2 text-[var(--foreground)]"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              {navPaths.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-serif text-2xl transition hover:text-[var(--accent)] ${
                    pathname === href ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
                  }`}
                >
                  {t.nav[key]}
                </Link>
              ))}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded border border-[var(--accent)] px-6 py-3 font-medium text-[var(--accent)]"
              >
                {t.cta.contact}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
