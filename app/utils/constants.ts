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
    route: '/about-us',
    children: [
      { title: 'nav.history', route: '/about-us' },
      { title: 'nav.mission', route: '/about-us#misija' },
      { title: 'nav.vision', route: '/about-us#vizija' },
      {
        title: 'nav.management',
        route: '/about-us/uprava',
        children: [
          {
            title: 'nav.managementBoard',
            route: '/about-us/uprava#upravni-odbor',
          },
          {
            title: 'nav.supervisoryBoard',
            route: '/about-us/uprava#nadzorni-odbor',
          },
          { title: 'nav.director', route: '/about-us/uprava#direktor' },
          { title: 'nav.assistantDirector', route: '/about-us/uprava#pomocnik' },
          { title: 'nav.headOfService', route: '/about-us/uprava#sef-sluzbe' },
          { title: 'nav.headNurse', route: '/about-us/uprava#glavna-sestra' },
        ],
      },
      {
        title: 'nav.professionalBodies',
        route: '/about-us/strucni-organi',
        children: [
          {
            title: 'nav.professionalCouncil',
            route: '/about-us/strucni-organi#savet',
          },
          {
            title: 'nav.professionalCollegium',
            route: '/about-us/strucni-organi#kolegijum',
          },
          {
            title: 'nav.ethicsCommittee',
            route: '/about-us/strucni-organi#eticki-odbor',
          },
          {
            title: 'nav.qualityCommittee',
            route: '/about-us/strucni-organi#komisija-kvalitet',
          },
          {
            title: 'nav.infectionCommittee',
            route: '/about-us/strucni-organi#komisija-infekcije',
          },
        ],
      },
      {
        title: 'nav.documents',
        route: '/documents',
        children: [
          { title: 'nav.statute', route: '/documents?type=statute' },
          { title: 'nav.financialReports', route: '/documents?type=financial' },
          { title: 'nav.workPlan', route: '/documents?type=work-plan' },
          { title: 'nav.normativeActs', route: '/documents?type=normative' },
          {
            title: 'nav.publicProcurement',
            route: '/documents?type=procurement',
          },
        ],
      },
    ],
  },
  {
    title: 'nav.services',
    route: '/services',
    mega: true,
    children: [
      {
        title: 'nav.medicalServices',
        route: '/services',
        children: [
          { title: 'nav.generalMedicine', route: '/services?department=1' },
          { title: 'nav.preventiveCenter', route: '/preventive-center' },
          { title: 'nav.gynecology', route: '/services?department=2' },
          { title: 'nav.internalMedicine', route: '/services?department=3' },
          { title: 'nav.ophthalmology', route: '/services?department=4' },
          {
            title: 'nav.otorhinolaryngology',
            route: '/services?department=5',
          },
          { title: 'nav.physicalMedicine', route: '/services?department=6' },
          { title: 'nav.psychiatry', route: '/services?department=7' },
          {
            title: 'nav.psychologicalSupport',
            route: '/services?department=8',
          },
          {
            title: 'nav.occupationalMedicine',
            route: '/services?department=9',
          },
          { title: 'nav.radiology', route: '/services?department=10' },
          { title: 'nav.xray', route: '/services?department=11' },
          { title: 'nav.ultrasound', route: '/services?department=12' },
          { title: 'nav.mammography', route: '/services?department=13' },
          { title: 'nav.sportsMedicine', route: '/services?department=14' },
          { title: 'nav.labDiagnostics', route: '/services?department=15' },
          { title: 'nav.pharmacy', route: '/services?department=16' },
          { title: 'nav.groupExams', route: '/services?section=group' },
        ],
      },
      { title: 'nav.legalService', route: '/services?department=17' },
      { title: 'nav.technicalService', route: '/services?department=18' },
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
