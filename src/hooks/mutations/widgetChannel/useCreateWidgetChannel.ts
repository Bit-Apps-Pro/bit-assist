import { Flow, WidgetChannel } from '@globalStates/Interfaces'
import request from '@utils/request'
import { useMutation, useQueryClient } from 'react-query'

export default function useCreateWidgetChannel() {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation((flow: Flow) => request('/api/widgetChannel/create', { flow }), {
    onSuccess: () => {
      queryClient.invalidateQueries('/api/widgetChannel/fetch')
    },
  })
  return {
    createWidgetChannel: (flow: Flow) => mutate(flow),
    isWidgetChannelCreating: isLoading,
  }
}
