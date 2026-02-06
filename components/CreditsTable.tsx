'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslations } from '@/lib/translations'

interface Credit {
  _id: string
  title?: string | null
  role?: string | null
  productionCompany?: string | null
  director?: string | null
  year?: string | null
  category?: string | null
}

const CATEGORY_KEYS = ['drama', 'movie', 'theatre', 'commercials'] as const

export function CreditsTable({ credits }: { credits: Credit[] }) {
  const { locale } = useLanguage()
  const t = getTranslations(locale).credits

  const sectionLabels: Record<string, string> = {
    drama: t.drama,
    movie: t.movie,
    theatre: t.theatre,
    commercials: t.commercials,
  }

  return (
    <motion.section
      className="px-4 py-16 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-serif text-3xl font-medium text-[var(--foreground)] md:text-4xl">
        {t.title}
      </h2>
      <div className="mt-10 space-y-16">
        {CATEGORY_KEYS.map((key) => {
          const items = credits.filter(
            (c) => (c.category || '').toLowerCase() === key.toLowerCase()
          )
          if (items.length === 0) return null
          return (
            <div key={key}>
              <h3 className="mb-6 font-serif text-xl text-[var(--accent)]">
                {sectionLabels[key]}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[var(--muted)]/30">
                      <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                        Title
                      </th>
                      <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                        Role
                      </th>
                      <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                        Production
                      </th>
                      <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                        Director
                      </th>
                      <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((row) => (
                      <tr
                        key={row._id}
                        className="border-b border-[var(--foreground)]/5 text-[var(--muted)] transition hover:bg-[var(--foreground)]/[0.03]"
                      >
                        <td className="py-4 pr-4 font-medium text-[var(--foreground)]">
                          {row.title || '—'}
                        </td>
                        <td className="py-4 pr-4">{row.role || '—'}</td>
                        <td className="py-4 pr-4">
                          {row.productionCompany || '—'}
                        </td>
                        <td className="py-4 pr-4">{row.director || '—'}</td>
                        <td className="py-4">{row.year || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
      {credits.length === 0 && (
        <p className="mt-6 text-[var(--muted)]">No credits yet.</p>
      )}
    </motion.section>
  )
}
