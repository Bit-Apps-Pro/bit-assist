import { WidgetChannelType } from '@globalStates/Interfaces'
import request from '@utils/request'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export default function useUpdateWidgetChannelOrder() {
  const router = useRouter()
  const { id } = router.query
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(
    (widgetChannels: WidgetChannelType[]) => request('/api/widgetChannel/updateOrder', { widgetChannels }),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(['/api/widgetChannel/fetch', id?.toString()])
      },
    }
  )

  const setWidgetChannelsOrder = (widgetChannels: WidgetChannelType[]) => {
    queryClient.setQueryData(['/api/widgetChannel/fetch', id?.toString()], {
      data: widgetChannels,
    })
  }

  const debounceUpdateWidget = debounce(async (widgetChannels) => {
    mutateAsync(widgetChannels)
  }, 2000)

  return {
    updateWidgetChannelsOrder: (widgetChannels: WidgetChannelType[]) => {
      setWidgetChannelsOrder(widgetChannels)
      debounceUpdateWidget(widgetChannels)
    },
    isWidgetChannelOrderUpdating: isLoading,
  }
}
