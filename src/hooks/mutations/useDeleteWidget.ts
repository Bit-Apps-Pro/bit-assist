import request from '@utils/request'
import { useMutation, useQueryClient } from 'react-query'

export default function useDeleteWidget() {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(
    (widgetId) => request('/api/widget/delete', { widgetId }),
    {
      onSuccess: () => { queryClient.invalidateQueries('/api/widget/fetch') }
    }
  )
  return {
    deleteWidget: (widgetId: number) => mutateAsync(widgetId),
    isWidgetDeleting: isLoading
  }
}