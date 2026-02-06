'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Ruler,
  Eye,
  Palette,
  Briefcase,
  Swords,
  Languages,
  Music,
  Camera,
  Sparkles,
} from 'lucide-react'
import { PortableText } from './PortableText'
import type { PortableTextBlock } from '@portabletext/types'

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Stage Combat': Swords,
  Languages: Languages,
  Singing: Music,
  Dance: Music,
  Accents: Languages,
  'Horseback Riding': Sparkles,
  Driving: Briefcase,
  Photography: Camera,
  default: Sparkles,
}

function getSkillIcon(name: string) {
  const key = Object.keys(SKILL_ICONS).find((k) =>
    name.toLowerCase().includes(k.toLowerCase())
  )
  return SKILL_ICONS[key || 'default'] || SKILL_ICONS.default
}

interface AboutContentProps {
  bio?: PortableTextBlock[] | null
  fullName?: string | null
  physicalStats?: {
    height?: string | null
    eyeColor?: string | null
    hairColor?: string | null
    unionStatus?: string | null
  } | null
  portraitUrl?: string | null
  specialSkills?: string[] | null
}

export function AboutContent({
  bio,
  fullName,
  physicalStats,
  portraitUrl,
  specialSkills,
}: AboutContentProps) {
  const stats = [
    {
      label: 'Height',
      value: physicalStats?.height,
      icon: Ruler,
    },
    {
      label: 'Eye Color',
      value: physicalStats?.eyeColor,
      icon: Eye,
    },
    {
      label: 'Hair Color',
      value: physicalStats?.hairColor,
      icon: Palette,
    },
    {
      label: 'Union Status',
      value: physicalStats?.unionStatus,
      icon: Briefcase,
    },
  ]

  return (
    <div className="pt-24">
      <motion.section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#0a0a0a]">
            {portraitUrl ? (
              <Image
                src={portraitUrl}
                alt={fullName || 'Portrait'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#333]">
                <span className="font-serif text-lg">Portrait</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="font-serif text-4xl font-medium text-white md:text-5xl">
              {fullName || 'About'}
            </h1>
            <div className="mt-8">
              <PortableText value={bio || []} />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 border-b border-[#1a1a1a] pb-3"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#A1A1AA]">
                      {label}
                    </p>
                    <p className="font-medium text-white">{value || '—'}</p>
                  </div>
                </div>
              ))}
            </div>
            {specialSkills && specialSkills.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 font-serif text-xl text-[#D4AF37]">
                  Special Skills
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {specialSkills.map((skill) => {
                    const Icon = getSkillIcon(skill)
                    return (
                      <motion.div
                        key={skill}
                        className="flex items-center gap-3 rounded border border-[#222] bg-white/[0.02] px-4 py-3"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                        <span className="text-[#A1A1AA]">{skill}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
