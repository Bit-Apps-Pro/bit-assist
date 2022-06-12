import { useMutation, useQueryClient } from 'react-query'
import request from '@utils/request'
import { useRouter } from 'next/router'

export default function useDeleteWidgetChannel() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id } = router.query

  const { mutateAsync, isLoading } = useMutation((widgetChannelId: string) => request('/api/widgetChannel/delete', { widgetChannelId }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['/api/widgetChannel/fetch', id?.toString()])
    },
  })
  return {
    deleteWidgetChannel: (widgetChannelId: string) => mutateAsync(widgetChannelId),
    isWidgetChannelDeleting: isLoading,
  }
}
