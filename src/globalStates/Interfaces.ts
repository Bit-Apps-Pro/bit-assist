import { TColor } from '@atomik-color/core/dist/types'
import { Prisma } from '@prisma/client'

// chat widget interface
interface Settings {
  color?: TColor
  position?: string
  icon?: string
  shape?: string
}

interface BusinessHours {
  day: string
  start?: string
  end?: string
}

interface ExcludePages {
  url: string
  visibility: string
  condition: string
}

interface Integrations {
  name: string
}

export interface ChatWidget {
  id: string
  name: string
  userId: string
  styles: Settings | null
  domains: string[]
  business_hours: BusinessHours[]
  exclude_pages: ExcludePages[]
  initial_delay: number
  status: boolean
  widget_message: string | null
  createdAt: Date
  integrations: Integrations[]
}