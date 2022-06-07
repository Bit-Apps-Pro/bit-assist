import { useMutation, useQueryClient } from 'react-query'
import { Widget } from '@globalStates/Interfaces'
import request from '@utils/request'
import produce from 'immer'

export default function useDeleteWidget() {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation((widgetId: string) => request('/api/widget/delete', { widgetId }), {
    onSuccess: (data) => {
      // queryClient.invalidateQueries('/api/widget/fetch')
      queryClient.setQueryData('/api/widget/fetch', (oldData: any) => {
        return produce(oldData, (draft) => {
          draft.data.splice(draft.data.findIndex((item: Widget) => item.id === data.data.id), 1)
        })
      })
    },
  })
  return {
    deleteWidget: (widgetId: string) => mutateAsync(widgetId),
    isWidgetDeleting: isLoading,
  }
}
