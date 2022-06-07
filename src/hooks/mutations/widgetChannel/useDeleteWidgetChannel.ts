import { WidgetChannel } from '@globalStates/Interfaces'
import request from '@utils/request'
import produce from 'immer'
import { useMutation, useQueryClient } from 'react-query'

export default function useDeleteWidgetChannel() {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation((widgetChannelId: string) => request('/api/widgetChannel/delete', { widgetChannelId }), {
    onSuccess: (data) => {
      // queryClient.invalidateQueries('/api/widgetChannel/fetch')
      queryClient.setQueryData('/api/widgetChannel/fetch', (oldData: any) => {
        return produce(oldData, (draft) => {
          draft.data.splice(draft.data.findIndex((item: WidgetChannel) => item.id === data.data.id), 1)
        })
      })
    },
  })
  return {
    deleteWidgetChannel: (widgetChannelId: string) => mutateAsync(widgetChannelId),
    isWidgetChannelDeleting: isLoading,
  }
}
