import { useMutation, useQueryClient } from 'react-query'
import { Flow } from '@globalStates/Interfaces'
import request from '@utils/request'
import produce from 'immer'
import { useRouter } from 'next/router'

export default function useCreateWidgetChannel() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id } = router.query

  const { mutate, isLoading } = useMutation((flow: Flow) => request('/api/widgetChannel/create', { flow }), {
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/widgetChannel/fetch', id?.toString()], (oldData: any) => {
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
