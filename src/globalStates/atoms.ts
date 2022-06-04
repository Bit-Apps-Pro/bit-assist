import { atomWithImmer } from 'jotai/immer'
import { ChatWidget } from './Interfaces'

export const widgetAtom = atomWithImmer<ChatWidget>({
  id: '',
  name: '',
  userId: '',
  styles: {
    color: null,
    position: null,
    icon: null,
    shape: null,
  },
  domains: [],
  business_hours: [],
  exclude_pages: [],
  initial_delay: 0,
  page_scroll: 0,
  widget_behavior: 1,
  custom_css: null,
  call_to_action: {
    text: null,
    delay: 0,
  },
  store_responses: true,
  delete_responses: {
    is_enabled: false,
    delete_after: null,
  },
  status: true,
  createdAt: null,
  integrations: [],
})
