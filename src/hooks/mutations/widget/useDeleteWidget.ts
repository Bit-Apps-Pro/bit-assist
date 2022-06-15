import { useMutation, useQueryClient } from 'react-query'
import request from '@utils/request'

export default function useDeleteWidget() {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation((widgetId: string) => request('/api/widget/delete', { widgetId }), {
    onSuccess: () => {
      queryClient.invalidateQueries('/api/widget/fetch')
    },
  })
  return {
    deleteWidget: (widgetId: string) => mutateAsync(widgetId),
    isWidgetDeleting: isLoading,
  }
}
