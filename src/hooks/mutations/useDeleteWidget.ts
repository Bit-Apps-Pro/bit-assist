import request from '@utils/request'
import { useMutation, useQueryClient } from 'react-query'

export default function useDeleteWidget() {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(
    (widgetId: string) => request('/api/widget/delete', { widgetId }),
    {
      onSuccess: () => { queryClient.invalidateQueries('/api/widget/fetch') }
    }
  )
  return {
    deleteWidget: (widgetId: string) => mutateAsync(widgetId),
    isWidgetDeleting: isLoading
  }
}