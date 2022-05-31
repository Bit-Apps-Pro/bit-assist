import { ChatWidget } from '@globalStates/Interfaces'
import request from '@utils/request'
import { useMutation } from 'react-query'


export default function useUpdateWidget() {
  const { mutateAsync, isLoading } = useMutation((widget: ChatWidget) =>
    request('/api/widget/update', { widget })
  )

  return {
    updateWidget: (widget: ChatWidget) => mutateAsync(widget),
    isWidgetUpdating: isLoading,
  }
}
