export interface DetachedClinic {
  id: number
  name: string
  address: string
  phoneNumber: string
  workingHoursStart: string
  workingHoursEnd: string
  isClosed?: boolean
}
