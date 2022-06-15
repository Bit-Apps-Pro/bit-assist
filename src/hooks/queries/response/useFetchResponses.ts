import request from '@utils/request'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function useFetchResponses(pageLimit: number, pageNumber: number) {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, isFetching, isFetched } = useQuery(
    ['/api/response/', [id?.toString(), pageNumber, pageLimit]],
    () => request(`/api/response/${id?.toString()}?_page=${pageNumber}&_limit=${pageLimit}`),
    {
      enabled: !!id?.toString() && !!pageLimit && !!pageNumber ? true : false,
      keepPreviousData: true,
      staleTime: 3600000, //60000 × 60 = 1 hour
    }
  )
  return { widgetResponses: data?.data, isResponsesLoading: isLoading, isFetching, isFetched }
}
