import request from '@utils/request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function useFetchOthersData() {
  const router = useRouter()
  const { widgetId } = router.query

  const { data, isLoading } = useQuery(['/api/response/', widgetId?.toString()], () => request('/api/response/othersData', { widgetId }), {
    enabled: !!widgetId?.toString(),
    staleTime: 3600000, //60000 × 60 = 1 hour
  })
  return { othersData: data?.data, isOthersDataLoading: isLoading }
}
