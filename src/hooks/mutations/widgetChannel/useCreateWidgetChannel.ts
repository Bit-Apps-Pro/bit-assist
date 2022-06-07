import { useMutation, useQueryClient } from 'react-query'
import { Flow } from '@globalStates/Interfaces'
import request from '@utils/request'
import produce from 'immer'

export default function useCreateWidgetChannel() {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation((flow: Flow) => request('/api/widgetChannel/create', { flow }), {
    onSuccess: (data) => {
      // queryClient.invalidateQueries('/api/widgetChannel/fetch')
      queryClient.setQueryData('/api/widgetChannel/fetch', (oldData: any) => {
        return produce(oldData, (draft) => {
          draft.data.push(data.data)
        })
      })
    },
  })
  return {
    createWidgetChannel: (flow: Flow) => mutate(flow),
    isWidgetChannelCreating: isLoading,
  }
}
