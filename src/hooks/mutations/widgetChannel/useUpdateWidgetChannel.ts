import { useToast } from '@chakra-ui/react'
import { Flow } from '@globalStates/Interfaces'
import request from '@utils/request'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

export default function useUpdateWidgetChannel() {
  const router = useRouter()
  const { id } = router.query
  const queryClient = useQueryClient()
  const toast = useToast({ isClosable: true })

  const { mutateAsync, isLoading } = useMutation(
    (requestData: { flow: Flow; widgetChannelId: string }) => request('/api/widgetChannel/update', { ...requestData }),
    {
      onSuccess: () => {
        toast({ status: 'success', position: 'top-right', title: 'Widget channel updated.' })
        queryClient.invalidateQueries(['/api/widgetChannel/fetch', id?.toString()])
      },
    }
  )

  return {
    updateWidgetChannel: (flow: Flow, widgetChannelId: string) => mutateAsync({ flow, widgetChannelId }),
    isWidgetChannelUpdating: isLoading,
  }
}
