import { useMutation, useQueryClient } from 'react-query'
import { Flow } from '@globalStates/Interfaces'
import request from '@utils/request'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { resetFlowAtom } from '@globalStates/atoms'
import { useToast } from '@chakra-ui/react'

export default function useCreateWidgetChannel() {
  const [, resetFlow] = useAtom(resetFlowAtom)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id } = router.query
  const toast = useToast({ isClosable: true })

  const { mutate, isLoading } = useMutation((flow: Flow) => request('/api/widgetChannel/create', { flow }), {
    onSuccess: () => {
      resetFlow()
      toast({ status: 'success', position: 'top-right', title: 'Widget channel created' })
      queryClient.invalidateQueries(['/api/widgetChannel/fetch', id?.toString()])
    },
  })
  return {
    createWidgetChannel: (flow: Flow) => mutate(flow),
    isWidgetChannelCreating: isLoading,
  }
}
