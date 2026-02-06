export type Locale = 'KR' | 'EN'

export const translations = {
  KR: {
    nav: {
      home: '홈',
      portfolio: '포트폴리오',
      about: '소개',
      contact: '연락하기',
    },
    cta: {
      contact: '연락하기',
    },
    contact: {
      title: '연락',
      downloadProfile: '프로필 다운로드 (PPT)',
    },
    portfolio: {
      lookbook: '룩북',
      credits: '크레딧',
    },
    about: {
      title: '소개',
      specialSkills: '특기',
    },
    credits: {
      title: '크레딧',
      drama: '드라마',
      movie: '영화',
      theatre: '연극',
      commercials: '광고',
    },
  },
  EN: {
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact',
    },
    cta: {
      contact: 'Contact',
    },
    contact: {
      title: 'Contact',
      downloadProfile: 'Download Profile (PPT)',
    },
    portfolio: {
      lookbook: 'Lookbook',
      credits: 'Credits',
    },
    about: {
      title: 'About',
      specialSkills: 'Special Skills',
    },
    credits: {
      title: 'Credits',
      drama: 'Drama',
      movie: 'Movie',
      theatre: 'Theatre',
      commercials: 'Commercials',
    },
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}
