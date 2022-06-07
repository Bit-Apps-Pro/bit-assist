import { VStack, Input, Text, HStack, Spinner } from '@chakra-ui/react'
import useFetchChannels from '@hooks/queries/channel/useFetchChannels'
import { useCallback, useMemo, useState } from 'react'
import { Channel } from '@globalStates/Interfaces'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { flowAtom } from '@globalStates/atoms'
import { useRouter } from 'next/router'

const ChannelSelect = () => {
  const [, setFlow] = useAtom(flowAtom)
  const [filter, setFilter] = useState('')
  const { channels, isChannelFetching } = useFetchChannels()

  const router = useRouter()
  const { id } = router.query

  const onSelectChannel = (channel_id: string) => {
    setFlow((prev) => {
      prev.step = 2
      prev.widget_id = id?.toString()
      prev.channel_id = channel_id
    })
  }

  const filteredChannels = useMemo(() => {
    return channels?.filter((channel: Channel) => channel.name.toLowerCase().includes(filter.toLowerCase()))
  }, [channels, filter])

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value), [setFilter])

  return (
    <VStack spacing="4">
      <Input value={filter} placeholder="Search channels" onChange={handleFilterChange} />

      {isChannelFetching ? (
        <Spinner />
      ) : (
        <HStack flexWrap="wrap" spacing="0" gap="3">
          {filteredChannels?.length > 0 ? (
            filteredChannels.map((channel: Channel) => (
              <VStack
                key={channel.id}
                onClick={() => onSelectChannel(channel.id)}
                shadow="sm"
                borderWidth={1}
                rounded="md"
                py="2"
                w="36"
                cursor="pointer"
              >
                {channel.icon ? (
                  <Image src={channel.icon} alt={channel.name} width="40" height="40" />
                ) : (
                  <VStack bg="gray.200" rounded="full" w="40px" h="40px"></VStack>
                )}
                <Text>{channel.name}</Text>
              </VStack>
            ))
          ) : (
            <Text color="gray.500" fontSize="lg">
              Channel not found
            </Text>
          )}
        </HStack>
      )}
    </VStack>
  )
}

export default ChannelSelect
