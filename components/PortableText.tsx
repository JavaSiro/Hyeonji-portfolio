'use client'

import { PortableText as PortableTextReact, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-[#A1A1AA] leading-relaxed">{children}</p>,
    h1: ({ children }) => (
      <h1 className="font-serif text-3xl font-medium text-white mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl font-medium text-white mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl font-medium text-white mb-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#D4AF37] pl-4 italic text-[#A1A1AA]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-[#A1A1AA]">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-[#A1A1AA]">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D4AF37] underline hover:no-underline"
      >
        {children}
      </a>
    ),
  },
}

interface Props {
  value: PortableTextBlock[] | null | undefined
}

export function PortableText({ value }: Props) {
  if (!value?.length) return null
  return <PortableTextReact value={value} components={components} />
}
