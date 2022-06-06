import request from '@utils/request'
import { useQuery } from 'react-query'

export default function useFetchChannels() {
  const { data, isLoading }  = useQuery('/api/channel/fetch', () => request('/api/channel/fetch'))
  return { channels: data?.data, isChannelFetching: isLoading }
}
