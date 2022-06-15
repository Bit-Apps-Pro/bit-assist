import request from '@utils/request'
import { useQuery } from 'react-query'

export default function useFetchWidgets() {
  const { data, isLoading } = useQuery('/api/widget/fetch', () => request('/api/widget/fetch'))
  return { widgets: data?.data, isWidgetFetching: isLoading }
}
