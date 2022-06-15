import request from '@utils/request'
import { useQuery } from 'react-query'

export default function useFetchChannel(channelId: string) {
  const { data, isLoading } = useQuery(['/api/channel/', channelId], async () => await request(`/api/channel/${channelId}`), {
    enabled: !!channelId,
  })
  return { channel: data?.data, isChannelFetching: isLoading }
}
