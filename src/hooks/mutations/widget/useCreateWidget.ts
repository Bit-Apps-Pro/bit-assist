import { useMutation, useQueryClient } from 'react-query'
import request from '@utils/request'
import produce from 'immer'

export default function useCreateWidget() {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(() => request('/api/widget/create'), {
    onSuccess: (data) => {
      // queryClient.invalidateQueries('/api/widget/fetch')
      queryClient.setQueryData('/api/widget/fetch', (oldData: any) => {
        return produce(oldData, (draft) => {
          draft.data.push(data.data)
        })
      })
    },
  })
  return {
    createWidget: () => mutate(),
    isWidgetCreating: isLoading,
  }
}
