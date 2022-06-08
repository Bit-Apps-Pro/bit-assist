import { useMutation, useQueryClient } from 'react-query'
import { Flow } from '@globalStates/Interfaces'
import request from '@utils/request'
import produce from 'immer'
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
    onSuccess: (data) => {
      resetFlow()
      toast({ status: 'success', position: 'top-right', title: 'Widget Channel Created' })

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
