export interface OrganMember {
  // i18n ključevi (npr. 'organ.placeholderName', 'organ.president').
  // Imena su placeholder dok ne stignu pravi podaci klijenta/API.
  name: string
  role: string
  photo?: string
}

export interface OrganSection {
  anchor: string
  // i18n ključ naslova sekcije (npr. 'nav.director')
  titleKey: string
  // i18n ključ opisa nadležnosti (npr. 'pages.uprava.upravniOdborDesc')
  descriptionKey?: string
  members: OrganMember[]
}
