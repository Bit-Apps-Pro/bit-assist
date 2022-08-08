import { userState } from '@globalStates/atoms'
import request from '@utils/request'
import { useAtom } from 'jotai'
import { useQuery } from 'react-query'

export default function useFetchWidgets() {
  const [user] = useAtom(userState)
  const { data, isLoading } = useQuery('/api/widget/fetch', () =>
    request('/api/widget/fetch', { user_id: user?._id })
  )
  return { widgets: data?.data, isWidgetFetching: isLoading }
}
