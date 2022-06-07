import request from '@utils/request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function useFetchWidget() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading } = useQuery(['/api/widget/id', id?.toString()], async () => await request(`/api/widget/${id?.toString()}`), {
    enabled: !!id?.toString(),
  })
  return { widget: data?.data, isWidgetFetching: isLoading }
}
