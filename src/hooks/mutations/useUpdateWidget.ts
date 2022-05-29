import { chat_widgets } from '@prisma/client'
import request from '@utils/request'
import { useMutation } from 'react-query'

export default function useUpdateWidget() {
  const { mutateAsync, isLoading } = useMutation((widget: chat_widgets) =>
    request('/api/widget/update', { widget })
  )

  return {
    updateWidget: (widget: chat_widgets) => mutateAsync(widget),
    isWidgetUpdating: isLoading,
  }
}
