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

  const debounceUpdateWidget = useRef(
    debounce(async (widgetChannels, newIndex, oldIndex) => {
      const newArray = []
      widgetChannels.filter((widgetChannel: WidgetChannelType, i: number) => {
        if ((i >= oldIndex && i <= newIndex) || (i >= newIndex && i <= oldIndex)) {
          newArray.push({ ...widgetChannel, order: i + 1 })
        }
      })
      await mutateAsync(newArray)
    }, 3000)
  ).current

  useEffect(() => {
    return () => {
      debounceUpdateWidget.cancel()
    }
  }, [debounceUpdateWidget])

  return {
    updateWidgetChannelsOrder: (widgetChannels: WidgetChannelType[], newIndex: number, oldIndex: number) => {
      setWidgetChannelsOrder(widgetChannels)
      debounceUpdateWidget(widgetChannels, newIndex, oldIndex)
    },
    isWidgetChannelOrderUpdating: isLoading,
  }
}
