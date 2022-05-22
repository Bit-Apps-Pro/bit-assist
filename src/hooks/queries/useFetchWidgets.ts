import request from '@utils/request'
import { useQuery } from 'react-query'

export default function useFetchWidgets(initialData = null) {
  const { data, isLoading } = useQuery(
    '/api/widget/fetch',
    () => request('/api/widget/fetch'),
    { initialData }
  )
  return { widgets: data?.data, isWidgetFetching: isLoading }
}