import { TColor } from '@atomik-color/core/dist/types'

// widget interfaces
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
export interface Widget {
  id: string
  name: string
  user_id: string
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

// channel interfaces
export interface Channel {
  id: string
  name: string
  icon: string
}

// flow interfaces
interface WidgetChannelConfig {
  title: string
  icon?: string
  url?: string
  open_window_action?: string
  hide_after_office?: boolean
  store_responses?: boolean
  delete_responses?: DeleteResponses
}
export interface WidgetChannel {
  id: string
  widget_id: string
  channel_id: string
  config: WidgetChannelConfig
  status?: boolean
}
export interface Flow {
  step: number
  widget_id: string
  channel_id: string
  config: WidgetChannelConfig
}
