export const defaultCreateWidgetInfo = { name: 'Untitled Widget' }

export const FlowDefault = { step: 1, widget_id: '', channel_id: '', channel_name: '', config: { title: '' } }

export const WidgetDefault = {
  id: '',
  name: '',
  user_id: '',
  styles: {
    color: null,
    position: null,
    icon: null,
    shape: null,
  },
  domains: [],
  business_hours: [],
  timezone: '',
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
}
