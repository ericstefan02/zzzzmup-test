export interface ServicesCardData {
  title: string
  description: string
  icon: string
  primary?: boolean
}

export interface Department {
  id: number
  title: string
  description: string
}

export interface Service {
  id: number
  title: string
  description: string
  price: number | null
  departmentId: number
  // department: Department
}
