'use client'

import { motion } from 'framer-motion'

interface Credit {
  _id: string
  title?: string | null
  role?: string | null
  productionCompany?: string | null
  director?: string | null
  year?: string | null
  category?: string | null
}

const SECTIONS: { key: string; label: string }[] = [
  { key: 'film', label: 'Film' },
  { key: 'tv', label: 'TV' },
  { key: 'theater', label: 'Theater' },
]

export function CreditsTable({ credits }: { credits: Credit[] }) {
  return (
    <motion.section
      className="px-4 py-16 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-serif text-3xl font-medium text-white md:text-4xl">
        Credits
      </h2>
      <div className="mt-10 space-y-16">
        {SECTIONS.map(({ key, label }) => {
          const items = credits.filter(
            (c) => (c.category || '').toLowerCase() === key.toLowerCase()
          )
          if (items.length === 0) return null
          return (
            <div key={key}>
              <h3 className="mb-6 font-serif text-xl text-[#D4AF37]">{label}</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#333]">
                      <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                        Title
                      </th>
                      <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                        Role
                      </th>
                      <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                        Production
                      </th>
                      <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                        Director
                      </th>
                      <th className="pb-3 text-xs font-medium uppercase tracking-wider text-[#A1A1AA]">
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((row) => (
                      <tr
                        key={row._id}
                        className="border-b border-[#1a1a1a] text-[#A1A1AA] transition hover:bg-white/[0.03]"
                      >
                        <td className="py-4 pr-4 font-medium text-white">
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
        <p className="mt-6 text-[#A1A1AA]">No credits yet.</p>
      )}
    </motion.section>
  )
}
