import { useMutation, useQueryClient } from 'react-query'
import { WidgetChannel } from '@globalStates/Interfaces'
import request from '@utils/request'
import produce from 'immer'
import { useRouter } from 'next/router'

export default function useDeleteWidgetChannel() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id } = router.query

  const { mutateAsync, isLoading } = useMutation((widgetChannelId: string) => request('/api/widgetChannel/delete', { widgetChannelId }), {
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/widgetChannel/fetch', id?.toString()], (oldData: any) => {
        return produce(oldData, (draft) => {
          draft.data.splice(
            draft.data.findIndex((item: WidgetChannel) => item.id === data.data.id),
            1
          )
        })
      })
    },
  })
  return {
    deleteWidgetChannel: (widgetChannelId: string) => mutateAsync(widgetChannelId),
    isWidgetChannelDeleting: isLoading,
  }
}
