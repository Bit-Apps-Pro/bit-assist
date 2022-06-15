import { editWidgetChannelIdAtom } from '@globalStates/atoms'
import request from '@utils/request'
import { useAtom } from 'jotai'
import { useQuery } from 'react-query'

export default function useFetchWidgetChannels() {
  const [editWidgetChannelId] = useAtom(editWidgetChannelIdAtom)

  const { data, isLoading } = useQuery(
    ['/api/widgetChannel/', editWidgetChannelId],
    async () => await request(`/api/widgetChannel/${editWidgetChannelId}`),
    {
      enabled: !!editWidgetChannelId,
    }
  )
  return { widgetChannel: data?.data, isWidgetChannelFetching: isLoading }
}
