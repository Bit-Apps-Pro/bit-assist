import request from '@utils/request'
import { useQuery } from 'react-query'

export default function useFetchChannels() {
  const { data, isLoading } = useQuery('/api/channel/fetch', () => request('/api/channel/fetch'), {
    staleTime: 3600000, // 1 hour
  })
  return { channels: data?.data, isChannelsFetching: isLoading }
}
