import request from '@utils/request'
import { useQuery } from 'react-query'

export default function useFetchWidget(id: string) {
  const { data, isLoading } = useQuery(['/api/widget/id', id], async () => await request(`/api/widget/${id}`), {
    enabled: !!id,
  })
  return { widget: data?.data, isWidgetFetching: isLoading }
}
