import { TColor } from '@atomik-color/core/dist/types'

// logged in user state
export interface UserStateType {
  name?: string
  email?: string
  puid?: string
  enableAffiliate?: null | boolean
  referId?: string
  role?: string
  _id?: string
}

// widget interfaces
interface Styles {
  color?: TColor
  position?: string
  icon?: string
  iconUrl?: string
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
  styles: Styles | null
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

export interface CreateWidgetInfo {
  name: string
}

// channel interfaces
export interface Channel {
  id: string
  name: string
  icon: string
}

// flow interfaces
interface DynamicFormField {
  id: number
  label?: string
  field_type?: string
  required?: boolean
}
interface WidgetChannelConfig {
  title: string
  icon?: string
  url?: string
  unique_id?: string
  phone_number?: string
  message?: string
  form_config?: {
    maxOrder?: number
    form_bg_color?: TColor
    form_text_color?: TColor
    submit_button_text?: string
    form_fields?: DynamicFormField[]
  }
  channel_show_on?: (string | number)[]
  open_window_action?: string
  hide_after_office_hours?: boolean
  store_responses?: boolean
  delete_responses?: DeleteResponses
}
export interface WidgetChannelType {
  id: string
  widget_id: string
  channel_id: string
  config: WidgetChannelConfig
  order?: number
  status?: boolean
}
export interface WidgetResponse {
  id: string
  widget_channel_id: string
  form_name: string
  response: JSON
  createdAt: string
}
export interface Flow {
  step: number
  order?: number
  widget_id: string
  channel_id: string
  channel_name: string
  config: WidgetChannelConfig
}

// react select search
export type SelectSearchOption = {
  name: string
  value: string | number
  type?: string
  items?: SelectSearchOption[]
  disabled?: boolean
  photo?: string
}

export type SelectedOptionValue = {
  name: string
  value: string | number
  index: number
  photo?: string
  disabled?: boolean
}
