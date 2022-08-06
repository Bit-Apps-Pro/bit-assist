import { useMutation, useQueryClient } from 'react-query'
import request from '@utils/request'
import { CreateWidgetInfo } from '@globalStates/Interfaces'
import { defaultCreateWidgetInfo } from '@globalStates/DefaultStates'
import { userState } from '@globalStates/atoms'
import { useAtom } from 'jotai'

export default function useCreateWidget(closeCreateWidgetModal: () => void, setCreateWidgetInfo: (info: CreateWidgetInfo) => void) {
  const [user] = useAtom(userState)
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(
    (widgetInfo: CreateWidgetInfo) =>
      request('/api/widget/create', { widgetInfo, user_id: process.env.NODE_ENV === 'development' ? '628626c4aeedcb3965aa667b' : user._id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/api/widget/fetch')
        closeCreateWidgetModal()
        setCreateWidgetInfo(defaultCreateWidgetInfo)
      },
    }
  )
  return {
    createWidget: (widgetInfo: CreateWidgetInfo) => mutate(widgetInfo),
    isWidgetCreating: isLoading,
  }
}
