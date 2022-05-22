import request from '@utils/request'
import { useMutation, useQueryClient } from 'react-query'

export default function useCreateWidget() {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    () => request('/api/widget/create'),
    {
      onSuccess: () => { queryClient.invalidateQueries('/api/widget/fetch') }
    }
  )
  return {
    createWidget: () => mutate(),
    isWidgetCreating: isLoading
  }
}