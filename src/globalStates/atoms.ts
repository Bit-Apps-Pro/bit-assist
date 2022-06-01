import { atomWithImmer } from 'jotai/immer'
import { ChatWidget } from './Interfaces'

export const widgetAtom = atomWithImmer<ChatWidget>({
  id: '',
  name: '',
  userId: '',
  styles: {
    color: null,
    position: 'right-bottom',
    icon: 'chat-icon-1',
    shape: 'square',
  },
  domains: [],
  business_hours: [],
  exclude_pages: [],
  initial_delay: 0,
  status: true,
  widget_message: null,
  createdAt: new Date(),
  integrations: [],
})
