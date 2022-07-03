import { GridItem, Text, VStack } from '@chakra-ui/react'
import { flowAtom } from '@globalStates/atoms'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import Image from 'next/image'

const SingleChannel = ({ channel }) => {
  const router = useRouter()
  const { id } = router.query
  const [flow, setFlow] = useAtom(flowAtom)

  const onSelectChannel = (channel_id: string, channel_name: string) => {
    setFlow({
      ...flow,
      step: 2,
      widget_id: id?.toString(),
      channel_id: channel_id,
      channel_name: channel_name,
      config: {
        title: channel_name,
        open_window_action: '_blank',
        channel_show_on: ['desktop', 'mobile'],
      },
    })
  }

  return (
    <GridItem
      py="2"
      rounded="md"
      borderWidth={1}
      cursor="pointer"
      transition="250ms"
      _hover={{ shadow: 'lg' }}
      textAlign="center"
      onClick={() => onSelectChannel(channel.id, channel.name)}
    >
      {channel.icon ? (
        <Image src={channel.icon} alt={channel.name} width="40" height="40" />
      ) : (
        <VStack bg="gray.200" rounded="full" w="40px" h="40px" />
      )}
      <Text>{channel.name}</Text>
    </GridItem>
  )
}

export default SingleChannel
