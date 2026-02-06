'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Locale } from '@/lib/translations'

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('KR')

  const setLocale = useCallback((value: Locale) => {
    setLocaleState(value)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === 'KR' ? 'EN' : 'KR'))
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
