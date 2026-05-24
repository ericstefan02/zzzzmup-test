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
      { title: 'nav.preventiveCenter', route: '/preventive-center' },
      {
        title: 'nav.documents',
        route: '/documents',
        children: [
          { title: 'nav.financialReports', route: '/documents?type=financial' },
          {
            title: 'nav.publicProcurement',
            route: '/documents?type=procurement',
          },
          { title: 'nav.workReports', route: '/documents?type=reports' },
          { title: 'nav.otherDocuments', route: '/documents?type=other' },
        ],
      },
    ],
  },
  {
    title: 'nav.services',
    route: '/services',
    children: [
      { title: 'nav.generalMedicine', route: '/services?department=1' },
      {
        title: 'nav.specialistExams',
        route: '/services?department=2',
      },
      { title: 'nav.diagnostics', route: '/services?department=3' },
      { title: 'nav.physiotherapy', route: '/services?department=4' },
      { title: 'nav.dentistry', route: '/services?department=5' },
      {
        title: 'nav.psychologicalSupport',
        route: '/services?department=6',
      },
      { title: 'nav.groupExams', route: '/services?section=group' },
    ],
  },
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
