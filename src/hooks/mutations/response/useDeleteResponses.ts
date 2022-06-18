import { useMutation, useQueryClient } from 'react-query'
import request from '@utils/request'
import { useRouter } from 'next/router'

export default function useDeleteResponses(pageLimit: number, pageNumber: number) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { widgetId } = router.query

  const { mutateAsync, isLoading } = useMutation((widgetIds: string[]) => request('/api/response/delete', { widgetIds }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['/api/response/fetch', [widgetId?.toString(), pageNumber, pageLimit]])
      queryClient.invalidateQueries(['/api/response/othersData', widgetId?.toString()])
    },
  })
  return {
    deleteResponses: (widgetIds: string[]) => mutateAsync(widgetIds),
    isResponsesDeleting: isLoading,
  }
}
