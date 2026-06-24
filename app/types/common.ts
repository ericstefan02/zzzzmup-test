export interface WorkingHour {
  open: string
  close: string
  title: string
}

export interface NavItem {
  title: string
  route?: string
  children?: NavItem[]
  // Render kao širok mega-meni (kolone) umesto običnog dropdown-a.
  mega?: boolean
}

export interface HighlightCardData {
  title: string
  description: string
  icon: string
  main?: boolean
  buttonText?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface DocumentItem {
  title: string
  url: string
  created_at: string
}
