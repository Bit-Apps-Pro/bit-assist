import request from '@utils/request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function useFetchResponses() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading } = useQuery(['/api/response/', id?.toString()], () => request(`/api/response/${id?.toString()}`), {
    enabled: !!id?.toString(),
  })
  return { widget: data?.data, isResponsesFetching: isLoading }
}
