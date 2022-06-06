import { WidgetChannel } from '@globalStates/Interfaces'
import request from '@utils/request'
import { useMutation } from 'react-query'

export default function useUpdateWidget() {
  const { mutateAsync, isLoading } = useMutation((widgetChannel: WidgetChannel) => request('/api/widgetChannel/update', { widgetChannel }))

  return {
    updateWidgetChannel: (widgetChannel: WidgetChannel) => mutateAsync(widgetChannel),
    isWidgetChannelUpdating: isLoading,
  }
}
