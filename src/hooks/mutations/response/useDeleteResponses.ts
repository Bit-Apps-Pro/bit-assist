import { useMutation, useQueryClient } from 'react-query'
import request from '@utils/request'
import { useRouter } from 'next/router'

export default function useDeleteResponses() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id } = router.query

  const { mutateAsync, isLoading } = useMutation((widgetIds: string[]) => request('/api/response/delete', { widgetIds }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['/api/response/', id?.toString()])
    },
  })
  return {
    deleteResponses: (widgetIds: string[]) => mutateAsync(widgetIds),
    isResponsesDeleting: isLoading,
  }
}
