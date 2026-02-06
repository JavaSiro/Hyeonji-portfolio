'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, User, Building2, FileDown, Instagram } from 'lucide-react'

interface ContactContentProps {
  contactEmail?: string | null
  instagramUrl?: string | null
  agentName?: string | null
  agencyName?: string | null
  representationEmail?: string | null
  contactPhone?: string | null
}

const RESUME_PATH = '/resume.pptx'

export function ContactContent({
  contactEmail,
  instagramUrl,
  agentName,
  agencyName,
  representationEmail,
  contactPhone,
}: ContactContentProps) {
  const primaryEmail = contactEmail || representationEmail
  const hasPrimaryLinks = primaryEmail || instagramUrl
  const hasRepresentation = agentName || agencyName || representationEmail || contactPhone

  return (
    <div className="pt-24">
      <motion.section
        className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl font-medium text-white md:text-5xl">
          Contact
        </h1>
        <p className="mt-4 text-[#A1A1AA]">
          For bookings and representation inquiries.
        </p>

        {/* Primary: Email & Instagram — prominent, gold/white */}
        {hasPrimaryLinks && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-8">
            {primaryEmail && (
              <a
                href={`mailto:${primaryEmail}`}
                className="inline-flex items-center gap-3 rounded border border-[#D4AF37] bg-transparent px-5 py-3 text-white transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
              >
                <Mail className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                <span>{primaryEmail}</span>
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded border border-[#D4AF37] bg-transparent px-5 py-3 text-white transition hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
              >
                <Instagram className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        )}

        {/* Secondary: Download Resume */}
        <div className="mt-8 flex justify-center">
          <a
            href={RESUME_PATH}
            download="resume.pptx"
            className="inline-flex items-center gap-3 rounded border border-[#333] bg-white/[0.03] px-5 py-3 text-[#A1A1AA] transition hover:border-[#555] hover:text-white"
          >
            <FileDown className="h-5 w-5 shrink-0" />
            Download Resume (PPT)
          </a>
        </div>

        {/* Representation (if present) */}
        {hasRepresentation && (
          <div className="mt-12 rounded border border-[#222] bg-white/[0.02] p-6">
            <h2 className="mb-4 font-serif text-lg text-[#D4AF37]">
              Representation
            </h2>
            <div className="space-y-3">
              {agentName && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                  <span className="text-white">{agentName}</span>
                </div>
              )}
              {agencyName && (
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                  <span className="text-[#A1A1AA]">{agencyName}</span>
                </div>
              )}
              {representationEmail && !contactEmail && (
                <a
                  href={`mailto:${representationEmail}`}
                  className="flex items-center gap-3 text-[#A1A1AA] transition hover:text-[#D4AF37]"
                >
                  <Mail className="h-5 w-5 shrink-0" />
                  {representationEmail}
                </a>
              )}
              {contactPhone && (
                <a
                  href={`tel:${contactPhone}`}
                  className="flex items-center gap-3 text-[#A1A1AA] transition hover:text-[#D4AF37]"
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  {contactPhone}
                </a>
              )}
            </div>
          </div>
        )}

        {!hasPrimaryLinks && !hasRepresentation && (
          <p className="mt-8 text-center text-[#A1A1AA]">
            Add contact email and Instagram in Sanity Studio (Actress Profile).
          </p>
        )}
      </motion.section>
    </div>
  )
}
