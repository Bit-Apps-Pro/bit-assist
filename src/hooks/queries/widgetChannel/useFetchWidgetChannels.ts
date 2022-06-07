import request from '@utils/request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function useFetchWidgetChannels() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading } = useQuery(
    ['/api/widgetChannel/fetch', id?.toString()],
    () => request('/api/widgetChannel/fetch', { widgetId: id?.toString() }),
    {
      enabled: !!id?.toString(),
    }
  )
  return { widgetChannels: data?.data, isWidgetChannelFetching: isLoading }
}
