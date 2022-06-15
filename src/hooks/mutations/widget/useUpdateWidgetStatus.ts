import request from '@utils/request'
import { useMutation, useQueryClient } from 'react-query'

export default function useUpdateWidgetStatus() {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(
    (requestData: { widgetId: string; status: boolean }) => request('/api/widget/updateStatus', { ...requestData }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/api/widget/fetch')
      },
    }
  )

  return {
    updateWidgetStatus: (widgetId: string, status: boolean) => mutateAsync({ widgetId, status }),
    isWidgetStatusUpdating: isLoading,
  }
}
