import type { WorkingHour, NavItem } from '~/types/common'

export const MAPS_EMBED_URL = 'https://maps.app.goo.gl/xUwCA9uzBPsqJiX79'
export const PHONE_NUMBER_URL = 'tel:+381113615665'
export const EMAIL_ADDRESS_URL = 'mailto:info@zzzzmup.rs'

export const WORKING_HOURS_DATA: Record<number, WorkingHour> = {
  0: { open: '07:00', close: '13:00', title: 'days.sunday' },
  1: { open: '07:00', close: '19:00', title: 'days.monday' },
  2: { open: '07:00', close: '19:00', title: 'days.tuesday' },
  3: { open: '07:00', close: '19:00', title: 'days.wednesday' },
  4: { open: '07:00', close: '19:00', title: 'days.thursday' },
  5: { open: '07:00', close: '19:00', title: 'days.friday' },
  6: { open: '07:00', close: '13:00', title: 'days.saturday' },
}

// Grupisani podaci za prikaz u footer-u i na kontakt strani
export const GROUPED_WORKING_HOURS = [
  { title: 'workingHours.weekdays', time: '07:00 - 19:00' },
  { title: 'workingHours.weekends', time: '07:00 - 13:00', tag: 'weekend' },
]

export const NAV_ITEMS: NavItem[] = [
  { title: 'nav.home', route: '/' },
  {
    title: 'nav.aboutUs',
    children: [
      { title: 'nav.history', route: '/about-us' },
      { title: 'nav.preventiveCenter', route: '/preventive-center' },
    ],
  },
  { title: 'nav.services', route: '/services' },
  { title: 'nav.workSchedule', route: '/work-schedule' },
  {
    title: 'nav.notifications',
    children: [
      { title: 'nav.news', route: '/news' },
      { title: 'nav.career', route: '/career' },
    ],
  },
  { title: 'nav.contact', route: '/contact' },
]
