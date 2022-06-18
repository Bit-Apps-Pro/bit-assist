import { useMutation, useQueryClient } from 'react-query'
import request from '@utils/request'
import { CreateWidgetInfo } from '@globalStates/Interfaces'
import { defaultCreateWidgetInfo } from '@globalStates/DefaultStates'

export default function useCreateWidget(closeCreateWidgetModal: () => void, setCreateWidgetInfo: (info: CreateWidgetInfo) => void) {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation((widgetInfo: CreateWidgetInfo) => request('/api/widget/create', { widgetInfo }), {
    onSuccess: () => {
      queryClient.invalidateQueries('/api/widget/fetch')
      closeCreateWidgetModal()
      setCreateWidgetInfo(defaultCreateWidgetInfo)
    },
  })
  return {
    createWidget: (widgetInfo: CreateWidgetInfo) => mutate(widgetInfo),
    isWidgetCreating: isLoading,
  }
}
