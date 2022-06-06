import request from '@utils/request'
import { useMutation, useQueryClient } from 'react-query'

export default function useDeleteWidgetChannel() {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation((widgetChannelId: string) => request('/api/widgetChannel/delete', { widgetChannelId }), {
    onSuccess: () => {
      queryClient.invalidateQueries('/api/widgetChannel/fetch')
    },
  })
  return {
    deleteWidgetChannel: (widgetChannelId: string) => mutateAsync(widgetChannelId),
    isWidgetChannelDeleting: isLoading,
  }
}
