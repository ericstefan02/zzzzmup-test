import type { DetachedClinic } from './detached-clinic'

export interface DetachmentClinicScheduleItem {
  doctor: string
  clinic: Partial<DetachedClinic>
}
