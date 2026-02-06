'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-md border border-[#333] bg-transparent px-3 py-1.5 text-sm font-medium text-[#A1A1AA] transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
      aria-label={locale === 'KR' ? 'Switch to English' : '한국어로 전환'}
    >
      {locale === 'KR' ? 'EN' : 'KR'}
    </button>
  )
}
