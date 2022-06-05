import { TColor } from '@atomik-color/core/dist/types'

// chat widget interface
interface Settings {
  color?: TColor
  position?: string
  icon?: string
  shape?: string
  size?: number
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

interface CallToAction {
  text?: string
  delay?: number
}

interface DeleteResponses {
  is_enabled?: boolean
  delete_after?: number
}

export interface ChatWidget {
  id: string
  name: string
  userId: string
  styles: Settings | null
  domains: string[]
  business_hours: BusinessHours[]
  timezone: string
  exclude_pages: ExcludePages[]
  initial_delay: number
  page_scroll: number
  widget_behavior: number
  custom_css?: string
  call_to_action: CallToAction | null
  store_responses: boolean
  delete_responses: DeleteResponses
  status: boolean
  createdAt: Date
  integrations: Integrations[]
}