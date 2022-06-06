import request from '@utils/request'
import { useQuery } from 'react-query'

export default function useFetchWidgetChannels() {
  const { data, isLoading }  = useQuery('/api/widgetChannel/fetch', () => request('/api/widgetChannel/fetch'))
  return { widgetChannels: data?.data, isWidgetChannelFetching: isLoading }
}
