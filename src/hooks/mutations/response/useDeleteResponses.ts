import { useMutation, useQueryClient } from 'react-query'
import request from '@utils/request'
import { useRouter } from 'next/router'

export default function useDeleteResponses(pageLimit: number, pageNumber: number) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { widgetChannelId } = router.query

  const { mutateAsync, isLoading } = useMutation((responseIds: string[]) => request('/api/response/delete', { responseIds }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['/api/response/fetch', [widgetChannelId?.toString(), pageNumber, pageLimit]])
      queryClient.invalidateQueries(['/api/response/othersData', widgetChannelId?.toString()])
    },
  })
  return {
    deleteResponses: (responseIds: string[]) => mutateAsync(responseIds),
    isResponsesDeleting: isLoading,
  }
}
